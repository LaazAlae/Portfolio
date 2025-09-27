/**
 * Configuration for AI-Enhanced Portfolio Search
 *
 * To enable AI features:
 * 1. Get a free OpenAI API key from https://platform.openai.com/api-keys
 * 2. Replace 'YOUR_OPENAI_API_KEY' below with your actual key
 * 3. The free tier includes 200 requests/day which is more than enough
 */

const SEARCH_CONFIG = {
    // OpenAI API key for primary AI responses
    OPENAI_API_KEY: 'YOUR_OPENAI_API_KEY',

    // Google Gemini API key (get free at https://aistudio.google.com/app/apikey)
    GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY',

    // AI usage limits (free tier)
    DAILY_LIMIT: 100,

    // Fallback when AI is unavailable
    USE_FALLBACK: true,

    // Debug mode
    DEBUG: true
};

// Make config globally available
window.SEARCH_CONFIG = SEARCH_CONFIG;