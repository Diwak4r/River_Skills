import { lazy, Suspense } from 'react';
import ModernHeader from '@/components/layout/ModernHeader';
import HeroSection from '@/components/home/HeroSection';
import { useAuth } from '@/hooks/useAuth';

// Lazy load FeaturedCourses for better performance
const FeaturedCourses = lazy(() => import('@/components/home/FeaturedCourses'));

export default function RiverSkills20Home() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div 
        className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 flex items-center justify-center"
        role="status"
        aria-live="polite"
        aria-label="Loading application"
      >
        <div className="space-y-4 text-center">
          <div 
            className="w-12 h-12 mx-auto bg-gradient-to-r from-primary to-accent rounded-xl animate-pulse"
            aria-hidden="true"
          />
          <p className="text-muted-foreground">Loading River Skills 2.0...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      
      <ModernHeader />
      
      <main id="main-content" role="main">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Featured Courses */}
        <Suspense fallback={
          <section className="py-20 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-6 text-center">
              <div className="animate-pulse space-y-8">
                <div className="h-8 bg-muted rounded w-64 mx-auto" />
                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-64 bg-muted rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          </section>
        }>
          <FeaturedCourses />
        </Suspense>
      </main>
    </div>
  );
}