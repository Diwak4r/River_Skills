import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface UserProgressData {
  coursesCompleted: number;
  totalCoursesStarted: number;
  hoursLearned: number;
  streak: number;
  skillsLearned: string[];
  certificates: number;
  lastActivity: Date | null;
  weeklyGoal: number;
  weeklyProgress: number;
  overallProgress: number;
  recentCourses: Array<{
    id: string;
    title: string;
    progress: number;
    instructor: string;
    category: string;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    earnedAt: Date;
  }>;
}

export function useUserProgress() {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState<UserProgressData>({
    coursesCompleted: 0,
    totalCoursesStarted: 0,
    hoursLearned: 0,
    streak: 0,
    skillsLearned: [],
    certificates: 0,
    lastActivity: null,
    weeklyGoal: 10,
    weeklyProgress: 0,
    overallProgress: 0,
    recentCourses: [],
    achievements: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProgress = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch user enrollments
      const { data: enrollments, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses!fk_enrollments_course (
            id,
            title,
            category,
            instructor_id,
            profiles!courses_instructor_id_fkey (
              full_name
            )
          )
        `)
        .eq('user_id', user.id);

      if (enrollmentsError) throw enrollmentsError;

      // Fetch user progress details
      const { data: userProgress, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (progressError) throw progressError;

      // Fetch user achievements
      const { data: achievements, error: achievementsError } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });

      if (achievementsError) throw achievementsError;

      // Calculate progress statistics
      const totalEnrolled = enrollments?.length || 0;
      const completed = enrollments?.filter(e => e.completed_at).length || 0;
      
      // Calculate total learning time from user_progress
      const totalMinutes = userProgress?.reduce((sum, p) => sum + (p.time_spent || 0), 0) || 0;
      const hoursLearned = Math.round((totalMinutes / 60) * 10) / 10;

      // Calculate learning streak (simplified - consecutive days with activity)
      const streak = calculateLearningStreak(userProgress || []);

      // Get unique skills/categories from completed courses
      const skillsLearned = [
        ...new Set(
          enrollments
            ?.filter(e => e.completed_at)
            .map(e => e.courses?.category)
            .filter(Boolean) || []
        )
      ] as string[];

      // Calculate weekly progress (last 7 days)
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - 7);
      const weeklyMinutes = userProgress
        ?.filter(p => p.completed_at && new Date(p.completed_at) >= weekStart)
        .reduce((sum, p) => sum + (p.time_spent || 0), 0) || 0;
      const weeklyProgress = Math.round((weeklyMinutes / 60) * 10) / 10;

      // Calculate overall progress percentage
      const overallProgress = totalEnrolled > 0 
        ? Math.round((completed / totalEnrolled) * 100) 
        : 0;

      // Get recent courses with progress
      const recentCourses = enrollments
        ?.slice(0, 5)
        ?.map(enrollment => ({
          id: enrollment.course_id || '',
          title: enrollment.courses?.title || 'Unknown Course',
          progress: enrollment.progress || 0,
          instructor: enrollment.courses?.profiles?.full_name || 'Unknown Instructor',
          category: enrollment.courses?.category || 'General'
        })) || [];

      // Get last activity date
      const lastActivity = userProgress
        ?.filter(p => p.completed_at)
        .sort((a, b) => new Date(b.completed_at!).getTime() - new Date(a.completed_at!).getTime())[0]
        ?.completed_at ? new Date(userProgress.filter(p => p.completed_at)
          .sort((a, b) => new Date(b.completed_at!).getTime() - new Date(a.completed_at!).getTime())[0]
          .completed_at!) : null;

      // Map achievements
      const userAchievements = achievements?.map(achievement => ({
        id: achievement.id,
        title: achievement.title,
        description: achievement.description || '',
        icon: achievement.badge_icon || '🏆',
        earnedAt: new Date(achievement.earned_at!)
      })) || [];

      setProgressData({
        coursesCompleted: completed,
        totalCoursesStarted: totalEnrolled,
        hoursLearned,
        streak,
        skillsLearned,
        certificates: completed, // Each completed course = certificate for now
        lastActivity,
        weeklyGoal: 10, // Default goal, could be stored in user preferences
        weeklyProgress,
        overallProgress,
        recentCourses,
        achievements: userAchievements
      });

      // Auto-generate achievements based on progress
      await generateAchievements(user.id, {
        coursesCompleted: completed,
        hoursLearned,
        streak,
        skillsCount: skillsLearned.length
      });

    } catch (err) {
      console.error('Error fetching user progress:', err);
      setError(err instanceof Error ? err.message : 'Failed to load progress data');
    } finally {
      setLoading(false);
    }
  };

  const calculateLearningStreak = (progressData: any[]): number => {
    if (!progressData.length) return 0;

    // Get unique dates with activity
    const activityDates = [...new Set(
      progressData
        .filter(p => p.completed_at)
        .map(p => new Date(p.completed_at).toDateString())
    )].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    if (!activityDates.length) return 0;

    let streak = 1;
    const today = new Date().toDateString();
    let currentDate = new Date();

    // Check if user has activity today or yesterday
    if (activityDates[0] !== today) {
      currentDate.setDate(currentDate.getDate() - 1);
      if (activityDates[0] !== currentDate.toDateString()) {
        return 0; // No recent activity
      }
    }

    // Count consecutive days
    for (let i = 1; i < activityDates.length; i++) {
      const prevDate = new Date(activityDates[i - 1]);
      const currDate = new Date(activityDates[i]);
      const dayDiff = Math.floor((prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const generateAchievements = async (userId: string, stats: {
    coursesCompleted: number;
    hoursLearned: number;
    streak: number;
    skillsCount: number;
  }) => {
    const achievementTemplates = [
      {
        id: 'first_course',
        title: 'First Steps',
        description: 'Complete your first course',
        icon: '🎯',
        condition: () => stats.coursesCompleted >= 1
      },
      {
        id: 'learning_streak_7',
        title: 'Week Warrior',
        description: 'Learn for 7 days in a row',
        icon: '🔥',
        condition: () => stats.streak >= 7
      },
      {
        id: 'course_collector_5',
        title: 'Course Collector',
        description: 'Complete 5 courses',
        icon: '📚',
        condition: () => stats.coursesCompleted >= 5
      },
      {
        id: 'time_master_25',
        title: 'Time Master',
        description: 'Log 25 hours of learning',
        icon: '⏰',
        condition: () => stats.hoursLearned >= 25
      },
      {
        id: 'skill_builder_3',
        title: 'Skill Builder',
        description: 'Learn 3 different skills',
        icon: '🛠️',
        condition: () => stats.skillsCount >= 3
      }
    ];

    for (const template of achievementTemplates) {
      if (template.condition()) {
        // Check if achievement already exists
        const { data: existing } = await supabase
          .from('achievements')
          .select('id')
          .eq('user_id', userId)
          .eq('title', template.title)
          .single();

        if (!existing) {
          // Create new achievement
          await supabase
            .from('achievements')
            .insert({
              user_id: userId,
              title: template.title,
              description: template.description,
              badge_icon: template.icon
            });
        }
      }
    }
  };

  const updateWeeklyGoal = async (newGoal: number) => {
    // Update in user preferences (would need to extend profiles table)
    setProgressData(prev => ({ ...prev, weeklyGoal: newGoal }));
  };

  const enrollInCourse = async (courseId: string) => {
    if (!user) return { success: false, error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: courseId,
          progress: 0
        });

      if (error) throw error;

      // Refresh progress data
      await fetchUserProgress();
      
      return { success: true };
    } catch (err) {
      console.error('Error enrolling in course:', err);
      return { 
        success: false, 
        error: err instanceof Error ? err.message : 'Failed to enroll in course' 
      };
    }
  };

  useEffect(() => {
    fetchUserProgress();
  }, [user]);

  return {
    progressData,
    loading,
    error,
    refetch: fetchUserProgress,
    updateWeeklyGoal,
    enrollInCourse
  };
}