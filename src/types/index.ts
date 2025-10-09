// River Skills 2.0 Type Definitions

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in hours
  instructor: Instructor;
  lessons: Lesson[];
  price: number;
  rating: number;
  enrolledCount: number;
  thumbnail: string;
  tags: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  orderIndex: number;
  videoUrl?: string;
  duration: number; // in minutes
  isPreview: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  email: string;
  specialties: string[];
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon?: string;
  apiEndpoint?: string;
  pricing: 'free' | 'freemium' | 'premium' | 'paid' | 'credits';
  features?: string[];
  capabilities?: string[];
  examples?: string[];
  usageCount?: number;
  isActive?: boolean;
  url?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  preferences: UserPreferences;
  learningHistory: LearningHistory;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  interests: string[];
  skillLevel: string;
  language: string;
  dailyGoal: number; // minutes
  timezone: string;
}

export interface LearningHistory {
  completedCourses: string[];
  currentCourses: string[];
  skills: string[];
  weakAreas: string[];
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number; // percentage
  completedAt?: Date;
  enrolledAt: Date;
}

export interface UserProgress {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  score?: number;
  timeSpent: number; // in minutes
  completedAt?: Date;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  userId: string;
  message: string;
  response?: string;
  type: 'course_help' | 'tech_support' | 'general' | 'ai_tool_help';
  createdAt: Date;
}

export interface ChatSession {
  id: string;
  userId: string;
  title?: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Achievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  badgeIcon: string;
  earnedAt: Date;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  answers: Record<string, string>;
  score: number;
  passed: boolean;
  completedAt: Date;
}

export interface CourseReview {
  id: string;
  userId: string;
  courseId: string;
  rating: number;
  reviewText?: string;
  createdAt: Date;
}