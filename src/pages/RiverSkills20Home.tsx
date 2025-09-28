import ModernHeader from '@/components/layout/ModernHeader';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import TestAuth from '@/components/TestAuth';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
      
      {/* Auth Test Section - Mobile Only */}
      <div className="md:hidden p-4 space-y-3 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-center">Test Authentication</h3>
        <TestAuth />
      </div>
    </div>
  );
}