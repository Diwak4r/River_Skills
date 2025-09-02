import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  BookOpen, 
  Users, 
  Star, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

const stats = [
  { label: 'Active Learners', value: '50,000+', icon: Users },
  { label: 'Courses Available', value: '200+', icon: BookOpen },
  { label: 'Success Rate', value: '95%', icon: TrendingUp },
  { label: 'Certificates Earned', value: '15,000+', icon: Award },
];

const typingWords = [
  'Master New Skills',
  'Build Your Career',
  'Learn with AI',
  'Transform Your Future'
];

export default function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentWord = typingWords[currentWordIndex];
    
    if (isTyping) {
      if (displayText.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentWordIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-background to-secondary-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply animate-float"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-accent/10 rounded-full mix-blend-multiply animate-float-delayed"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-secondary/10 rounded-full mix-blend-multiply animate-float"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* New Badge */}
        <div className="flex justify-center mb-8">
          <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-2 text-sm font-medium animate-fade-in-up">
            <Sparkles className="w-4 h-4 mr-2" />
            Introducing River Skills 2.0 - Next-Gen Learning Platform
          </Badge>
        </div>

        {/* Main Heading */}
        <div className="space-y-6 mb-12">
          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight animate-fade-in-up" 
              style={{ animationDelay: '0.2s' }}>
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              River Skills 2.0
            </span>
          </h1>
          
          <div className="text-xl md:text-2xl text-muted-foreground animate-fade-in-up" 
               style={{ animationDelay: '0.4s' }}>
            <span>Empowering you to </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold min-h-[1.5em] inline-block">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up" 
             style={{ animationDelay: '0.6s' }}>
            Experience the future of education with our AI-powered learning platform. 
            From coding to design, business to languages - master any skill with personalized guidance, 
            interactive content, and real-world projects.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" 
             style={{ animationDelay: '0.8s' }}>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <Link to="/courses">
              Start Learning Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>

          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-primary/20 hover:border-primary/40 bg-background/80 backdrop-blur px-8 py-4 text-lg"
            asChild
          >
            <Link to="/courses">
              <Play className="mr-2 w-5 h-5" />
              Browse Courses
            </Link>
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up" 
             style={{ animationDelay: '1s' }}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-gradient-to-br from-card to-muted/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Highlights */}
        <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto animate-fade-in-up" 
             style={{ animationDelay: '1.2s' }}>
          <div className="bg-gradient-to-br from-card to-primary/5 p-6 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-600 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Expert-Led Courses</h3>
            <p className="text-muted-foreground">Learn from industry professionals with hands-on projects and real-world applications.</p>
          </div>

          <div className="bg-gradient-to-br from-card to-accent/5 p-6 rounded-2xl border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent-600 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">AI-Powered Learning</h3>
            <p className="text-muted-foreground">Personalized learning paths powered by advanced AI to match your goals and pace.</p>
          </div>

          <div className="bg-gradient-to-br from-card to-secondary/5 p-6 rounded-2xl border border-secondary/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-secondary to-secondary-600 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Certified Results</h3>
            <p className="text-muted-foreground">Earn industry-recognized certificates that boost your career prospects.</p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
          <p className="text-sm text-muted-foreground mb-6">
            Trusted by learners worldwide and backed by industry leaders
          </p>
          
          <div className="flex items-center justify-center space-x-8 opacity-60 hover:opacity-80 transition-opacity">
            {/* Placeholder for partner logos */}
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 fill-current text-yellow-500" />
              <span className="font-medium">4.9/5 Rating</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-medium">50k+ Students</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-accent" />
              <span className="font-medium">Industry Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}