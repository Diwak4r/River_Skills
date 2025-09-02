import ModernHeader from '@/components/layout/ModernHeader';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import { useAuth } from '@/hooks/useAuth';

export default function RiverSkills20Home() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 mx-auto bg-gradient-to-r from-primary to-accent rounded-xl animate-pulse"></div>
          <p className="text-muted-foreground">Loading River Skills 2.0...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Courses */}
      <FeaturedCourses />
      
      {/* TODO: Add more sections */}
      {/* AI Tools Showcase */}
      {/* Success Stories */}
      {/* Modern Footer */}
    </div>
  );
}