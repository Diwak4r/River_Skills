import { useState } from "react";
import ModernHeader from '@/components/layout/ModernHeader';
import SearchBar from "@/components/SearchBar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AITool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  capabilities: string[];
  pricing: "Free" | "Freemium" | "Paid";
}

const aiTools: AITool[] = [
  // Autonomous AI Agents
  {
    id: "manus-ai",
    name: "Manus AI",
    description: "Advanced autonomous AI agent for complex task automation and decision-making",
    url: "https://manus.ai",
    category: "Autonomous Agents",
    capabilities: ["Task Automation", "Decision Making", "Multi-step Workflows", "Autonomous Execution"],
    pricing: "Freemium"
  },
  {
    id: "genspark-ai",
    name: "GenSpark AI",
    description: "AI agent that can generate and execute complex workflows autonomously",
    url: "https://genspark.ai",
    category: "Autonomous Agents",
    capabilities: ["Workflow Generation", "Autonomous Execution", "Process Optimization", "Multi-domain Tasks"],
    pricing: "Paid"
  },
  {
    id: "scout-alpha",
    name: "Scout Alpha",
    description: "Autonomous research and analysis agent for data gathering and insights",
    url: "https://scoutalpha.ai",
    category: "Autonomous Agents",
    capabilities: ["Research Automation", "Data Analysis", "Market Intelligence", "Autonomous Reporting"],
    pricing: "Freemium"
  },
  {
    id: "runner-h",
    name: "Runner H",
    description: "High-performance autonomous agent for enterprise task automation",
    url: "https://runnerh.ai",
    category: "Autonomous Agents",
    capabilities: ["Enterprise Automation", "Task Orchestration", "System Integration", "Performance Optimization"],
    pricing: "Paid"
  },
  {
    id: "autogpt",
    name: "AutoGPT",
    description: "Open-source autonomous AI agent that can perform tasks independently",
    url: "https://autogpt.net",
    category: "Autonomous Agents",
    capabilities: ["Open Source", "Task Planning", "Internet Access", "File Management"],
    pricing: "Free"
  },
  {
    id: "babyagi",
    name: "BabyAGI",
    description: "Autonomous task management AI that creates and executes task lists",
    url: "https://babyagi.org",
    category: "Autonomous Agents",
    capabilities: ["Task Management", "Goal Achievement", "Prioritization", "Iterative Learning"],
    pricing: "Free"
  },
  {
    id: "agentgpt",
    name: "AgentGPT",
    description: "Web-based autonomous AI agent platform for goal-oriented tasks",
    url: "https://agentgpt.reworkd.ai",
    category: "Autonomous Agents",
    capabilities: ["Web Interface", "Goal Setting", "Task Breakdown", "Autonomous Execution"],
    pricing: "Freemium"
  },
  {
    id: "superagi",
    name: "SuperAGI",
    description: "Open-source autonomous AI agent framework with GUI",
    url: "https://superagi.com",
    category: "Autonomous Agents",
    capabilities: ["Open Source", "GUI Interface", "Tool Integration", "Agent Management"],
    pricing: "Free"
  },
  {
    id: "godmode",
    name: "GodMode",
    description: "Web UI for autonomous AI agents with enhanced capabilities",
    url: "https://godmode.space",
    category: "Autonomous Agents",
    capabilities: ["Web Interface", "Agent Control", "Task Automation", "Multi-model Support"],
    pricing: "Free"
  },
  {
    id: "cognosys",
    name: "CognoSys",
    description: "AI agent that can browse the web and complete complex tasks",
    url: "https://cognosys.ai",
    category: "Autonomous Agents",
    capabilities: ["Web Browsing", "Task Completion", "Research", "Data Collection"],
    pricing: "Freemium"
  },
  {
    id: "hyperwrite-ai",
    name: "HyperWrite AI Agent",
    description: "Personal AI assistant that can perform tasks across the web",
    url: "https://hyperwriteai.com",
    category: "Autonomous Agents",
    capabilities: ["Web Interaction", "Email Management", "Research", "Writing Tasks"],
    pricing: "Freemium"
  },
  {
    id: "adept-ai",
    name: "Adept AI",
    description: "AI agent that can use software tools and APIs autonomously",
    url: "https://adept.ai",
    category: "Autonomous Agents",
    capabilities: ["Software Control", "API Integration", "Tool Usage", "Workflow Automation"],
    pricing: "Paid"
  },
  {
    id: "wordware-ai",
    name: "Wordware AI",
    description: "AI agent platform for creating custom autonomous workflows",
    url: "https://wordware.ai",
    category: "Autonomous Agents",
    capabilities: ["Custom Workflows", "Agent Builder", "Integration Tools", "No-code Platform"],
    pricing: "Freemium"
  },
  {
    id: "multi-on",
    name: "MultiOn",
    description: "AI agent that can control web browsers and perform online tasks",
    url: "https://multion.ai",
    category: "Autonomous Agents",
    capabilities: ["Browser Control", "Web Automation", "Task Execution", "Online Shopping"],
    pricing: "Freemium"
  },

  // Text Generation & Writing
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "Advanced AI chatbot for conversations, writing, and problem-solving",
    url: "https://chat.openai.com",
    category: "Text Generation",
    capabilities: ["Writing", "Coding", "Analysis", "Problem Solving"],
    pricing: "Freemium"
  },
  {
    id: "claude",
    name: "Claude",
    description: "AI assistant by Anthropic for writing, analysis, and creative tasks",
    url: "https://claude.ai",
    category: "Text Generation",
    capabilities: ["Writing", "Analysis", "Research", "Code Review"],
    pricing: "Freemium"
  },
  {
    id: "gemini",
    name: "Google Gemini",
    description: "Google's AI for conversations, writing, and multimodal tasks",
    url: "https://gemini.google.com",
    category: "Text Generation",
    capabilities: ["Writing", "Research", "Multimodal", "Integration"],
    pricing: "Freemium"
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    description: "Open-source reasoning-capable AI with advanced problem-solving abilities",
    url: "https://chat.deepseek.com",
    category: "Text Generation",
    capabilities: ["Reasoning", "Problem Solving", "Open Source", "Advanced Logic"],
    pricing: "Free"
  },
  {
    id: "writesonic",
    name: "Writesonic",
    description: "AI writing assistant for marketing copy, blogs, and ads",
    url: "https://writesonic.com",
    category: "Text Generation",
    capabilities: ["Marketing Copy", "Blog Writing", "Ad Copy", "SEO"],
    pricing: "Freemium"
  },
  {
    id: "jasper",
    name: "Jasper",
    description: "AI content platform for marketing teams and businesses",
    url: "https://jasper.ai",
    category: "Text Generation",
    capabilities: ["Marketing", "Brand Voice", "Templates", "Team Collaboration"],
    pricing: "Paid"
  },
  {
    id: "rytr",
    name: "Rytr",
    description: "AI writing assistant for creating high-quality content quickly",
    url: "https://rytr.me",
    category: "Text Generation",
    capabilities: ["Content Creation", "Multiple Formats", "Tone Adjustment", "Plagiarism Check"],
    pricing: "Freemium"
  },
  {
    id: "sudowrite",
    name: "Sudowrite",
    description: "AI writing tool specifically designed for creative writers and novelists",
    url: "https://www.sudowrite.com",
    category: "Text Generation",
    capabilities: ["Creative Writing", "Story Development", "Character Building", "Plot Assistance"],
    pricing: "Freemium"
  },
  {
    id: "wordtune",
    name: "Wordtune",
    description: "AI writing companion that helps rewrite and improve your text",
    url: "https://www.wordtune.com",
    category: "Writing Assistant",
    capabilities: ["Text Rewriting", "Tone Adjustment", "Clarity Improvement", "Browser Extension"],
    pricing: "Freemium"
  },
  {
    id: "originality-ai",
    name: "Originality.AI",
    description: "AI content detector and plagiarism checker for publishers",
    url: "https://originality.ai",
    category: "Writing Assistant",
    capabilities: ["AI Detection", "Plagiarism Check", "Content Verification", "Team Management"],
    pricing: "Paid"
  },
  {
    id: "gptzero",
    name: "GPTZero",
    description: "AI detector to identify AI-generated text and ensure authenticity",
    url: "https://gptzero.me",
    category: "Writing Assistant",
    capabilities: ["AI Detection", "Text Analysis", "Authenticity Check", "Educational Focus"],
    pricing: "Freemium"
  },
  {
    id: "poe",
    name: "Poe by Quora",
    description: "Access multiple AI models in one platform",
    url: "https://poe.com",
    category: "Text Generation",
    capabilities: ["Multi-model Access", "Conversations", "Custom Bots", "API Access"],
    pricing: "Freemium"
  },
  {
    id: "character-ai",
    name: "Character.AI",
    description: "Chat with AI characters and create your own",
    url: "https://character.ai",
    category: "Text Generation",
    capabilities: ["Character Chat", "Creative Writing", "Roleplay", "Entertainment"],
    pricing: "Freemium"
  },
  {
    id: "huggingface-chat",
    name: "HuggingFace Chat",
    description: "Free access to various open-source language models",
    url: "https://huggingface.co/chat",
    category: "Text Generation",
    capabilities: ["Open Source Models", "Free Access", "Research", "Experimentation"],
    pricing: "Free"
  },
  {
    id: "cohere-command",
    name: "Cohere Command",
    description: "Enterprise-grade AI for text generation and analysis",
    url: "https://cohere.com",
    category: "Text Generation",
    capabilities: ["Enterprise", "API Access", "Customization", "Multilingual"],
    pricing: "Freemium"
  },
  {
    id: "replicate-llm",
    name: "Replicate LLMs",
    description: "Run open-source language models in the cloud",
    url: "https://replicate.com",
    category: "Text Generation",
    capabilities: ["Open Source", "Cloud Computing", "API Access", "Model Variety"],
    pricing: "Freemium"
  },

  // Image Generation & Art
  {
    id: "midjourney",
    name: "Midjourney",
    description: "AI image generator for creating stunning artwork and visuals",
    url: "https://midjourney.com",
    category: "Image Generation",
    capabilities: ["Art Generation", "Style Transfer", "High Quality", "Creative"],
    pricing: "Paid"
  },
  {
    id: "dall-e",
    name: "DALL-E 3",
    description: "OpenAI's image generator for creating images from text descriptions",
    url: "https://openai.com/dall-e-3",
    category: "Image Generation",
    capabilities: ["Text-to-Image", "High Quality", "Creative", "Prompt Following"],
    pricing: "Paid"
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    description: "Open-source AI image generator",
    url: "https://stability.ai",
    category: "Image Generation",
    capabilities: ["Open Source", "Image Generation", "Customizable", "Art Creation"],
    pricing: "Free"
  },
  {
    id: "leonardo-ai",
    name: "Leonardo AI",
    description: "AI art generator with fine-tuned models for various styles",
    url: "https://leonardo.ai",
    category: "Image Generation",
    capabilities: ["Style Models", "Game Assets", "Concept Art", "Fine-tuning"],
    pricing: "Freemium"
  },
  {
    id: "playground-ai",
    name: "Playground AI",
    description: "Free AI image generator with multiple models",
    url: "https://playgroundai.com",
    category: "Image Generation",
    capabilities: ["Free Tier", "Multiple Models", "Easy Interface", "Social Features"],
    pricing: "Freemium"
  },
  {
    id: "dreamstudio",
    name: "DreamStudio",
    description: "Official Stable Diffusion interface by Stability AI",
    url: "https://dreamstudio.ai",
    category: "Image Generation",
    capabilities: ["Stable Diffusion", "Advanced Settings", "High Resolution", "Style Transfer"],
    pricing: "Freemium"
  },
  {
    id: "firefly",
    name: "Adobe Firefly",
    description: "Adobe's AI art generator integrated with Creative Suite",
    url: "https://firefly.adobe.com",
    category: "Image Generation",
    capabilities: ["Adobe Integration", "Commercial Safe", "Text Effects", "Creative Tools"],
    pricing: "Freemium"
  },
  {
    id: "bluewillow",
    name: "BlueWillow",
    description: "Free AI art generator accessible through Discord",
    url: "https://bluewillow.ai",
    category: "Image Generation",
    capabilities: ["Free Access", "Discord Bot", "Multiple Styles", "Community"],
    pricing: "Free"
  },
  {
    id: "ideogram",
    name: "Ideogram",
    description: "AI image generator with excellent text rendering",
    url: "https://ideogram.ai",
    category: "Image Generation",
    capabilities: ["Text in Images", "Typography", "Logos", "Design"],
    pricing: "Freemium"
  },
  {
    id: "nightcafe",
    name: "NightCafe",
    description: "AI art generator with various algorithms and styles",
    url: "https://nightcafe.studio",
    category: "Image Generation",
    capabilities: ["Multiple Algorithms", "Community", "Print Shop", "Competitions"],
    pricing: "Freemium"
  },

  // Video Generation & Editing
  {
    id: "runway",
    name: "Runway",
    description: "AI-powered video generation and editing platform",
    url: "https://runwayml.com",
    category: "Video Generation",
    capabilities: ["Video Generation", "Video Editing", "AI Effects", "Text-to-Video"],
    pricing: "Freemium"
  },
  {
    id: "synthesia",
    name: "Synthesia",
    description: "AI video generation platform with virtual avatars",
    url: "https://synthesia.io",
    category: "Video Generation",
    capabilities: ["Avatar Videos", "Text-to-Speech", "Multiple Languages", "Professional"],
    pricing: "Paid"
  },
  {
    id: "pika-labs",
    name: "Pika Labs",
    description: "AI video generator for creating short video clips",
    url: "https://pika.art",
    category: "Video Generation",
    capabilities: ["Text-to-Video", "Image-to-Video", "Animation", "Creative Effects"],
    pricing: "Freemium"
  },
  {
    id: "steve-ai",
    name: "Steve AI",
    description: "AI video maker for marketing and social media content",
    url: "https://steve.ai",
    category: "Video Generation",
    capabilities: ["Marketing Videos", "Social Media", "Templates", "Easy Interface"],
    pricing: "Freemium"
  },
  {
    id: "invideo-ai",
    name: "InVideo AI",
    description: "AI video editor with automated editing features",
    url: "https://invideo.io",
    category: "Video Generation",
    capabilities: ["Video Editing", "Templates", "Text-to-Video", "Marketing Focus"],
    pricing: "Freemium"
  },
  {
    id: "kaiber",
    name: "Kaiber",
    description: "AI video generator for artists and creators",
    url: "https://kaiber.ai",
    category: "Video Generation",
    capabilities: ["Artistic Videos", "Music Videos", "Style Transfer", "Creative Tools"],
    pricing: "Freemium"
  },
  {
    id: "genmo",
    name: "Genmo",
    description: "AI video generator with text and image prompts",
    url: "https://genmo.ai",
    category: "Video Generation",
    capabilities: ["Text-to-Video", "Image Animation", "Creative Effects", "Free Tier"],
    pricing: "Freemium"
  },
  {
    id: "luma-ai",
    name: "Luma AI",
    description: "AI for 3D capture and video generation",
    url: "https://lumalabs.ai",
    category: "Video Generation",
    capabilities: ["3D Capture", "NeRF Technology", "Photorealistic", "Mobile App"],
    pricing: "Freemium"
  },

  // Audio & Music Generation
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    description: "AI voice generator with realistic speech synthesis",
    url: "https://elevenlabs.io",
    category: "Audio Generation",
    capabilities: ["Voice Cloning", "Text-to-Speech", "Multiple Languages", "Realistic"],
    pricing: "Freemium"
  },
  {
    id: "murf",
    name: "Murf",
    description: "AI voice generator for voiceovers and narration",
    url: "https://murf.ai",
    category: "Audio Generation",
    capabilities: ["Professional Voices", "Voiceovers", "Multiple Accents", "Studio Quality"],
    pricing: "Freemium"
  },
  {
    id: "suno-ai",
    name: "Suno AI",
    description: "AI music generator that creates full songs from text prompts",
    url: "https://suno.ai",
    category: "Audio Generation",
    capabilities: ["Music Generation", "Lyrics", "Multiple Genres", "Full Songs"],
    pricing: "Freemium"
  },
  {
    id: "udio",
    name: "Udio",
    description: "AI music creation platform for generating original songs",
    url: "https://udio.com",
    category: "Audio Generation",
    capabilities: ["Music Creation", "Original Songs", "Genre Variety", "High Quality"],
    pricing: "Freemium"
  },
  {
    id: "soundraw",
    name: "Soundraw",
    description: "AI music generator for content creators",
    url: "https://soundraw.io",
    category: "Audio Generation",
    capabilities: ["Royalty-free Music", "Customization", "Content Creation", "Commercial Use"],
    pricing: "Freemium"
  },
  {
    id: "resemble-ai",
    name: "Resemble AI",
    description: "AI voice generator with voice cloning capabilities",
    url: "https://resemble.ai",
    category: "Audio Generation",
    capabilities: ["Voice Cloning", "Real-time Voice", "API Access", "Custom Voices"],
    pricing: "Freemium"
  },
  {
    id: "speechify",
    name: "Speechify",
    description: "AI text-to-speech with natural voices",
    url: "https://speechify.com",
    category: "Audio Generation",
    capabilities: ["Text-to-Speech", "Speed Control", "Multiple Voices", "Document Reading"],
    pricing: "Freemium"
  },
  {
    id: "descript",
    name: "Descript",
    description: "AI-powered audio and video editing with voice cloning",
    url: "https://descript.com",
    category: "Audio Generation",
    capabilities: ["Audio Editing", "Voice Cloning", "Transcription", "Overdub"],
    pricing: "Freemium"
  },
  {
    id: "lalal-ai",
    name: "Lalal.ai",
    description: "AI-powered vocal and instrumental track separation tool",
    url: "https://www.lalal.ai",
    category: "Audio Generation",
    capabilities: ["Vocal Separation", "Instrumental Extraction", "Audio Processing", "High Quality"],
    pricing: "Freemium"
  },

  // Code Generation & Development
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    description: "AI pair programmer that helps you write code faster",
    url: "https://github.com/features/copilot",
    category: "Code Generation",
    capabilities: ["Code Completion", "Multiple Languages", "Context Aware", "IDE Integration"],
    pricing: "Paid"
  },
  {
    id: "cursor",
    name: "Cursor",
    description: "AI-powered code editor built for productivity",
    url: "https://cursor.sh",
    category: "Code Generation",
    capabilities: ["AI Code Editor", "Chat with Code", "Debugging", "Refactoring"],
    pricing: "Freemium"
  },
  {
    id: "codeium",
    name: "Codeium",
    description: "Free AI-powered code completion and chat",
    url: "https://codeium.com",
    category: "Code Generation",
    capabilities: ["Code Completion", "AI Chat", "Multiple IDEs", "Free Tier"],
    pricing: "Freemium"
  },
  {
    id: "replit-ai",
    name: "Replit AI",
    description: "AI assistant integrated into the Replit coding environment",
    url: "https://replit.com",
    category: "Code Generation",
    capabilities: ["Code Generation", "Debugging", "Explanation", "Cloud IDE"],
    pricing: "Freemium"
  },
  {
    id: "codegpt",
    name: "CodeGPT",
    description: "AI coding assistant for various programming tasks",
    url: "https://codegpt.co",
    category: "Code Generation",
    capabilities: ["Code Generation", "Documentation", "Testing", "Refactoring"],
    pricing: "Freemium"
  },
  {
    id: "tabnine",
    name: "Tabnine",
    description: "AI code completion tool for developers",
    url: "https://tabnine.com",
    category: "Code Generation",
    capabilities: ["Code Completion", "Team Learning", "Privacy Focus", "IDE Integration"],
    pricing: "Freemium"
  },
  {
    id: "amazon-codewhisperer",
    name: "Amazon CodeWhisperer",
    description: "AI coding companion by AWS",
    url: "https://aws.amazon.com/codewhisperer",
    category: "Code Generation",
    capabilities: ["Code Suggestions", "Security Scanning", "AWS Integration", "Multiple Languages"],
    pricing: "Freemium"
  },
  {
    id: "sourcegraph-cody",
    name: "Sourcegraph Cody",
    description: "AI coding assistant with codebase context",
    url: "https://sourcegraph.com/cody",
    category: "Code Generation",
    capabilities: ["Codebase Context", "Code Search", "Explanations", "Enterprise"],
    pricing: "Freemium"
  },
  {
    id: "bubble",
    name: "Bubble",
    description: "No-code platform with AI-assisted app development",
    url: "https://bubble.io",
    category: "Code Generation",
    capabilities: ["No-code Development", "Visual Programming", "Web Apps", "Database Integration"],
    pricing: "Freemium"
  },
  {
    id: "bolt",
    name: "Bolt",
    description: "AI-powered development platform for rapid prototyping",
    url: "https://bolt.new",
    category: "Code Generation",
    capabilities: ["Rapid Prototyping", "Full-stack Development", "AI Generation", "Deployment"],
    pricing: "Freemium"
  },
  {
    id: "v0",
    name: "v0",
    description: "AI-powered UI component generator by Vercel",
    url: "https://v0.dev",
    category: "Code Generation",
    capabilities: ["UI Components", "React Generation", "Design to Code", "Responsive Design"],
    pricing: "Freemium"
  },
  {
    id: "theia-ide",
    name: "Theia IDE",
    description: "Open-source cloud and desktop IDE with AI capabilities",
    url: "https://theia-ide.org",
    category: "Code Generation",
    capabilities: ["Open Source", "Cloud IDE", "Extensions", "Multi-language Support"],
    pricing: "Free"
  },
  {
    id: "ml-net",
    name: "ML.NET",
    description: "Microsoft's machine learning framework with AI model building",
    url: "https://dot.net/ml",
    category: "Code Generation",
    capabilities: ["Machine Learning", ".NET Integration", "Model Building", "Open Source"],
    pricing: "Free"
  },

  // Presentations & Design
  {
    id: "gamma",
    name: "Gamma",
    description: "AI-powered presentation maker with beautiful templates",
    url: "https://gamma.app",
    category: "Presentations",
    capabilities: ["Presentation Design", "Templates", "Collaboration", "Export"],
    pricing: "Freemium"
  },
  {
    id: "tome",
    name: "Tome",
    description: "AI storytelling platform for presentations and narratives",
    url: "https://tome.app",
    category: "Presentations",
    capabilities: ["Storytelling", "Interactive Content", "Templates", "Sharing"],
    pricing: "Freemium"
  },
  {
    id: "beautiful-ai",
    name: "Beautiful.AI",
    description: "AI-powered presentation software with smart templates",
    url: "https://beautiful.ai",
    category: "Presentations",
    capabilities: ["Smart Templates", "Design Intelligence", "Team Collaboration", "Brand Consistency"],
    pricing: "Freemium"
  },
  {
    id: "canva-ai",
    name: "Canva AI",
    description: "Design platform with AI-powered design suggestions",
    url: "https://canva.com",
    category: "Design",
    capabilities: ["Graphic Design", "Templates", "AI Suggestions", "Collaboration"],
    pricing: "Freemium"
  },
  {
    id: "figma-ai",
    name: "Figma AI",
    description: "AI features integrated into Figma design platform",
    url: "https://figma.com",
    category: "Design",
    capabilities: ["Design Assistance", "Auto Layout", "Design Systems", "Collaboration"],
    pricing: "Freemium"
  },
  {
    id: "framer-ai",
    name: "Framer AI",
    description: "AI-powered web design and prototyping tool",
    url: "https://framer.com",
    category: "Design",
    capabilities: ["Web Design", "Prototyping", "AI Generation", "No-code"],
    pricing: "Freemium"
  },
  {
    id: "looka",
    name: "Looka",
    description: "AI logo maker and brand identity designer",
    url: "https://looka.com",
    category: "Design",
    capabilities: ["Logo Design", "Brand Identity", "Business Cards", "Marketing Materials"],
    pricing: "Freemium"
  },
  {
    id: "remove-bg",
    name: "Remove.bg",
    description: "AI-powered background removal tool",
    url: "https://remove.bg",
    category: "Design",
    capabilities: ["Background Removal", "Batch Processing", "API Access", "High Quality"],
    pricing: "Freemium"
  },
  {
    id: "inkscape",
    name: "Inkscape",
    description: "Free vector graphics editor with AI-enhanced features",
    url: "https://inkscape.org",
    category: "Design",
    capabilities: ["Vector Graphics", "Open Source", "Free Software", "Cross-platform"],
    pricing: "Free"
  },
  {
    id: "fotor",
    name: "Fotor",
    description: "AI-powered photo editor and design tool",
    url: "https://www.fotor.com",
    category: "Design",
    capabilities: ["Photo Editing", "AI Enhancement", "Design Templates", "Batch Processing"],
    pricing: "Freemium"
  },
  {
    id: "freepik",
    name: "Freepik",
    description: "AI-powered design resources and content creation platform",
    url: "https://www.freepik.com",
    category: "Design",
    capabilities: ["Stock Resources", "AI Generation", "Design Assets", "Templates"],
    pricing: "Freemium"
  },

  // Research & Analysis
  {
    id: "perplexity",
    name: "Perplexity",
    description: "AI-powered search engine and research assistant",
    url: "https://perplexity.ai",
    category: "Research",
    capabilities: ["Real-time Search", "Source Citations", "Research", "Q&A"],
    pricing: "Freemium"
  },
  {
    id: "google-notebooklm",
    name: "Google NotebookLM",
    description: "AI document analyzer and research assistant with personalized insights",
    url: "https://notebooklm.google.com",
    category: "Research",
    capabilities: ["Document Analysis", "Research Assistant", "Source-grounded", "Note Taking"],
    pricing: "Free"
  },
  {
    id: "consensus",
    name: "Consensus",
    description: "AI search engine for scientific research papers",
    url: "https://consensus.app",
    category: "Research",
    capabilities: ["Scientific Papers", "Evidence-based", "Citations", "Academic Research"],
    pricing: "Freemium"
  },
  {
    id: "scholarai",
    name: "ScholarAI",
    description: "AI research assistant for academic papers and studies",
    url: "https://scholarai.io",
    category: "Research",
    capabilities: ["Academic Research", "Paper Analysis", "Literature Review", "Citations"],
    pricing: "Freemium"
  },
  {
    id: "scite",
    name: "Scite",
    description: "AI platform for discovering and evaluating scientific articles",
    url: "https://scite.ai",
    category: "Research",
    capabilities: ["Citation Analysis", "Smart Citations", "Research Discovery", "Paper Evaluation"],
    pricing: "Freemium"
  },
  {
    id: "semantic-scholar",
    name: "Semantic Scholar",
    description: "AI-powered academic search engine",
    url: "https://semanticscholar.org",
    category: "Research",
    capabilities: ["Academic Search", "Paper Summaries", "Citation Networks", "Research Trends"],
    pricing: "Free"
  },
  {
    id: "elicit",
    name: "Elicit",
    description: "AI research assistant for literature reviews",
    url: "https://elicit.org",
    category: "Research",
    capabilities: ["Literature Reviews", "Research Questions", "Paper Analysis", "Data Extraction"],
    pricing: "Freemium"
  },
  {
    id: "research-rabbit",
    name: "ResearchRabbit",
    description: "AI tool for discovering academic papers and research networks",
    url: "https://researchrabbit.ai",
    category: "Research",
    capabilities: ["Paper Discovery", "Research Networks", "Collaboration", "Recommendations"],
    pricing: "Free"
  },

  // Productivity & Business
  {
    id: "notion-ai",
    name: "Notion AI",
    description: "AI assistant integrated into Notion workspace",
    url: "https://notion.so/product/ai",
    category: "Productivity",
    capabilities: ["Writing Assistant", "Summarization", "Brainstorming", "Organization"],
    pricing: "Paid"
  },
  {
    id: "grammarly",
    name: "Grammarly",
    description: "AI writing assistant for grammar, style, and tone",
    url: "https://grammarly.com",
    category: "Writing Assistant",
    capabilities: ["Grammar Check", "Style Suggestions", "Tone Detection", "Plagiarism"],
    pricing: "Freemium"
  },
  {
    id: "copy-ai",
    name: "Copy.ai",
    description: "AI copywriting tool for marketing and sales content",
    url: "https://copy.ai",
    category: "Marketing",
    capabilities: ["Marketing Copy", "Sales Content", "Templates", "Workflows"],
    pricing: "Freemium"
  },
  {
    id: "clickup-ai",
    name: "ClickUp AI",
    description: "AI features integrated into ClickUp project management",
    url: "https://clickup.com/ai",
    category: "Productivity",
    capabilities: ["Project Management", "Task Automation", "Writing Assistant", "Summarization"],
    pricing: "Freemium"
  },
  {
    id: "monday-ai",
    name: "Monday.com AI",
    description: "AI-powered project management and workflow automation",
    url: "https://monday.com",
    category: "Productivity",
    capabilities: ["Project Management", "Workflow Automation", "Data Insights", "Team Collaboration"],
    pricing: "Freemium"
  },
  {
    id: "zapier-ai",
    name: "Zapier AI",
    description: "AI-powered automation platform for connecting apps",
    url: "https://zapier.com",
    category: "Productivity",
    capabilities: ["App Integration", "Workflow Automation", "AI Actions", "No-code"],
    pricing: "Freemium"
  },
  {
    id: "n8n",
    name: "n8n",
    description: "Open-source workflow automation tool with AI integrations",
    url: "https://n8n.io",
    category: "Productivity",
    capabilities: ["Open Source", "Workflow Automation", "Self-hosted", "AI Integrations"],
    pricing: "Free"
  },
  {
    id: "mem-ai",
    name: "Mem",
    description: "AI-powered note-taking and knowledge management",
    url: "https://mem.ai",
    category: "Productivity",
    capabilities: ["Note Taking", "Knowledge Management", "AI Search", "Auto-organization"],
    pricing: "Freemium"
  },
  {
    id: "otter-ai",
    name: "Otter.ai",
    description: "AI meeting assistant for transcription and note-taking",
    url: "https://otter.ai",
    category: "Productivity",
    capabilities: ["Meeting Transcription", "Note Taking", "Action Items", "Integration"],
    pricing: "Freemium"
  },
  {
    id: "fathom",
    name: "Fathom",
    description: "AI meeting recorder and summarizer with free plan",
    url: "https://fathom.video",
    category: "Productivity",
    capabilities: ["Meeting Recording", "AI Summaries", "Transcription", "Integration"],
    pricing: "Freemium"
  },

  // Data Analysis & Visualization
  {
    id: "julius-ai",
    name: "Julius AI",
    description: "AI data analyst that helps analyze and visualize data",
    url: "https://julius.ai",
    category: "Data Analysis",
    capabilities: ["Data Analysis", "Visualization", "Python Code", "Statistics"],
    pricing: "Freemium"
  },
  {
    id: "tableau-ai",
    name: "Tableau AI",
    description: "AI-powered data visualization and analytics platform",
    url: "https://tableau.com",
    category: "Data Analysis",
    capabilities: ["Data Visualization", "Analytics", "Dashboards", "Business Intelligence"],
    pricing: "Paid"
  },
  {
    id: "chatcsv",
    name: "ChatCSV",
    description: "AI tool for analyzing CSV files with natural language",
    url: "https://chatcsv.co",
    category: "Data Analysis",
    capabilities: ["CSV Analysis", "Natural Language Queries", "Data Insights", "Visualization"],
    pricing: "Freemium"
  },
  {
    id: "polymer-ai",
    name: "Polymer",
    description: "AI-powered business intelligence and data visualization",
    url: "https://polymer.co",
    category: "Data Analysis",
    capabilities: ["Business Intelligence", "Automated Insights", "Data Visualization", "No-code"],
    pricing: "Freemium"
  },
  {
    id: "akkio",
    name: "Akkio",
    description: "No-code machine learning platform for business analytics",
    url: "https://akkio.com",
    category: "Data Analysis",
    capabilities: ["Machine Learning", "Predictive Analytics", "No-code", "Business Intelligence"],
    pricing: "Freemium"
  },

  // Education & Learning
  {
    id: "khan-academy-ai",
    name: "Khanmigo",
    description: "Khan Academy's AI tutor for personalized learning",
    url: "https://khanacademy.org/khan-labs",
    category: "Education",
    capabilities: ["Tutoring", "Personalized Learning", "Math Help", "Educational"],
    pricing: "Paid"
  },
  {
    id: "socratic",
    name: "Socratic by Google",
    description: "AI homework help app for students",
    url: "https://socratic.org",
    category: "Education",
    capabilities: ["Homework Help", "Step-by-step Solutions", "Visual Learning", "Subject Coverage"],
    pricing: "Free"
  },
  {
    id: "coursera-ai",
    name: "Coursera Coach",
    description: "AI learning assistant for personalized course recommendations",
    url: "https://coursera.org",
    category: "Education",
    capabilities: ["Course Recommendations", "Learning Paths", "Skill Assessment", "Career Guidance"],
    pricing: "Freemium"
  },
  {
    id: "quizlet-ai",
    name: "Quizlet AI",
    description: "AI-powered study tools and flashcards",
    url: "https://quizlet.com",
    category: "Education",
    capabilities: ["Flashcards", "Study Guides", "Practice Tests", "AI Tutoring"],
    pricing: "Freemium"
  },
  {
    id: "gradescope-ai",
    name: "Gradescope AI",
    description: "AI-assisted grading and feedback platform",
    url: "https://gradescope.com",
    category: "Education",
    capabilities: ["Automated Grading", "Feedback", "Analytics", "Rubrics"],
    pricing: "Freemium"
  },

  // Translation & Language
  {
    id: "deepl",
    name: "DeepL",
    description: "AI-powered translation service with high accuracy",
    url: "https://deepl.com",
    category: "Translation",
    capabilities: ["Translation", "Multiple Languages", "Context Aware", "Professional"],
    pricing: "Freemium"
  },
  {
    id: "duolingo-ai",
    name: "Duolingo Max",
    description: "AI-powered language learning with GPT-4 integration",
    url: "https://duolingo.com",
    category: "Language Learning",
    capabilities: ["Language Learning", "Conversation Practice", "Personalized", "Gamified"],
    pricing: "Freemium"
  },
  {
    id: "google-translate",
    name: "Google Translate",
    description: "Free AI translation service supporting 100+ languages",
    url: "https://translate.google.com",
    category: "Translation",
    capabilities: ["100+ Languages", "Camera Translation", "Voice Translation", "Free"],
    pricing: "Free"
  },
  {
    id: "reverso",
    name: "Reverso",
    description: "AI translation with context examples and conjugation",
    url: "https://reverso.net",
    category: "Translation",
    capabilities: ["Context Examples", "Conjugation", "Pronunciation", "Language Learning"],
    pricing: "Freemium"
  },
  {
    id: "italki-ai",
    name: "iTalki AI",
    description: "AI language tutor for conversation practice",
    url: "https://italki.com",
    category: "Language Learning",
    capabilities: ["Conversation Practice", "AI Tutor", "Multiple Languages", "Personalized"],
    pricing: "Freemium"
  },

  // Entertainment & Creative
  {
    id: "chatgpt-plugins",
    name: "ChatGPT Plugins",
    description: "Extended ChatGPT capabilities with third-party plugins",
    url: "https://chat.openai.com",
    category: "Entertainment",
    capabilities: ["Plugin Ecosystem", "Extended Features", "Third-party Integration", "Enhanced AI"],
    pricing: "Paid"
  },
  {
    id: "dreamup",
    name: "DreamUp",
    description: "DeviantArt's AI art generator for artists",
    url: "https://dreamup.ai",
    category: "Entertainment",
    capabilities: ["Artist-friendly", "Copyright Protection", "Style Training", "Community"],
    pricing: "Freemium"
  },
  {
    id: "ai-dungeon",
    name: "AI Dungeon",
    description: "AI-powered interactive storytelling and text adventure",
    url: "https://aidungeon.io",
    category: "Entertainment",
    capabilities: ["Interactive Stories", "Text Adventures", "Creative Writing", "Multiplayer"],
    pricing: "Freemium"
  },
  {
    id: "replika",
    name: "Replika",
    description: "AI companion for emotional support and conversation",
    url: "https://replika.ai",
    category: "Entertainment",
    capabilities: ["AI Companion", "Emotional Support", "Personalization", "Conversation"],
    pricing: "Freemium"
  },

  // Specialized AI Tools
  {
    id: "brand24-ai",
    name: "Brand24 AI",
    description: "AI-powered social media monitoring and brand tracking",
    url: "https://brand24.com",
    category: "Marketing",
    capabilities: ["Social Monitoring", "Brand Tracking", "Sentiment Analysis", "Competitor Analysis"],
    pricing: "Freemium"
  },
  {
    id: "mailchimp-ai",
    name: "Mailchimp AI",
    description: "AI-powered email marketing and automation",
    url: "https://mailchimp.com",
    category: "Marketing",
    capabilities: ["Email Marketing", "Automation", "Personalization", "Analytics"],
    pricing: "Freemium"
  },
  {
    id: "hubspot-ai",
    name: "HubSpot AI",
    description: "AI-powered CRM and marketing automation",
    url: "https://hubspot.com",
    category: "Marketing",
    capabilities: ["CRM", "Marketing Automation", "Sales Intelligence", "Content Generation"],
    pricing: "Freemium"
  },
  {
    id: "zendesk-ai",
    name: "Zendesk AI",
    description: "AI-powered customer service and support automation",
    url: "https://zendesk.com",
    category: "Customer Service",
    capabilities: ["Customer Support", "Ticket Automation", "Chatbots", "Analytics"],
    pricing: "Freemium"
  },
  {
    id: "intercom-ai",
    name: "Intercom AI",
    description: "AI-powered customer messaging and support platform",
    url: "https://intercom.com",
    category: "Customer Service",
    capabilities: ["Customer Messaging", "Chatbots", "Support Automation", "Analytics"],
    pricing: "Freemium"
  },
  {
    id: "drift-ai",
    name: "Drift AI",
    description: "AI-powered conversational marketing and sales platform",
    url: "https://drift.com",
    category: "Marketing",
    capabilities: ["Conversational Marketing", "Sales Automation", "Lead Generation", "Chatbots"],
    pricing: "Freemium"
  },
  {
    id: "salesforce-einstein",
    name: "Salesforce Einstein",
    description: "AI-powered CRM with predictive analytics and automation",
    url: "https://salesforce.com/products/einstein",
    category: "Business Intelligence",
    capabilities: ["Predictive Analytics", "Sales Intelligence", "Marketing Automation", "Customer Insights"],
    pricing: "Paid"
  },
  {
    id: "microsoft-copilot",
    name: "Microsoft Copilot",
    description: "AI assistant integrated across Microsoft 365 applications",
    url: "https://copilot.microsoft.com",
    category: "Productivity",
    capabilities: ["Office Integration", "Document Creation", "Data Analysis", "Email Management"],
    pricing: "Paid"
  },
  {
    id: "adobe-sensei",
    name: "Adobe Sensei",
    description: "AI and machine learning platform powering Adobe Creative Cloud",
    url: "https://adobe.com/sensei",
    category: "Design",
    capabilities: ["Creative Tools", "Automation", "Content Intelligence", "Personalization"],
    pricing: "Paid"
  },
  {
    id: "aws-bedrock",
    name: "AWS Bedrock",
    description: "Fully managed service for foundation models",
    url: "https://aws.amazon.com/bedrock",
    category: "AI Platform",
    capabilities: ["Foundation Models", "API Access", "Enterprise", "Customization"],
    pricing: "Paid"
  },
  {
    id: "google-vertex-ai",
    name: "Google Vertex AI",
    description: "Unified machine learning platform for building and deploying AI models",
    url: "https://cloud.google.com/vertex-ai",
    category: "AI Platform",
    capabilities: ["ML Platform", "Model Training", "Deployment", "Enterprise"],
    pricing: "Paid"
  },
  {
    id: "azure-ai",
    name: "Azure AI Services",
    description: "Microsoft's cloud-based AI services and APIs",
    url: "https://azure.microsoft.com/en-us/products/ai-services",
    category: "AI Platform",
    capabilities: ["AI APIs", "Cognitive Services", "Machine Learning", "Enterprise"],
    pricing: "Paid"
  },
  {
    id: "anthropic-api",
    name: "Anthropic API",
    description: "Claude AI model accessible via API for developers",
    url: "https://anthropic.com",
    category: "AI Platform",
    capabilities: ["Claude API", "Developer Tools", "Safety Focus", "Enterprise"],
    pricing: "Paid"
  },
  {
    id: "openai-api",
    name: "OpenAI API",
    description: "Access to GPT models and other OpenAI services via API",
    url: "https://openai.com/api",
    category: "AI Platform",
    capabilities: ["GPT Models", "Developer Tools", "Fine-tuning", "Enterprise"],
    pricing: "Paid"
  },
  {
    id: "cohere-api",
    name: "Cohere API",
    description: "Enterprise-grade NLP API for text generation and analysis",
    url: "https://cohere.ai",
    category: "AI Platform",
    capabilities: ["NLP API", "Text Generation", "Classification", "Enterprise"],
    pricing: "Freemium"
  },
  {
    id: "ai21-api",
    name: "AI21 Studio",
    description: "API access to Jurassic language models",
    url: "https://ai21.com",
    category: "AI Platform",
    capabilities: ["Jurassic Models", "API Access", "Text Generation", "Enterprise"],
    pricing: "Freemium"
  },
  {
    id: "stability-api",
    name: "Stability AI API",
    description: "API access to Stable Diffusion and other generative models",
    url: "https://stability.ai",
    category: "AI Platform",
    capabilities: ["Stable Diffusion API", "Image Generation", "Developer Tools", "Open Source"],
    pricing: "Freemium"
  },
  {
    id: "replicate-api",
    name: "Replicate API",
    description: "Run machine learning models in the cloud via API",
    url: "https://replicate.com",
    category: "AI Platform",
    capabilities: ["Model Hosting", "API Access", "Open Source Models", "Scalable"],
    pricing: "Freemium"
  },
  {
    id: "vastav-ai",
    name: "Vastav AI",
    description: "Free deepfake detection tool for agencies and content verification",
    url: "https://vastav.ai",
    category: "AI Security",
    capabilities: ["Deepfake Detection", "Content Verification", "Media Authentication", "Free Tier"],
    pricing: "Freemium"
  },

  // Additional Marketing & Sales Tools
  {
    id: "adcreative",
    name: "AdCreative.ai",
    description: "AI-powered ad creative generator for digital marketing campaigns",
    url: "https://adcreative.ai",
    category: "Marketing",
    capabilities: ["Ad Creation", "Creative Generation", "Performance Optimization", "A/B Testing"],
    pricing: "Freemium"
  },
  {
    id: "clay",
    name: "Clay",
    description: "AI-powered lead generation and sales prospecting platform",
    url: "https://clay.com",
    category: "Marketing",
    capabilities: ["Lead Generation", "Data Enrichment", "Sales Prospecting", "Automation"],
    pricing: "Freemium"
  },
  {
    id: "textio",
    name: "Textio",
    description: "AI writing platform for inclusive and effective communication",
    url: "https://textio.com",
    category: "Writing Assistant",
    capabilities: ["Inclusive Writing", "Performance Prediction", "Language Optimization", "Bias Detection"],
    pricing: "Paid"
  },
  {
    id: "cvviz",
    name: "CVViZ",
    description: "AI-powered recruitment and applicant tracking system",
    url: "https://cvviz.com",
    category: "HR & Recruitment",
    capabilities: ["Resume Screening", "Candidate Matching", "ATS", "Recruitment Analytics"],
    pricing: "Freemium"
  },
  {
    id: "sanebox",
    name: "SaneBox",
    description: "AI email management tool for inbox organization and productivity",
    url: "https://sanebox.com",
    category: "Productivity",
    capabilities: ["Email Organization", "Priority Filtering", "Snooze", "Unsubscribe"],
    pricing: "Freemium"
  },
  {
    id: "shortwave",
    name: "Shortwave",
    description: "AI-powered email client with smart features and automation",
    url: "https://shortwave.com",
    category: "Productivity",
    capabilities: ["Smart Email", "AI Assistant", "Workflow Automation", "Team Collaboration"],
    pricing: "Freemium"
  },

  // Newer AI Tools 2024-2025
  {
    id: "poe-ai",
    name: "Poe AI",
    description: "Access multiple AI models in one platform by Quora",
    url: "https://poe.com",
    category: "AI Platform",
    capabilities: ["Multi-model Access", "Custom Bots", "API Access", "Subscription"],
    pricing: "Freemium"
  },
  {
    id: "grok-ai",
    name: "Grok AI",
    description: "X's AI assistant with real-time information access",
    url: "https://grok.x.ai",
    category: "Text Generation",
    capabilities: ["Real-time Data", "X Integration", "Conversational AI", "Current Events"],
    pricing: "Paid"
  },
  {
    id: "meta-ai",
    name: "Meta AI",
    description: "Meta's AI assistant integrated across Facebook, Instagram, and WhatsApp",
    url: "https://ai.meta.com",
    category: "Text Generation",
    capabilities: ["Social Integration", "Multimodal", "Real-time", "Cross-platform"],
    pricing: "Free"
  },
  {
    id: "mistral-ai",
    name: "Mistral AI",
    description: "European AI company offering efficient language models",
    url: "https://mistral.ai",
    category: "Text Generation",
    capabilities: ["European AI", "Efficient Models", "API Access", "Open Source Options"],
    pricing: "Freemium"
  },
  {
    id: "inflection-pi",
    name: "Pi by Inflection",
    description: "Personal AI designed for supportive conversations",
    url: "https://pi.ai",
    category: "Text Generation",
    capabilities: ["Personal AI", "Supportive Conversations", "Emotional Intelligence", "Always Available"],
    pricing: "Free"
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    description: "Anthropic's most powerful AI model for complex tasks",
    url: "https://claude.ai",
    category: "Text Generation",
    capabilities: ["Advanced Reasoning", "Long Context", "Multimodal", "Safety Focus"],
    pricing: "Paid"
  },
  {
    id: "gemini-ultra",
    name: "Gemini Ultra",
    description: "Google's most capable AI model for complex reasoning",
    url: "https://gemini.google.com",
    category: "Text Generation",
    capabilities: ["Multimodal", "Advanced Reasoning", "Google Integration", "Real-time"],
    pricing: "Paid"
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    description: "OpenAI's latest and most efficient GPT-4 model",
    url: "https://openai.com/gpt-4",
    category: "Text Generation",
    capabilities: ["Latest GPT-4", "Efficient", "128k Context", "Multimodal"],
    pricing: "Paid"
  },
  {
    id: "sora-ai",
    name: "Sora",
    description: "OpenAI's video generation model (limited access)",
    url: "https://openai.com/sora",
    category: "Video Generation",
    capabilities: ["Text-to-Video", "High Quality", "Long Videos", "Realistic"],
    pricing: "Paid"
  },
  {
    id: "flux-ai",
    name: "Flux.1",
    description: "High-quality open-source image generation model",
    url: "https://flux.ai",
    category: "Image Generation",
    capabilities: ["Open Source", "High Quality", "Fast Generation", "Customizable"],
    pricing: "Free"
  }
];

