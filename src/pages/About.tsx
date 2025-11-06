
import ModernHeader from "@/components/layout/ModernHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lightbulb, Rocket, Heart, Target, Globe, Users, Mail, GraduationCap, Briefcase, Code2, Star, Book, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const platformFeatures = [
    {
      icon: <Book className="w-6 h-6" />,
      title: "200+ Free Courses",
      description: "Curated courses from top platforms worldwide, completely free."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Multi-Language Support",
      description: "Content available in English, Hindi, and Nepali for inclusive learning."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "50+ AI Tools",
      description: "Discover and access the best AI-powered learning and development tools."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Intelligent Assistant",
      description: "Chat with Diwa for personalized learning guidance and course recommendations."
    }
  ];

  const missionPoints = [
    "Making quality education accessible to everyone, regardless of financial background",
    "Supporting students in Nepal and India with resources in their native languages",
    "Bridging the gap between academic learning and practical industry skills",
    "Creating a community of learners who support each other's growth"
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-6 relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-accent/10 rounded-lg opacity-30 animate-float"></div>
          
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 animate-fade-in-up pb-2">
              About RiverSkills
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Your gateway to free, quality education. Built with passion, powered by community.
            </p>

            <div className="bg-card rounded-2xl shadow-xl p-8 md:p-12 text-left animate-fade-in-up border border-border" style={{ animationDelay: '0.4s' }}>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mb-4 shadow-lg">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-heading font-bold mb-2">RiverSkills Platform</h2>
                <p className="text-muted-foreground">Where Learning Flows Like a River</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {platformFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-primary/5 rounded-lg border border-primary/10 hover:border-primary/30 transition-all duration-300">
                    <div className="bg-gradient-to-br from-primary to-accent text-white p-3 rounded-full flex-shrink-0 shadow-md">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <div className="space-y-3">
                  {missionPoints.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-4">Meet the Creator</h2>
              <p className="text-muted-foreground text-lg">The mind behind RiverSkills</p>
            </div>
            
            <Card className="bg-card/80 backdrop-blur-sm shadow-xl border-border">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-center md:text-left">
                    <Avatar className="w-32 h-32 border-4 border-background shadow-lg mx-auto md:mx-0">
                      <AvatarImage src="/lovable-uploads/5aebc577-c367-47ca-b60b-74b3d331753b.png" alt="Diwakar Yadav" />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-accent text-white">DY</AvatarFallback>
                    </Avatar>
                    <h3 className="text-2xl font-bold mt-4">Diwakar Yadav</h3>
                    <p className="text-primary font-medium">Creator & Developer</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href="mailto:reachout.diwakar@gmail.com" className="text-sm text-primary hover:underline">
                        reachout.diwakar@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">BIT Student</p>
                          <p className="text-sm text-muted-foreground">Himalayan WhiteHouse International College</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-accent" />
                        <div>
                          <p className="font-medium">Computer Support Staff</p>
                          <p className="text-sm text-muted-foreground">MC Group of Companies</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Code2 className="w-5 h-5 text-secondary" />
                        <div>
                          <p className="font-medium">Full Stack Developer</p>
                          <p className="text-sm text-muted-foreground">Kathmandu, Nepal</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                      <p className="text-muted-foreground italic">
                        "As a student juggling work and studies, I understand the challenges of accessing quality education. RiverSkills is my contribution to making learning accessible to everyone, especially students like me who are building their future one project at a time."
                      </p>
                      <p className="text-right mt-2 font-medium text-primary">— Diwakar Yadav</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-primary to-accent text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-heading font-bold mb-6">Get in Touch</h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Have questions about RiverSkills? Want to contribute or collaborate?
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:reachout.diwakar@gmail.com"
                className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                Contact Diwakar
              </a>
            </div>
            <p className="mt-8 text-primary-foreground/80">
              "Built with Passion by Diwakar Yadav" 💪🌊
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
