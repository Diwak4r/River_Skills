import { Users, BookOpen, TrendingUp, Award } from 'lucide-react';

const stats = [
  { label: 'Active Learners', value: '50,000+', icon: Users },
  { label: 'Courses Available', value: '200+', icon: BookOpen },
  { label: 'Success Rate', value: '95%', icon: TrendingUp },
  { label: 'Certificates Earned', value: '15,000+', icon: Award },
];

export default function StatsGrid() {
  return (
    <div 
      className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up" 
      style={{ animationDelay: '1s' }}
      role="region"
      aria-label="Platform statistics"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div 
            key={stat.label} 
            className="text-center group hover:scale-105 transition-transform duration-300"
          >
            <div className="bg-gradient-to-br from-card to-muted/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50">
              <div 
                className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                aria-hidden="true"
              >
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
  );
}