const categories = Array.from(new Set(aiTools.map(tool => tool.category)));

const categoryColors: { [key: string]: string } = {
  "Autonomous Agents": "bg-red-100 text-red-800 border-red-200",
  "Text Generation": "bg-blue-100 text-blue-800 border-blue-200",
  "Presentations": "bg-purple-100 text-purple-800 border-purple-200",
  "Design": "bg-pink-100 text-pink-800 border-pink-200",
  "Image Generation": "bg-green-100 text-green-800 border-green-200",
  "Code Generation": "bg-gray-100 text-gray-800 border-gray-200",
  "Video Generation": "bg-red-100 text-red-800 border-red-200",
  "Audio Generation": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Research": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "Productivity": "bg-teal-100 text-teal-800 border-teal-200",
  "Writing Assistant": "bg-cyan-100 text-cyan-800 border-cyan-200",
  "Marketing": "bg-orange-100 text-orange-800 border-orange-200",
  "Data Analysis": "bg-violet-100 text-violet-800 border-violet-200",
  "Education": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Translation": "bg-lime-100 text-lime-800 border-lime-200",
  "Language Learning": "bg-rose-100 text-rose-800 border-rose-200",
  "Entertainment": "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
  "Customer Service": "bg-amber-100 text-amber-800 border-amber-200",
  "Business Intelligence": "bg-slate-100 text-slate-800 border-slate-200",
  "AI Platform": "bg-zinc-100 text-zinc-800 border-zinc-200",
  "AI Security": "bg-red-200 text-red-900 border-red-300",
  "HR & Recruitment": "bg-blue-200 text-blue-900 border-blue-300"
};

