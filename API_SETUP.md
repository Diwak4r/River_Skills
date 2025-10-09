# RiverSkills 2.0 - API Key Setup Guide

This guide will help you configure API keys for external services used in RiverSkills 2.0.

## 🔐 Security First

**IMPORTANT**: Never commit API keys to version control! Always use environment variables for sensitive data.

## 📋 Setup Instructions

### Step 1: Create Environment File

1. Copy the `.env.example` file to create your own `.env` file:
   ```bash
   cp .env.example .env
   ```

2. The `.env` file is already listed in `.gitignore` and will not be committed to Git.

### Step 2: Get Your API Keys

#### OpenAI API Key (Optional - for AI features)
- **Purpose**: Powers AI chat, content generation, and code assistance
- **Get your key**: https://platform.openai.com/api-keys
- **Free tier**: Limited free credits available
- **Usage**: Copy your key and paste it into `.env`:
  ```
  VITE_OPENAI_API_KEY=sk-your-key-here
  ```

#### Unsplash Access Key (Optional - for high-quality images)
- **Purpose**: Access to high-quality stock images
- **Get your key**: https://unsplash.com/developers
- **Free tier**: 50 requests/hour
- **Usage**: Copy your access key and paste it into `.env`:
  ```
  VITE_UNSPLASH_ACCESS_KEY=your-access-key-here
  ```

#### Replicate API Token (Optional - for AI model deployment)
- **Purpose**: Run AI models for image generation, text processing, etc.
- **Get your token**: https://replicate.com/account/api-tokens
- **Free tier**: Limited free usage
- **Usage**: Copy your token and paste it into `.env`:
  ```
  VITE_REPLICATE_API_TOKEN=your-token-here
  ```

### Step 3: Verify Setup

1. Restart your development server after adding API keys:
   ```bash
   npm run dev
   ```

2. Check that the keys are loaded correctly in the browser console (during development only).

## 🛡️ Security Best Practices

1. **Never share your API keys** - They provide access to paid services
2. **Rotate keys regularly** - Change them periodically for security
3. **Use different keys for development and production** - Keep them separate
4. **Monitor your usage** - Check your API provider dashboards for unusual activity
5. **Set spending limits** - Configure budget alerts on your API provider accounts

## 🔧 Usage in Code

API keys are centralized in `src/config/api.ts`. Use them like this:

```typescript
import { API_KEYS, getAPIKey, isAPIKeyConfigured } from '@/config/api';

// Check if a key is configured
if (isAPIKeyConfigured('OPENAI')) {
  // Use the key safely
  const apiKey = getAPIKey('OPENAI');
  // ... make API call
} else {
  // Handle missing key gracefully
  console.error('OpenAI API key not configured');
}
```

## ❓ Troubleshooting

### "API key is not configured" error
- Ensure you've created the `.env` file (not `.env.example`)
- Check that the key names match exactly (case-sensitive)
- Restart your development server after adding keys

### Keys not working
- Verify the keys are valid on the provider's dashboard
- Check for any whitespace or quotes around the key values
- Ensure you have not exceeded your API usage limits

### Development vs Production
- For production deployments, add environment variables through your hosting provider's dashboard (Vercel, Netlify, etc.)
- Never commit `.env` files to version control

## 📚 Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [Unsplash API Documentation](https://unsplash.com/documentation)
- [Replicate API Documentation](https://replicate.com/docs)

## 🤝 Support

Need help? Check our:
- [Main README](./README.md)
- [GitHub Issues](https://github.com/yourusername/riverskills/issues)
- [Discord Community](https://discord.gg/riverskills)

---

Made with ❤️ by Diwakar Ray Yadav
