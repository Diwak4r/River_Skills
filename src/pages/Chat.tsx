
import ModernHeader from "@/components/layout/ModernHeader";
import ChatInterface from "@/components/ChatInterface";

export default function Chat() {
  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      <main className="pt-20">
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in-up">
                Chat with Diwa AI
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Your intelligent AI assistant powered by Google Gemini. Get personalized learning guidance and course recommendations.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <ChatInterface />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
