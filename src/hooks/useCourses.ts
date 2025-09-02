import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Course } from '@/types';

export interface CourseFilters {
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  minRating?: number;
  maxPrice?: number;
  search?: string;
}

export const useCourses = (filters?: CourseFilters) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('courses')
        .select(`
          *,
          instructor:instructor_id(
            id,
            full_name,
            avatar_url,
            email
          ),
          lessons(
            id,
            title,
            duration,
            order_index
          )
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.category) {
        query = query.eq('category', filters.category);
      }
      
      if (filters?.difficulty) {
        query = query.eq('difficulty', filters.difficulty);
      }
      
      if (filters?.minRating) {
        query = query.gte('rating', filters.minRating);
      }
      
      if (filters?.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }
      
      if (filters?.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Transform the data to match our Course interface
      const transformedCourses: Course[] = (data || []).map(course => ({
        id: course.id,
        title: course.title,
        description: course.description || '',
        category: course.category,
        difficulty: course.difficulty,
        duration: course.duration || 0,
        instructor: {
          id: course.instructor?.id || '',
          name: course.instructor?.full_name || 'Unknown Instructor',
          avatar: course.instructor?.avatar_url || '',
          bio: '',
          email: course.instructor?.email || '',
          specialties: [],
        },
        lessons: (course.lessons || []).map((lesson: any) => ({
          id: lesson.id,
          courseId: course.id,
          title: lesson.title,
          content: '',
          orderIndex: lesson.order_index,
          duration: lesson.duration || 0,
          isPreview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
        price: course.price || 0,
        rating: course.rating || 0,
        enrolledCount: course.enrolled_count || 0,
        thumbnail: course.thumbnail || '',
        tags: course.tags || [],
        isPublished: course.is_published,
        createdAt: new Date(course.created_at),
        updatedAt: new Date(course.updated_at),
      }));

      setCourses(transformedCourses);
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error loading courses",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async (courseId: string, userId: string) => {
    try {
      const { error } = await supabase
        .from('enrollments')
        .insert({
          user_id: userId,
          course_id: courseId,
          progress: 0,
        });

      if (error) throw error;

      toast({
        title: "Enrollment successful!",
        description: "You've been enrolled in the course. Happy learning!",
      });

      return { success: true };
    } catch (err: any) {
      toast({
        title: "Enrollment failed",
        description: err.message,
        variant: "destructive",
      });
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [filters]);

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
    enrollInCourse,
  };
};