
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from './constants.ts';
import { checkRateLimit } from './rate-limit.ts';
import { validateMessage, sanitizeInput } from './validation.ts';
import { getSystemPrompt } from './prompts.ts';
import { callOpenRouterAPI } from './openrouter-api.ts';
import type { ChatRequest } from './types.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Chat function called');
    
    // Initialize environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');

    if (!openRouterApiKey) {
      console.error('OpenRouter API key not configured');
      return new Response(JSON.stringify({ 
        error: 'AI service configuration error: OpenRouter API key not configured' 
      }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Skip authentication for now - use a default user ID for rate limiting
    const defaultUserId = 'anonymous-user';

    // Rate limiting check
    if (!checkRateLimit(defaultUserId)) {
      return new Response(JSON.stringify({ 
        error: 'Rate limit exceeded. Please try again later.' 
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const requestBody: ChatRequest = await req.json();
    const { message, mode = 'lite', isModeSwitching = false } = requestBody;

    console.log('Request data:', { message, mode, isModeSwitching });

    // Handle mode switching
    if (isModeSwitching) {
      const modeResponse = mode === 'steroids' 
        ? "🚀 **Diwa on Steroids activated!** I'm now unleashed with full AI capabilities. I can help you with anything - from creative writing and complex coding to deep philosophical discussions and advanced problem-solving. What would you like to explore together?"
        : "⚡ **Diwa Lite mode activated!** I'm now focused on helping you with RiverSkills courses, learning paths, and educational guidance. How can I assist you with your learning journey today?";
      
      return new Response(JSON.stringify({ 
        response: modeResponse 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate and sanitize input
    const validation = validateMessage(message);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const sanitizedMessage = sanitizeInput(message);
    const systemPrompt = getSystemPrompt(mode);
    const fullPrompt = `${systemPrompt}\n\nUser question: ${sanitizedMessage}`;

    // Use OpenRouter API
    let aiResponse: string | null = null;
    let provider = 'openrouter';

    try {
      aiResponse = await callOpenRouterAPI(openRouterApiKey, fullPrompt);
      console.log('OpenRouter API response received successfully');
    } catch (err) {
      console.error('OpenRouter provider failed:', err);
      return new Response(JSON.stringify({ 
        error: 'AI service error: OpenRouter failed' 
      }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      response: aiResponse,
      provider
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-with-diwa function:', error);
    
    if (error.message.includes('AI service error') || error.message.includes('Unable to generate response')) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 503,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      error: 'An unexpected error occurred. Please try again.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
