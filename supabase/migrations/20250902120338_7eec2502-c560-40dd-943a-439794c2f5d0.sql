-- Phase 1 & 2: DB security hardening, policies, triggers

-- 1) Ensure correct search_path and safety in has_role
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

-- 2) Fix handle_new_user and idempotency
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'full_name'
  )
  ON CONFLICT (id) DO NOTHING;
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN NEW;
END;
$function$;

-- 3) Ensure trigger on auth.users exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE t.tgname = 'on_auth_user_created'
      AND n.nspname = 'auth'
      AND c.relname = 'users'
  ) THEN
    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
  END IF;
END$$;

-- 4) updated_at triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE t.tgname = 'trg_resources_updated_at' AND n.nspname = 'public' AND c.relname = 'resources'
  ) THEN
    CREATE TRIGGER trg_resources_updated_at
    BEFORE UPDATE ON public.resources
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE t.tgname = 'trg_daily_tools_updated_at' AND n.nspname = 'public' AND c.relname = 'daily_tools'
  ) THEN
    CREATE TRIGGER trg_daily_tools_updated_at
    BEFORE UPDATE ON public.daily_tools
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE t.tgname = 'trg_profiles_updated_at' AND n.nspname = 'public' AND c.relname = 'profiles'
  ) THEN
    CREATE TRIGGER trg_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END$$;

-- 5) RLS for user_roles: allow admins to manage roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='user_roles' AND policyname='Admins can view all roles'
  ) THEN
    DROP POLICY "Admins can view all roles" ON public.user_roles;
  END IF;
END $$;

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='user_roles' AND policyname='Admins can manage roles'
  ) THEN
    DROP POLICY "Admins can manage roles" ON public.user_roles;
  END IF;
END $$;

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6) Durable rate limit table
CREATE TABLE IF NOT EXISTS public.api_rate_limits (
  identifier text PRIMARY KEY,
  count integer NOT NULL DEFAULT 0,
  reset_time timestamptz NOT NULL
);

ALTER TABLE public.api_rate_limits ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='api_rate_limits' AND policyname='Admins can view rate limits'
  ) THEN
    DROP POLICY "Admins can view rate limits" ON public.api_rate_limits;
  END IF;
END $$;

CREATE POLICY "Admins can view rate limits"
ON public.api_rate_limits
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 7) Chat logs table (admin-only visibility)
CREATE TABLE IF NOT EXISTS public.chat_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NULL,
  identifier text NOT NULL,
  message text NOT NULL,
  mode text,
  success boolean NOT NULL DEFAULT true,
  error text,
  model_used text
);

ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='chat_logs' AND policyname='Admins can view chat logs'
  ) THEN
    DROP POLICY "Admins can view chat logs" ON public.chat_logs;
  END IF;
END $$;

CREATE POLICY "Admins can view chat logs"
ON public.chat_logs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
