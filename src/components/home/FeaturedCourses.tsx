import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, TrendingUp, BookOpen } from 'lucide-react';
import CourseCard from '@/components/courses/CourseCard';
import type { Course } from '@/types';

const categories = [
  { id: 'all', label: 'All Courses', color: 'bg-primary' },
  { id: 'programming', label: 'Programming', color: 'bg-blue-500' },
  { id: 'design', label: 'Design', color: 'bg-purple-500' },
  { id: 'business', label: 'Business', color: 'bg-green-500' },
  { id: 'data-science', label: 'Data Science', color: 'bg-orange-500' },
  { id: 'ai-ml', label: 'AI & ML', color: 'bg-red-500' },
];

// Mock featured courses data for demonstration
const mockFeaturedCourses: Course[] = [
  {
    id: '1',
    title: 'Complete React Developer Course 2024',
    description: 'Master React from basics to advanced concepts with hooks, context, and modern patterns',
    category: 'programming',
    difficulty: 'intermediate' as const,
    duration: 40,
    instructor: {
      id: '1',
      name: 'John Doe',
      avatar: '',
      bio: 'Senior React Developer at Google',
      email: 'john@example.com',
      specialties: ['React', 'JavaScript', 'TypeScript']
    },
    lessons: [],
    price: 99.99,
    rating: 4.8,
    enrolledCount: 2543,
    thumbnail: '',
    tags: ['React', 'JavaScript', 'Web Development', 'Frontend'],
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'AI-Powered UI/UX Design Masterclass',
    description: 'Learn modern design principles and AI tools for creating stunning user experiences',
    category: 'design',
    difficulty: 'beginner' as const,
    duration: 25,
    instructor: {
      id: '2',
      name: 'Sarah Wilson',
      avatar: '',
      bio: 'Lead Designer at Figma',
      email: 'sarah@example.com',
      specialties: ['UI/UX', 'Figma', 'Design Systems']
    },
    lessons: [],
    price: 0,
    rating: 4.9,
    enrolledCount: 1876,
    thumbnail: '',
    tags: ['UI/UX', 'Figma', 'Design', 'AI Tools'],
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    title: 'Python Machine Learning Bootcamp',
    description: 'Complete hands-on ML course with Python, scikit-learn, and TensorFlow',
    category: 'ai-ml',
    difficulty: 'advanced' as const,
    duration: 60,
    instructor: {
      id: '3',
      name: 'Dr. Mike Chen',
      avatar: '',
      bio: 'ML Engineer at OpenAI',
      email: 'mike@example.com',
      specialties: ['Python', 'Machine Learning', 'Deep Learning']
    },
    lessons: [],
    price: 149.99,
    rating: 4.7,
    enrolledCount: 987,
    thumbnail: '',
    tags: ['Python', 'Machine Learning', 'AI', 'Data Science'],
    isPublished: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function FeaturedCourses() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // In a real app, you'd use the courses from the hook
  // const { courses, loading } = useCourses({ category: activeCategory === 'all' ? undefined : activeCategory });
  const courses = mockFeaturedCourses;
  const loading = false;

  // Memoize filtered courses for performance
  const filteredCourses = useMemo(() => {
    return activeCategory === 'all' 
      ? courses 
      : courses.filter(course => course.category === activeCategory);
  }, [activeCategory, courses]);

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Badge className="bg-gradient-to-r from-primary to-accent text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Featured Courses
            </Badge>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Popular Courses
            </span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most sought-after courses, carefully curated by industry experts 
            and loved by thousands of learners worldwide.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <div className="flex items-center justify-between mb-8">
              <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-3 md:grid-cols-6 h-auto p-1 bg-muted/50">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <div className={`w-2 h-2 rounded-full ${category.color}`} />
                    <span className="hidden sm:inline">{category.label}</span>
                    <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Course Grid */}
            <div className="space-y-8">
              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="mt-0">
                  {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="status" aria-label="Loading courses">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                          <div className="bg-muted rounded-lg h-64 mb-4" />
                          <div className="bg-muted rounded h-4 mb-2" />
                          <div className="bg-muted rounded h-4 w-2/3" />
                        </div>
                      ))}
                    </div>
                  ) : filteredCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredCourses.slice(0, 6).map((course) => (
                        <CourseCard 
                          key={course.id} 
                          course={course}
                          variant={course.rating > 4.8 ? 'featured' : 'default'}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-2xl font-semibold mb-2">No courses found</h3>
                      <p className="text-muted-foreground">
                        We're adding new courses regularly. Check back soon!
                      </p>
                    </div>
                  )}

                  {/* Show More Button */}
                  {filteredCourses.length > 6 && (
                    <div className="text-center mt-12">
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="bg-background hover:bg-muted border-2 border-primary/20 hover:border-primary/40"
                        asChild
                      >
                        <Link to={`/courses?category=${category.id}`}>
                          View All {category.label}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>

        {/* Stats & Social Proof */}
        <aside className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-2xl p-8 text-center" aria-label="Platform statistics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary" aria-label="4.8 stars out of 5">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">95%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-secondary">50k+</div>
              <div className="text-sm text-muted-foreground">Happy Students</div>
            </div>
          </div>
        </aside>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 shadow-lg"
            asChild
          >
            <Link to="/courses">
              Explore All Courses
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}