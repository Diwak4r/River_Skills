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
        model: 'meta-llama/llama-3.1-8b-instruct:free',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        stream: false,
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    console.log('OpenRouter API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText);
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenRouter response received:', data);
    
    if (!data.choices || data.choices.length === 0) {
      console.error('No choices in OpenRouter response:', data);
      throw new Error('No response generated from OpenRouter API');
    }

    const aiResponse = data.choices[0].message.content;
    console.log('Generated response length:', aiResponse?.length || 0);
    
    if (!aiResponse) {
      throw new Error('Empty response from OpenRouter API');
    }
    
    return aiResponse;

  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    throw error;
  }
}