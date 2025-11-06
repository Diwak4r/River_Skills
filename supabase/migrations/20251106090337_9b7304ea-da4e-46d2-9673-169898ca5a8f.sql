-- Fix nullable user_id columns to prevent RLS bypass
-- Verified no NULL values exist in production

-- Make user_id columns NOT NULL to enforce RLS policies
ALTER TABLE quiz_attempts ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE chat_sessions ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE user_progress ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE achievements ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE enrollments ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE course_reviews ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE chat_messages ALTER COLUMN user_id SET NOT NULL;