export async function callOpenRouterAPI(apiKey: string, prompt: string): Promise<string> {
  console.log('Calling OpenRouter API...');
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://riverskills.com',
        'X-Title': 'RiverSkills AI Assistant',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-sonnet',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        stream: false,
        temperature: 0.7,
        max_tokens: 1500
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenRouter response data:', JSON.stringify(data, null, 2));
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('Unable to generate response. Please try rephrasing your question.');
    }

    const aiResponse = data.choices[0].message.content;
    console.log('Generated response length:', aiResponse.length);
    return aiResponse;

  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    throw error;
  }
}