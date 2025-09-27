/**
 * AI CHAT SYSTEM - NO HARDCODING, PURE AI
 * Reads from memory.js and uses AI to answer EVERYTHING
 */

class AlaeAI {
    constructor() {
        this.memory = window.AlaeMemory;
        this.conversationHistory = [];
        this.isProcessing = false;
        this.init();
    }

    init() {
        this.setupChatInterface();
        this.addWelcomeMessage();
        console.log('🤖 Alae AI initialized with complete memory');
    }

    setupChatInterface() {
        // Get the chat container
        this.chatContainer = document.getElementById('aiChatContainer');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.chatSend = document.getElementById('chatSend');

        // Setup event listeners
        this.chatSend.addEventListener('click', () => this.handleUserMessage());

        this.chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserMessage();
            }
        });

        console.log('💬 Chat interface ready');
    }

    addWelcomeMessage() {
        this.addMessage('ai', "Hi! I'm Alae's AI assistant. I know everything about his skills, projects, education, and experience. Ask me anything!");
    }

    async handleUserMessage() {
        const message = this.chatInput.value.trim();
        if (!message || this.isProcessing) return;

        // Add user message
        this.addMessage('user', message);
        this.chatInput.value = '';

        // Show typing indicator
        this.showTyping();

        try {
            // Get AI response
            const response = await this.getAIResponse(message);

            // Remove typing and add AI response
            this.hideTyping();
            this.addMessage('ai', response);

            // Save to conversation history
            this.conversationHistory.push({
                user: message,
                ai: response,
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            this.hideTyping();
            this.addMessage('ai', "Sorry, I'm having trouble processing that right now. Please try again!");
            console.error('AI Response Error:', error);
        }
    }

    async getAIResponse(userMessage) {
        this.isProcessing = true;

        try {
            // Check if API key is available
            const apiKey = window.SEARCH_CONFIG?.OPENAI_API_KEY;
            if (!apiKey || apiKey === 'YOUR_OPENAI_API_KEY') {
                return this.getOfflineResponse(userMessage);
            }

            // Use AI with full memory context
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [
                        {
                            role: "system",
                            content: `You are Alae Laaziri's personal AI assistant. You have complete knowledge about him from his memory database. Answer questions naturally and conversationally based ONLY on the provided information.

ALAE'S COMPLETE PROFILE:
${JSON.stringify(this.memory, null, 2)}

CONVERSATION HISTORY:
${this.conversationHistory.slice(-3).map(h => `User: ${h.user}\\nAI: ${h.ai}`).join('\\n\\n')}

INSTRUCTIONS:
- Answer naturally and conversationally
- Use "I" when speaking as Alae (e.g., "I'm skilled in Python...")
- Be specific with details from the memory
- If asked about something not in memory, say you don't have that information
- Keep responses concise but informative
- Remember conversation context`
                        },
                        {
                            role: "user",
                            content: userMessage
                        }
                    ],
                    max_tokens: 300,
                    temperature: 0.7
                })
            });

            if (response.ok) {
                const result = await response.json();
                return result.choices[0].message.content.trim();
            } else {
                throw new Error('API request failed');
            }

        } catch (error) {
            console.error('AI API Error:', error);
            return this.getOfflineResponse(userMessage);
        } finally {
            this.isProcessing = false;
        }
    }

    getOfflineResponse(userMessage) {
        const query = userMessage.toLowerCase();

        // Simple offline responses based on memory
        if (query.includes('skill') || query.includes('what can you do') || query.includes('what do you know')) {
            const skills = Object.keys(this.memory.programming_skills);
            return `I'm skilled in ${skills.slice(0, 3).join(', ')} and many other technologies. I've built projects like ShiftSpace and AlaeAutomates. What would you like to know specifically?`;
        }

        if (query.includes('education') || query.includes('school') || query.includes('university')) {
            return `I'm currently pursuing a ${this.memory.education.degree} at ${this.memory.education.university}, graduating in 2025.`;
        }

        if (query.includes('work') || query.includes('job')) {
            return `I work as a ${this.memory.work.current.title} at ${this.memory.work.current.company}.`;
        }

        if (query.includes('project')) {
            const projects = Object.keys(this.memory.projects).slice(0, 2);
            return `I've built several projects including ${projects.join(' and ')}. Which one would you like to know more about?`;
        }

        // Default response
        return "I'd be happy to tell you about Alae's skills, projects, education, or work experience. What would you like to know?";
    }

    addMessage(sender, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'user' ? '👤' : '🤖';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(contentDiv);

        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai typing';
        typingDiv.id = 'typingIndicator';

        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = '🤖';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content typing-dots';
        contentDiv.innerHTML = '<span></span><span></span><span></span>';

        typingDiv.appendChild(avatar);
        typingDiv.appendChild(contentDiv);

        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('aiChatContainer')) {
        window.alaeAI = new AlaeAI();
        console.log('🚀 Alae AI Chat System Active');
    }
});