import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Play,
  Heart,
  Share2,
  DollarSign
} from 'lucide-react';
import type { Course } from '@/types';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useCourses } from '@/hooks/useCourses';
import { useToast } from '@/hooks/use-toast';

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
  progress?: number;
  variant?: 'default' | 'compact' | 'featured';
}

export default function CourseCard({ 
  course, 
  showProgress = false, 
  progress = 0,
  variant = 'default'
}: CourseCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { enrollInCourse } = useCourses();
  const { toast } = useToast();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const handleEnroll = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to enroll in courses.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const result = await enrollInCourse(course.id, user.id);
    setIsLoading(false);

    if (result.success) {
      // Optionally redirect to course page or update UI
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.description,
        url: `/courses/${course.id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/courses/${course.id}`);
      toast({
        title: "Link copied!",
        description: "Course link has been copied to clipboard.",
      });
    }
  };

  if (variant === 'compact') {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/20">
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex-shrink-0">
              {course.thumbnail ? (
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <Link to={`/courses/${course.id}`}>
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-1">
                  {course.title}
                </h3>
              </Link>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center mt-2 space-x-3 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{course.duration}h</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-current text-yellow-500" />
                  <span>{course.rating}</span>
                </div>
              </div>
            </div>
          </div>
          {showProgress && (
            <Progress value={progress} className="mt-3 h-1" />
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-gradient-to-br from-card to-muted/10",
      variant === 'featured' && "border-2 border-primary/20 shadow-lg"
    )}>
      {/* Course Image */}
      <div className="relative aspect-video overflow-hidden">
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button size="sm" className="bg-white/20 backdrop-blur text-white hover:bg-white/30">
            <Play className="w-4 h-4 mr-2" />
            Preview
          </Button>
        </div>

        {/* Price Badge */}
        {course.price > 0 ? (
          <Badge className="absolute top-3 right-3 bg-white/90 text-gray-900 hover:bg-white">
            <DollarSign className="w-3 h-3 mr-1" />
            {course.price}
          </Badge>
        ) : (
          <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">
            Free
          </Badge>
        )}

        {/* Difficulty Badge */}
        <Badge className={cn("absolute top-3 left-3", getDifficultyColor(course.difficulty))}>
          {course.difficulty}
        </Badge>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 bg-white/20 backdrop-blur text-white hover:bg-white/30"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={cn("w-4 h-4", isLiked && "fill-current text-red-500")} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 bg-white/20 backdrop-blur text-white hover:bg-white/30"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link to={`/courses/${course.id}`}>
              <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">
                {course.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {course.description}
            </p>
          </div>
        </div>

        {/* Course Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {course.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {course.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{course.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Instructor */}
        <div className="flex items-center space-x-2 mb-3">
          <Avatar className="w-6 h-6">
            <AvatarImage src={course.instructor.avatar} />
            <AvatarFallback className="text-xs bg-gradient-to-r from-primary to-accent text-white">
              {course.instructor.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{course.instructor.name}</span>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration} hours</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.enrolledCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-current text-yellow-500" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="w-4 h-4" />
            <span>{course.lessons.length} lessons</span>
          </div>
        </div>

        {/* Progress Bar (if enrolled) */}
        {showProgress && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        {showProgress ? (
          <Button asChild className="w-full">
            <Link to={`/courses/${course.id}`}>
              Continue Learning
            </Link>
          </Button>
        ) : (
          <Button 
            onClick={handleEnroll}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            {isLoading ? "Enrolling..." : course.price > 0 ? `Enroll - $${course.price}` : "Enroll Free"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}