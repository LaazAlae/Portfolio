# AI-Enhanced Portfolio Search Setup

This portfolio now features **intelligent natural language search** powered by OpenAI's GPT-4o-mini API.

## 🚀 Features

- **Natural Language Understanding**: Ask questions like "Do you know React?" or "Where did you go to school?"
- **Human-like Responses**: AI generates personalized, conversational answers
- **Smart Query Translation**: Converts any question into precise search terms
- **100% Free**: Uses OpenAI's free tier (200 requests/day)
- **Automatic Fallback**: Works even without API key

## 🔧 Setup Instructions

### 1. Get Free OpenAI API Key

1. Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create account (free)
3. Generate new API key
4. Copy the key (starts with `sk-`)

### 2. Add Your API Key

1. Open `js/config.js`
2. Replace `YOUR_OPENAI_API_KEY` with your actual key:

```javascript
const SEARCH_CONFIG = {
    OPENAI_API_KEY: 'sk-your-actual-key-here', // ← Replace this
    // ... rest of config
};
```

### 3. Test It Out

1. Start your local server: `python3 -m http.server 8000`
2. Open `http://localhost:8000`
3. Try these queries:
   - "Do you know Python?"
   - "Where did you go to school?"
   - "Can you build APIs?"
   - "What's your experience with React?"

## 📊 Usage Limits (Free Tier)

- **200 requests per day**
- **40,000 tokens per day**
- **$0.00 cost** for typical portfolio usage

The system automatically tracks usage and falls back to basic responses when limits are reached.

## 🛡️ Privacy & Security

- API key stored locally in browser
- No data sent to external servers except OpenAI
- Rate limiting prevents overuse
- Automatic fallback ensures functionality

## 🔄 Fallback Mode

If no API key is provided or limits are reached:
- Search still works perfectly
- Uses intelligent pattern matching
- Responses are less conversational but accurate

## 🎯 Example Interactions

**User**: "Do you know Scala?"
**AI**: "Yes, I have experience with Scala from my distributed systems coursework. While I can't share the full academic code for integrity reasons, I can tell you about the implementation approach we used for concurrent programming patterns."

**User**: "Where did you go to school?"
**AI**: "I graduated with a Bachelor of Science in Computer Science from University at Buffalo–SUNY, completing my degree from August 2021 to May 2025."

**User**: "Can you build real-time features?"
**AI**: "Absolutely! I have extensive experience with real-time features. You can see it in ShiftSpace, which uses WebSockets for real-time scheduling updates, and my other projects that implement live data synchronization. Here's the GitHub link: [ShiftSpace Repository]"

---

**That's it!** Your portfolio now has industry-grade AI-powered search that understands any question visitors might ask.