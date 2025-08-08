export async function callGrokAPI(apiKey: string, prompt: string): Promise<string> {
  console.log('Calling Grok AI API...');
  
  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        model: 'grok-2-latest',
        stream: false,
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Grok AI API error:', response.status, errorText);
      throw new Error(`AI service error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Grok AI response data:', JSON.stringify(data, null, 2));
    
    if (!data.choices || data.choices.length === 0) {
      throw new Error('Unable to generate response. Please try rephrasing your question.');
    }

    const aiResponse = data.choices[0].message.content;
    console.log('Generated response length:', aiResponse.length);
    return aiResponse;

  } catch (error) {
    console.error('Error calling Grok AI API:', error);
    throw error;
  }
}