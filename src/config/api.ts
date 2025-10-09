/**
 * API Configuration
 * 
 * This file centralizes API key management for external services.
 * Keys are loaded from environment variables to keep them secure.
 * 
 * IMPORTANT: 
 * - Never commit API keys to version control
 * - Always use environment variables for sensitive data
 * - Copy .env.example to .env and add your actual keys
 */

export const API_KEYS = {
  /**
   * OpenAI API Key
   * Used for: AI chat, content generation, code assistance
   * Get your key: https://platform.openai.com/api-keys
   */
  OPENAI: import.meta.env.VITE_OPENAI_API_KEY || '',

  /**
   * Unsplash Access Key
   * Used for: High-quality stock images
   * Get your key: https://unsplash.com/developers
   */
  UNSPLASH: import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '',

  /**
   * Replicate API Token
   * Used for: AI model deployment and inference
   * Get your token: https://replicate.com/account/api-tokens
   */
  REPLICATE: import.meta.env.VITE_REPLICATE_API_TOKEN || '',
};

/**
 * Check if a specific API key is configured
 */
export const isAPIKeyConfigured = (key: keyof typeof API_KEYS): boolean => {
  return Boolean(API_KEYS[key]);
};

/**
 * Get API key with validation
 * Throws an error if the key is not configured
 */
export const getAPIKey = (key: keyof typeof API_KEYS): string => {
  const apiKey = API_KEYS[key];
  if (!apiKey) {
    throw new Error(
      `${key} API key is not configured. Please add it to your .env file. ` +
      `See .env.example for instructions.`
    );
  }
  return apiKey;
};
