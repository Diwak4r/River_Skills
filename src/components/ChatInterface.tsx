
import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!initialized) {
      setMessages([{
        id: '1',
        content: "Hello! I'm Diwa AI, your intelligent assistant for RiverSkills! 🌊🤖\n\nI'm powered by advanced AI and can help you with:\n\n🎓 RiverSkills courses and learning paths\n🤖 Programming and technology questions\n🔬 Science, math, and engineering topics\n💼 Career guidance and professional development\n✍️ Creative writing and problem-solving\n🌍 General knowledge across all domains\n📚 Study strategies and learning tips\n\nI speak English, Hindi, and Nepali! What would you like to explore or learn about today?",
        sender: 'bot',
        timestamp: new Date(),
      }]);
      setInitialized(true);
    }
  }, [initialized]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(async () => {
    const messageToSend = inputMessage.trim();
    if (!messageToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Get the current session to include auth token
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to use the chat feature.",
          variant: "destructive",
        });
        setIsLoading(false);
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          content: "⚠️ Please sign in to use the chat feature. You can still explore our 200+ courses and resources!",
          sender: 'bot',
          timestamp: new Date(),
        }]);
        return;
      }

      const contextualMessage = `User message: ${messageToSend}

Context about RiverSkills and its creator:
- RiverSkills is a free learning platform created by Diwakar Yadav
- Diwakar is a BIT student from Kathmandu, Nepal working as Computer Support Staff at MC Group of Companies
- Contact: reachout.diwakar@gmail.com
- The platform offers 200+ free courses in English, Hindi, and Nepali
- Features include courses, resources, AI tools, and this chat assistant
- Mission: Making quality education accessible to all
- The platform focuses on practical, hands-on learning with real-world applications

Please respond as a helpful learning assistant who knows about RiverSkills and can help users find courses, resources, and learning paths.`;

      // Call the edge function using Supabase client with auth token
      const { data, error } = await supabase.functions.invoke('chat-with-diwa', {
        body: { 
          message: contextualMessage,
          mode: 'lite'
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to get response');
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting right now. Please try again in a moment. You can explore our 200+ courses and resources while I get back online!\n\nRemember, RiverSkills was created by Diwakar Yadav to make learning accessible to everyone. Feel free to browse our courses, resources, and AI tools in the meantime! 🌊",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorBotMessage]);
      
      toast({
        title: "Connection Error",
        description: "Unable to reach the assistant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, isLoading, toast]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return (
    <div className="flex flex-col h-full max-h-[85vh] bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl border border-gradient-to-r shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Diwa AI - Intelligent Assistant</h3>
            <p className="text-blue-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Powered by Google Gemini AI • RiverSkills Expert • Multi-Domain Knowledge
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}
            
            <div
              className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-lg ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-auto'
                  : 'bg-white border border-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {message.sender === 'user' && (
              <div className="w-10 h-10 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <User className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl px-6 py-4 shadow-lg">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Diwa AI anything - courses, programming, science, career advice, or general questions..."
              className="min-h-[50px] max-h-32 resize-none border-gray-300 focus:border-purple-500 focus:ring-purple-500 rounded-xl bg-white shadow-sm"
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 h-12 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
