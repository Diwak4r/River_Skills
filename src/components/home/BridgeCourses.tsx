import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Database, Palette, Brain } from 'lucide-react';

const bridgeCourses = [
  {
    id: 'frontend-to-backend',
    title: 'Frontend to Backend',
    description: 'Master full-stack development by bridging your frontend skills with backend technologies',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    duration: '12 weeks',
  },
  {
    id: 'python-for-analysts',
    title: 'Python for Data Analysts',
    description: 'Transform your data analysis workflow with Python programming',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    duration: '8 weeks',
  },
  {
    id: 'ui-for-developers',
    title: 'UI Design for Developers',
    description: 'Learn essential design principles to create beautiful, user-friendly interfaces',
    icon: Palette,
    color: 'from-purple-500 to-pink-500',
    duration: '10 weeks',
  },
  {
    id: 'ai-for-professionals',
    title: 'AI for Professionals',
    description: 'Leverage AI tools to supercharge your productivity and decision-making',
    icon: Brain,
    color: 'from-orange-500 to-red-500',
    duration: '6 weeks',
  },
];

export default function BridgeCourses() {
  return (
    <section className="my-20 animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
      <div className="text-center mb-10">
        <Badge className="bg-gradient-to-r from-primary to-accent text-white mb-4">
          Bridge Your Knowledge
        </Badge>
        <h2 className="text-3xl md:text-4xl font-heading font-bold">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Popular Bridge Courses
          </span>
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Transition smoothly between different domains with our specialized bridge courses
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {bridgeCourses.map((course) => {
          const Icon = course.icon;
          return (
            <Link
              key={course.id}
              to={`/courses?bridge=${course.id}`}
              className="group"
            >
              <div className="bg-gradient-to-br from-card to-muted/20 rounded-2xl p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                <div className={`w-12 h-12 bg-gradient-to-r ${course.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{course.duration}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <Button variant="outline" asChild>
          <Link to="/courses?filter=bridge">
            View All Bridge Courses
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
