
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Target, Calendar, Award, BookOpen, Clock, CheckCircle, Trophy } from 'lucide-react';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useAuth } from '@/hooks/useAuth';

export default function ProgressTracking() {
  const { user } = useAuth();
  const { progressData, loading, error, updateWeeklyGoal } = useUserProgress();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 mx-auto bg-gradient-to-r from-primary to-accent rounded-xl animate-pulse"></div>
          <p className="text-muted-foreground">Loading your progress...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-destructive mb-4">Failed to load progress: {error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Please log in to view your progress.</p>
      </div>
    );
  }

  const completionRate = progressData.totalCoursesStarted > 0 
    ? Math.round((progressData.coursesCompleted / progressData.totalCoursesStarted) * 100) 
    : 0;
  const weeklyProgressPercent = Math.round((progressData.weeklyProgress / progressData.weeklyGoal) * 100);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Learning Progress
        </h2>
        <p className="text-xl text-gray-600">Track your learning journey and achievements</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Courses Completed</p>
                <p className="text-3xl font-bold">{progressData.coursesCompleted}</p>
                <p className="text-blue-100 text-sm">of {progressData.totalCoursesStarted} started</p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Hours Learned</p>
                <p className="text-3xl font-bold">{progressData.hoursLearned}</p>
                <p className="text-green-100 text-sm">total time</p>
              </div>
              <Clock className="w-12 h-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Learning Streak</p>
                <p className="text-3xl font-bold">{progressData.streak}</p>
                <p className="text-orange-100 text-sm">days in a row</p>
              </div>
              <TrendingUp className="w-12 h-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Certificates</p>
                <p className="text-3xl font-bold">{progressData.certificates}</p>
                <p className="text-purple-100 text-sm">earned</p>
              </div>
              <Award className="w-12 h-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Completion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Course Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Overall Progress</span>
              <span className="font-bold text-2xl text-blue-600">{completionRate}%</span>
            </div>
            <Progress value={completionRate} className="h-3" />
            <p className="text-sm text-gray-500">
              {progressData.totalCoursesStarted > 0 
                ? `You've completed ${progressData.coursesCompleted} out of ${progressData.totalCoursesStarted} courses`
                : "Start your first course to track progress!"
              }
            </p>
          </CardContent>
        </Card>

        {/* Weekly Goal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600" />
              Weekly Learning Goal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">This Week</span>
              <span className="font-bold text-2xl text-green-600">
                {progressData.weeklyProgress}h / {progressData.weeklyGoal}h
              </span>
            </div>
            <Progress value={weeklyProgressPercent} className="h-3" />
            <div className="flex gap-2">
              {[5, 10, 15, 20].map((hours) => (
                <Button
                  key={hours}
                  variant={progressData.weeklyGoal === hours ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateWeeklyGoal(hours)}
                >
                  {hours}h
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Learned */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-purple-600" />
            Skills Learned
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {progressData.skillsLearned.length > 0 ? (
              progressData.skillsLearned.map((skill, index) => (
                <Badge key={index} className="bg-purple-100 text-purple-700 px-3 py-1">
                  {skill}
                </Badge>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">Complete courses to unlock skills!</p>
            )}
          </div>
          {progressData.skillsLearned.length > 0 && (
            <p className="text-sm text-gray-500 mt-4">
              You've learned {progressData.skillsLearned.length} skills so far. Keep going!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progressData.achievements.length > 0 ? (
              progressData.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="p-4 rounded-lg border-2 border-yellow-300 bg-yellow-50 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  
                  <Badge className="mt-2 bg-yellow-500 text-white">
                    <Trophy className="w-3 h-3 mr-1" />
                    Earned on {achievement.earnedAt.toLocaleDateString()}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <Trophy className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-lg mb-2">No achievements yet</p>
                <p className="text-sm text-muted-foreground">
                  Complete courses and maintain learning streaks to earn achievements!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
