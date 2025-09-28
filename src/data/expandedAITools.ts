
export interface AITool {
  id: number;
  name: string;
  description: string;
  category: string;
  image: string;
  url: string;
  pricing: string;
  features: string[];
  isFeatured?: boolean;
  isNew?: boolean;
}

export const aiTools: AITool[] = [
  // New 2025 AI Tools & Agents
  {
    id: 101,
    name: "Asana AI Teammates",
    description: "AI-powered teammates that collaborate with you on project management, task automation, and team coordination.",
    category: "Productivity & Automation",
    image: "/api/placeholder/300/200",
    url: "https://asana.com/ai",
    pricing: "Premium",
    features: ["Task Automation", "Project Planning", "Team Collaboration", "Smart Scheduling", "Progress Tracking"],
    isFeatured: true,
    isNew: true
  },
  {
    id: 102, 
    name: "Microsoft 365 Copilot Agents",
    description: "AI agents integrated into Microsoft 365 that help with document creation, data analysis, and workflow automation.",
    category: "Productivity & Automation",
    image: "/api/placeholder/300/200",
    url: "https://www.microsoft.com/microsoft-365/copilot",
    pricing: "Premium", 
    features: ["Document Generation", "Data Analysis", "Meeting Summaries", "Email Management", "Workflow Automation"],
    isFeatured: true,
    isNew: true
  },
  {
    id: 103,
    name: "Cursor AI Code Editor",
    description: "Advanced AI-powered code editor with intelligent code completion, debugging, and pair programming capabilities.",
    category: "Development & Code",
    image: "/api/placeholder/300/200", 
    url: "https://cursor.sh",
    pricing: "Free/Premium",
    features: ["AI Code Completion", "Smart Debugging", "Code Refactoring", "Multi-language Support", "Git Integration"],
    isFeatured: true,
    isNew: true
  },
  {
    id: 104,
    name: "Replit Agent",
    description: "AI agent that helps with coding, debugging, and deploying applications directly in your browser environment.",
    category: "Development & Code", 
    image: "/api/placeholder/300/200",
    url: "https://replit.com/agent",
    pricing: "Free/Premium",
    features: ["Code Generation", "Bug Fixing", "Deployment", "Database Setup", "Real-time Collaboration"],
    isFeatured: false,
    isNew: true
  },
  {
    id: 105,
    name: "Notion AI Agents",
    description: "Intelligent AI agents within Notion for content creation, data organization, and workflow management.",
    category: "Productivity & Automation",
    image: "/api/placeholder/300/200",
    url: "https://notion.so/ai", 
    pricing: "Premium",
    features: ["Content Creation", "Data Organization", "Template Generation", "Smart Search", "Workflow Automation"],
    isFeatured: false,
    isNew: true
  },
  // Development Tools
  {
    id: 1,
    name: "GitHub Copilot",
    description: "AI-powered code completion and programming assistant",
    category: "Development & Code",
    image: "/placeholder.svg",
    url: "https://github.com/features/copilot",
    pricing: "Free for students",
    features: ["Code completion", "Multi-language support", "Context-aware suggestions"],
    isFeatured: true
  },
  {
    id: 2,
    name: "Cursor AI",
    description: "AI-first code editor built for pair programming with AI",
    category: "Development & Code",
    image: "/placeholder.svg",
    url: "https://cursor.sh",
    pricing: "Free",
    features: ["AI pair programming", "Code editing", "Natural language commands"]
  },
  {
    id: 3,
    name: "Replit AI",
    description: "AI assistant for coding, debugging, and explaining code",
    category: "Development & Code",
    image: "/placeholder.svg",
    url: "https://replit.com",
    pricing: "Free tier",
    features: ["Code generation", "Bug fixing", "Code explanation"],
    isNew: true
  },
  {
    id: 4,
    name: "Tabnine",
    description: "AI code completion for all programming languages",
    category: "Development & Code",
    image: "/placeholder.svg",
    url: "https://tabnine.com",
    pricing: "Free tier",
    features: ["Auto-completion", "Code suggestions", "Team learning"]
  },
  {
    id: 5,
    name: "Codeium",
    description: "Free AI-powered toolkit for developers",
    category: "Development & Code",
    image: "/placeholder.svg",
    url: "https://codeium.com",
    pricing: "Free",
    features: ["Code completion", "Chat assistant", "Code search"]
  },

  // Design & Creative Tools
  {
    id: 6,
    name: "DALL-E 3",
    description: "Advanced AI image generation from OpenAI",
    category: "Image Generation",
    image: "/placeholder.svg",
    url: "https://openai.com/dall-e-3",
    pricing: "Free credits",
    features: ["Text to image", "High quality", "Style control"],
    isFeatured: true
  },
  {
    id: 7,
    name: "Midjourney",
    description: "AI art generator creating stunning visual content",
    category: "Image Generation",
    image: "/placeholder.svg",
    url: "https://midjourney.com",
    pricing: "Free trial",
    features: ["Art generation", "Style variations", "Community gallery"]
  },
  {
    id: 8,
    name: "Stable Diffusion",
    description: "Open-source AI image generation model",
    category: "Image Generation",
    image: "/placeholder.svg",
    url: "https://stability.ai",
    pricing: "Free",
    features: ["Open source", "Local installation", "Customizable"]
  },
  {
    id: 9,
    name: "Leonardo AI",
    description: "Production-quality AI art generation platform",
    category: "Image Generation",
    image: "/placeholder.svg",
    url: "https://leonardo.ai",
    pricing: "Free tier",
    features: ["Game assets", "Concept art", "Image training"]
  },
  {
    id: 10,
    name: "Playground AI",
    description: "Free AI image generator with commercial use",
    category: "Image Generation",
    image: "/placeholder.svg",
    url: "https://playgroundai.com",
    pricing: "Free",
    features: ["Commercial license", "Multiple models", "Easy interface"]
  },

  // Writing & Content Tools
  {
    id: 11,
    name: "ChatGPT",
    description: "Advanced AI chatbot for conversations and assistance",
    category: "Chatbots & Assistants",
    image: "/placeholder.svg",
    url: "https://chat.openai.com",
    pricing: "Free tier",
    features: ["Conversations", "Code help", "Writing assistance"],
    isFeatured: true
  },
  {
    id: 12,
    name: "Claude",
    description: "AI assistant by Anthropic for analysis and creativity",
    category: "Chatbots & Assistants",
    image: "/placeholder.svg",
    url: "https://claude.ai",
    pricing: "Free tier",
    features: ["Document analysis", "Creative writing", "Code assistance"]
  },
  {
    id: 13,
    name: "Gemini",
    description: "Google's multimodal AI assistant",
    category: "Chatbots & Assistants",
    image: "/placeholder.svg",
    url: "https://gemini.google.com",
    pricing: "Free",
    features: ["Multimodal", "Real-time info", "Google integration"]
  },
  {
    id: 14,
    name: "Perplexity AI",
    description: "AI search engine with cited sources",
    category: "Research & Analysis",
    image: "/placeholder.svg",
    url: "https://perplexity.ai",
    pricing: "Free tier",
    features: ["Research", "Citations", "Real-time data"]
  },
  {
    id: 15,
    name: "Quillbot",
    description: "AI paraphrasing and writing enhancement tool",
    category: "Writing & Content",
    image: "/placeholder.svg",
    url: "https://quillbot.com",
    pricing: "Free tier",
    features: ["Paraphrasing", "Grammar check", "Summarization"]
  },

  // Lesser-known but powerful tools
  {
    id: 16,
    name: "Phind",
    description: "AI search engine optimized for developers",
    category: "Research & Analysis",
    image: "/placeholder.svg",
    url: "https://phind.com",
    pricing: "Free",
    features: ["Developer-focused", "Code examples", "Technical answers"]
  },
  {
    id: 17,
    name: "You.com",
    description: "AI search with customizable sources",
    category: "Research & Analysis",
    image: "/placeholder.svg",
    url: "https://you.com",
    pricing: "Free",
    features: ["Custom sources", "AI chat", "Web search"]
  },
  {
    id: 18,
    name: "Poe",
    description: "Access multiple AI models in one platform",
    category: "Chatbots & Assistants",
    image: "/placeholder.svg",
    url: "https://poe.com",
    pricing: "Free tier",
    features: ["Multiple models", "GPT-4 access", "Claude access"]
  },
  {
    id: 19,
    name: "Character.AI",
    description: "Create and chat with AI characters",
    category: "Chatbots & Assistants",
    image: "/placeholder.svg",
    url: "https://character.ai",
    pricing: "Free",
    features: ["Custom characters", "Role-playing", "Entertainment"]
  },
  {
    id: 20,
    name: "Hugging Face",
    description: "Open-source AI models and tools platform",
    category: "Development & Code",
    image: "/placeholder.svg",
    url: "https://huggingface.co",
    pricing: "Free",
    features: ["Model hub", "Spaces", "Datasets"],
    isNew: true
  },

  // Video and Audio Tools
  {
    id: 21,
    name: "RunwayML",
    description: "AI-powered video editing and generation",
    category: "Video & Audio",
    image: "/placeholder.svg",
    url: "https://runwayml.com",
    pricing: "Free tier",
    features: ["Video generation", "AI editing", "Green screen"]
  },
  {
    id: 22,
    name: "ElevenLabs",
    description: "AI voice synthesis and cloning",
    category: "Video & Audio",
    image: "/placeholder.svg",
    url: "https://elevenlabs.io",
    pricing: "Free tier",
    features: ["Voice cloning", "Text to speech", "Multiple languages"]
  },
  {
    id: 23,
    name: "Murf AI",
    description: "AI voice generator for content creation",
    category: "Video & Audio",
    image: "/placeholder.svg",
    url: "https://murf.ai",
    pricing: "Free trial",
    features: ["Voice over", "Multiple voices", "Commercial use"]
  },
  {
    id: 24,
    name: "Pictory",
    description: "AI video creation from text and blog posts",
    category: "Video & Audio",
    image: "/placeholder.svg",
    url: "https://pictory.ai",
    pricing: "Free trial",
    features: ["Text to video", "Blog to video", "Auto captions"]
  },

  // Productivity Tools
  {
    id: 25,
    name: "Notion AI",
    description: "AI writing assistant built into Notion",
    category: "Productivity & Automation",
    image: "/placeholder.svg",
    url: "https://notion.so",
    pricing: "Free trial",
    features: ["Writing help", "Summarization", "Translation"]
  },
  {
    id: 26,
    name: "Zapier AI",
    description: "AI-powered automation between apps",
    category: "Productivity & Automation",
    image: "/placeholder.svg",
    url: "https://zapier.com",
    pricing: "Free tier",
    features: ["Workflow automation", "AI suggestions", "App connections"]
  },
  {
    id: 27,
    name: "Otter AI",
    description: "AI meeting notes and transcription",
    category: "Productivity & Automation",
    image: "/placeholder.svg",
    url: "https://otter.ai",
    pricing: "Free tier",
    features: ["Meeting transcription", "AI summaries", "Action items"]
  },

  // Hidden gems and specialized tools
  {
    id: 28,
    name: "Scrivener AI",
    description: "AI writing assistant for long-form content",
    category: "Writing & Content",
    image: "/placeholder.svg",
    url: "https://scrivener.com",
    pricing: "Free trial",
    features: ["Long-form writing", "Research organization", "Project management"]
  },
  {
    id: 29,
    name: "Synthesia",
    description: "AI video generation with virtual presenters",
    category: "Video & Audio",
    image: "/placeholder.svg",
    url: "https://synthesia.io",
    pricing: "Free trial",
    features: ["AI presenters", "Multiple languages", "Custom avatars"]
  },
  {
    id: 30,
    name: "Beautiful AI",
    description: "AI-powered presentation design",
    category: "Design & Graphics",
    image: "/placeholder.svg",
    url: "https://beautiful.ai",
    pricing: "Free tier",
    features: ["Smart templates", "Auto-design", "Team collaboration"]
  },

  // More specialized and unknown tools
  {
    id: 31,
    name: "Tome",
    description: "AI storytelling and presentation tool",
    category: "Design & Graphics",
    image: "/placeholder.svg",
    url: "https://tome.app",
    pricing: "Free tier",
    features: ["AI storytelling", "Interactive content", "Smart layouts"]
  },
  {
    id: 32,
    name: "Gamma",
    description: "AI-powered document and presentation creator",
    category: "Design & Graphics",
    image: "/placeholder.svg",
    url: "https://gamma.app",
    pricing: "Free tier",
    features: ["One-click design", "Interactive content", "Web publishing"]
  },
  {
    id: 33,
    name: "Ideogram",
    description: "AI image generator with text rendering",
    category: "Image Generation",
    image: "/placeholder.svg",
    url: "https://ideogram.ai",
    pricing: "Free tier",
    features: ["Text in images", "Logo creation", "Typography"]
  },
  {
    id: 34,
    name: "Krea AI",
    description: "Real-time AI image generation",
    category: "Image Generation",
    image: "/placeholder.svg",
    url: "https://krea.ai",
    pricing: "Free tier",
    features: ["Real-time generation", "Style transfer", "Image enhancement"]
  },
  {
    id: 35,
    name: "Fal AI",
    description: "Fast AI image and video generation API",
    category: "Development & Code",
    image: "/placeholder.svg",
    url: "https://fal.ai",
    pricing: "Free tier",
    features: ["Fast API", "Multiple models", "Developer-friendly"]
  },

  // Educational and learning tools
  {
    id: 36,
    name: "Socratic",
    description: "Google's AI homework helper",
    category: "Research & Analysis",
    image: "/placeholder.svg",
    url: "https://socratic.org",
    pricing: "Free",
    features: ["Homework help", "Step solutions", "Multiple subjects"]
  },
  {
    id: 37,
    name: "Teachable Machine",
    description: "Google's no-code machine learning tool",
    category: "Development & Code",
    image: "/placeholder.svg",
    url: "https://teachablemachine.withgoogle.com",
    pricing: "Free",
    features: ["No-code ML", "Image classification", "Sound recognition"]
  },
  {
    id: 38,
    name: "Elicit",
    description: "AI research assistant for academic papers",
    category: "Research & Analysis",
    image: "/placeholder.svg",
    url: "https://elicit.org",
    pricing: "Free tier",
    features: ["Paper analysis", "Research workflows", "Citation finding"]
  },

  // More cutting-edge tools
  {
    id: 39,
    name: "Fliki",
    description: "AI video creation from text with voices",
    category: "Video & Audio",
    image: "/placeholder.svg",
    url: "https://fliki.ai",
    pricing: "Free tier",
    features: ["Text to video", "AI voices", "Stock media"]
  },
  {
    id: 40,
    name: "Luma AI",
    description: "AI 3D capture and generation",
    category: "Design & Graphics",
    image: "/placeholder.svg",
    url: "https://lumalabs.ai",
    pricing: "Free tier",
    features: ["3D capture", "NeRF technology", "Mobile app"]
  },
  {
    id: 41,
    name: "Replicate",
    description: "Run AI models in the cloud",
    category: "Development & Code",
    image: "/placeholder.svg",
    url: "https://replicate.com",
    pricing: "Pay per use",
    features: ["Model hosting", "API access", "Open source models"]
  },
  {
    id: 42,
    name: "Anthropic Console",
    description: "Claude AI API and development tools",
    category: "Development & Code",
    image: "/placeholder.svg",
    url: "https://console.anthropic.com",
    pricing: "Free tier",
    features: ["Claude API", "Safety focused", "Enterprise ready"]
  },
  {
    id: 43,
    name: "Cohere",
    description: "Enterprise-grade language AI platform",
    category: "Development & Code",
    image: "/placeholder.svg",
    url: "https://cohere.ai",
    pricing: "Free tier",
    features: ["Language models", "Enterprise AI", "Custom training"]
  },
  {
    id: 44,
    name: "Weights & Biases",
    description: "MLOps platform for machine learning",
    category: "Development & Code",
    image: "/placeholder.svg",
    url: "https://wandb.ai",
    pricing: "Free tier",
    features: ["Experiment tracking", "Model versioning", "Collaboration"]
  },
  {
    id: 45,
    name: "Gradio",
    description: "Build machine learning demos quickly",
    category: "Development & Code",
    image: "/placeholder.svg",
    url: "https://gradio.app",
    pricing: "Free",
    features: ["Quick demos", "Web interfaces", "Python integration"]
  },

  // Final batch of specialized tools
  {
    id: 46,
    name: "Descript",
    description: "AI-powered audio and video editing",
    category: "Video & Audio",
    image: "/placeholder.svg",
    url: "https://descript.com",
    pricing: "Free tier",
    features: ["Text-based editing", "Voice cloning", "Transcription"]
  },
  {
    id: 47,
    name: "Janitor AI",
    description: "AI character chat platform",
    category: "Chatbots & Assistants",
    image: "/placeholder.svg",
    url: "https://janitorai.com",
    pricing: "Free",
    features: ["Character creation", "NSFW chat", "Community"]
  },
  {
    id: 48,
    name: "Recraft",
    description: "AI design tool for vector graphics",
    category: "Design & Graphics",
    image: "/placeholder.svg",
    url: "https://recraft.ai",
    pricing: "Free tier",
    features: ["Vector generation", "Brand consistency", "Design systems"]
  },
  {
    id: 49,
    name: "Spline AI",
    description: "AI-powered 3D design tool",
    category: "Design & Graphics",
    image: "/placeholder.svg",
    url: "https://spline.design",
    pricing: "Free tier",
    features: ["3D design", "Web integration", "Collaborative"]
  },
  {
    id: 50,
    name: "Jitter",
    description: "AI motion graphics and animation",
    category: "Video & Audio",
    image: "/placeholder.svg",
    url: "https://jitter.video",
    pricing: "Free tier",
    features: ["Motion graphics", "Animation", "Export formats"]
  }
];
