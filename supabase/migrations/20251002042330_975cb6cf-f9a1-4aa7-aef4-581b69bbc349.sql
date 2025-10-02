-- Phase 1: Add Foreign Key Constraints for Data Integrity
-- Add foreign key from user_progress to courses
ALTER TABLE public.user_progress
ADD CONSTRAINT fk_user_progress_course
FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;

-- Add foreign key from user_progress to lessons
ALTER TABLE public.user_progress
ADD CONSTRAINT fk_user_progress_lesson
FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;

-- Add foreign key from quiz_attempts to quizzes
ALTER TABLE public.quiz_attempts
ADD CONSTRAINT fk_quiz_attempts_quiz
FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id) ON DELETE CASCADE;

-- Add foreign key from lessons to courses
ALTER TABLE public.lessons
ADD CONSTRAINT fk_lessons_course
FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;

-- Add foreign key from quizzes to lessons
ALTER TABLE public.quizzes
ADD CONSTRAINT fk_quizzes_lesson
FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;

-- Add foreign key from enrollments to courses
ALTER TABLE public.enrollments
ADD CONSTRAINT fk_enrollments_course
FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;

-- Add foreign key from course_reviews to courses
ALTER TABLE public.course_reviews
ADD CONSTRAINT fk_course_reviews_course
FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;

-- Add foreign key from chat_messages to chat_sessions
ALTER TABLE public.chat_messages
ADD CONSTRAINT fk_chat_messages_session
FOREIGN KEY (session_id) REFERENCES public.chat_sessions(id) ON DELETE CASCADE;

-- Phase 2: Fix Achievement Security - Remove public creation policy
DROP POLICY IF EXISTS "System can create achievements" ON public.achievements;

-- Only admins can create achievements
CREATE POLICY "Only admins can create achievements"
ON public.achievements
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Phase 3: Add Data Integrity Constraints
-- Ensure rating is between 1 and 5 for course_reviews
ALTER TABLE public.course_reviews
ADD CONSTRAINT check_rating_range
CHECK (rating >= 1 AND rating <= 5);

-- Ensure course price is non-negative
ALTER TABLE public.courses
ADD CONSTRAINT check_price_non_negative
CHECK (price >= 0);

-- Ensure course rating is between 0 and 5
ALTER TABLE public.courses
ADD CONSTRAINT check_rating_valid
CHECK (rating >= 0 AND rating <= 5);

-- Ensure enrollment progress is between 0 and 100
ALTER TABLE public.enrollments
ADD CONSTRAINT check_progress_valid
CHECK (progress >= 0 AND progress <= 100);

-- Ensure quiz passing score is between 0 and 100
ALTER TABLE public.quizzes
ADD CONSTRAINT check_passing_score_valid
CHECK (passing_score >= 0 AND passing_score <= 100);

-- Phase 4: Add Performance Indexes
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_course_id ON public.user_progress(course_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON public.enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON public.chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_course_reviews_course_id ON public.course_reviews(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON public.lessons(course_id);

-- Phase 5: Tighten RLS Policies
-- Fix course_reviews to prevent anonymous reviews
DROP POLICY IF EXISTS "Anyone can view course reviews" ON public.course_reviews;
CREATE POLICY "Anyone can view course reviews"
ON public.course_reviews
FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can create reviews and only for courses they're enrolled in
DROP POLICY IF EXISTS "Users can manage their reviews" ON public.course_reviews;
CREATE POLICY "Users can create their reviews"
ON public.course_reviews
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM public.enrollments
    WHERE user_id = auth.uid() AND course_id = course_reviews.course_id
  )
);

CREATE POLICY "Users can update their reviews"
ON public.course_reviews
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their reviews"
ON public.course_reviews
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Phase 6: Strengthen Password Policy (requires Supabase dashboard manual config)
-- Note: Password policies must be configured in Supabase Dashboard under Authentication > Policies
-- Recommended settings:
-- - Minimum password length: 8 characters
-- - Require uppercase, lowercase, numbers, and special characters
-- - Enable leaked password protection
-- - Set OTP expiry to 600 seconds (10 minutes)