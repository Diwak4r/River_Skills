import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModernHeader from '@/components/layout/ModernHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Clock, 
  TrendingUp, 
  Star,
  Play,
  Calendar,
  Target,
  Award
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import CourseCard from '@/components/courses/CourseCard';

// Mock data for demonstration
const mockUserStats = {
  coursesEnrolled: 5,
  coursesCompleted: 2,
  totalLearningTime: 24,
  currentStreak: 7,
  overallProgress: 65,
  skillsLearned: ['React', 'Python', 'UI/UX Design'],
  certificates: 3,
};

const mockRecentCourses = [
  { id: '1', title: 'React Hooks Mastery', progress: 75, thumbnail: '', instructor: 'John Doe' },
  { id: '2', title: 'Python for Beginners', progress: 45, thumbnail: '', instructor: 'Jane Smith' },
  { id: '3', title: 'UI/UX Design Principles', progress: 90, thumbnail: '', instructor: 'Mike Wilson' },
];

const mockUpcomingDeadlines = [
  { title: 'React Project Submission', date: '2024-01-25', course: 'React Hooks Mastery' },
  { title: 'Python Quiz', date: '2024-01-28', course: 'Python for Beginners' },
];

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 mx-auto bg-gradient-to-r from-primary to-accent rounded-xl animate-pulse"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const welcomeHour = new Date().getHours();
  const getGreeting = () => {
    if (welcomeHour < 12) return 'Good morning';
    if (welcomeHour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          {/* Welcome Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
              {getGreeting()}, {user.user_metadata?.full_name || user.email?.split('@')[0]}! 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Ready to continue your learning journey? Let's make today count!
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Courses Enrolled</p>
                    <p className="text-2xl font-bold text-primary">{mockUserStats.coursesEnrolled}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-secondary">{mockUserStats.coursesCompleted}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Learning Hours</p>
                    <p className="text-2xl font-bold text-accent">{mockUserStats.totalLearningTime}h</p>
                  </div>
                  <Clock className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-100 to-orange-50 border-orange-200 dark:from-orange-900/20 dark:to-orange-800/10 dark:border-orange-800/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                    <p className="text-2xl font-bold text-orange-600">{mockUserStats.currentStreak} days</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Continue Learning */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-heading font-bold mb-6">Continue Learning</h2>
                <div className="space-y-4">
                  {mockRecentCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-8 h-8 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">by {course.instructor}</p>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>
                          </div>
                          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Overall Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Overall Progress
                  </CardTitle>
                  <CardDescription>
                    Your learning journey across all enrolled courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Completion</span>
                      <span className="text-lg font-bold">{mockUserStats.overallProgress}%</span>
                    </div>
                    <Progress value={mockUserStats.overallProgress} className="h-3" />
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        Skills Learned: {mockUserStats.skillsLearned.length}
                      </Badge>
                      <Badge variant="secondary" className="bg-accent/10 text-accent">
                        Certificates: {mockUserStats.certificates}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUpcomingDeadlines.map((deadline, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{deadline.title}</h4>
                          <p className="text-xs text-muted-foreground">{deadline.course}</p>
                          <p className="text-xs text-accent font-medium">{deadline.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-secondary/10 to-secondary/5">
                      <Trophy className="w-6 h-6 text-secondary" />
                      <div>
                        <p className="font-medium text-sm">Course Completed</p>
                        <p className="text-xs text-muted-foreground">React Fundamentals</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-accent/10 to-accent/5">
                      <Star className="w-6 h-6 text-accent" />
                      <div>
                        <p className="font-medium text-sm">7-Day Streak</p>
                        <p className="text-xs text-muted-foreground">Keep it up!</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse New Courses
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Brain className="w-4 h-4 mr-2" />
                    Try AI Tools
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Award className="w-4 h-4 mr-2" />
                    View Certificates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}