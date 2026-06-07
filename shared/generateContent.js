
const axios = require('axios');

async function generateBlogPost(deepseekPrompt) {
  console.log('📝 Generating blog content with DeepSeek...');
  
  try {
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `You are a professional blogger creating purely informational content. 
Rules:
- Write in clear, engaging Markdown
- Use ## for main headings, ### for subheadings
- Keep paragraphs 2-4 sentences
- Include actionable takeaways
- NEVER mention specific brand names, products, prices, or make purchase recommendations
- NEVER use phrases like "best X" or "top Y" or "we recommend"
- Focus on concepts, strategies, and ideas
- Sound like a knowledgeable human expert, not AI
- Each post must be completely unique. Never repeat the same examples, metaphors, or opening hooks from previous posts on this topic.
- Vary your writing style: sometimes analytical, sometimes narrative, sometimes practical.`
          },
          {
            role: 'user',
            content: deepseekPrompt
          }
        ],
        temperature: 0.9,        // Increased from 0.8 for more variety
        max_tokens: 2000,
        seed: Math.floor(Math.random() * 1000000),  // Random seed each time
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 60000,
      }
    );
    
    const content = response.data.choices[0].message.content;
    console.log('✅ Content generated successfully');
    return content;
    
  } catch (error) {
    console.error('❌ Content generation failed:', error.message);
    if (error.response) {
      console.error('DeepSeek API error:', JSON.stringify(error.response.data, null, 2));
    }
    throw error;
  }
}

module.exports = { generateBlogPost };