const pricingColors: { [key: string]: string } = {
  "Free": "bg-green-100 text-green-800",
  "Freemium": "bg-blue-100 text-blue-800",
  "Paid": "bg-orange-100 text-orange-800"
};

export default function AITools() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase()) ||
      tool.capabilities.some(cap => cap.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleToolClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      <main className="pt-20">
        <section className="py-16 px-6 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-5xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in-up">
                  AI Tools Directory
                </h1>
              </div>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Discover the best AI tools for your needs. From autonomous agents to image creation, find the perfect AI assistant for any task.
              </p>
              
              <div className="max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <SearchBar 
                  value={search} 
                  onChange={setSearch} 
                  placeholder="Search for AI tools, capabilities, or use cases..." 
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedCategory === "All"
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  )}
                >
                  All ({aiTools.length})
                </button>
                {categories.map(category => {
                  const count = aiTools.filter(tool => tool.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all",
                        selectedCategory === category
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                      )}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool, index) => (
                <Card
                  key={tool.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/80 backdrop-blur-sm animate-fade-in-up border-t-4 border-blue-500"
                  style={{ animationDelay: `${0.5 + index * 0.05}s` }}
                  onClick={() => handleToolClick(tool.url)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge 
                        className={cn("text-xs border", categoryColors[tool.category] || "bg-gray-100 text-gray-800")}
                        variant="outline"
                      >
                        {tool.category}
                      </Badge>
                      <Badge 
                        className={cn("text-xs", pricingColors[tool.pricing])}
                        variant="secondary"
                      >
                        {tool.pricing}
                      </Badge>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {tool.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-gray-800 uppercase tracking-wide">
                        Key Capabilities
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {tool.capabilities.map(capability => (
                          <span
                            key={capability}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                          >
                            {capability}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className="text-xs text-blue-600 group-hover:text-blue-800 font-medium">
                        Click to explore →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTools.length === 0 && (
              <div className="text-center py-16 bg-white/50 rounded-lg shadow-sm">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-600 mb-2">No tools found</h3>
                <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
