/**
 * ALAE CHAT SYSTEM - AI IS ALAE, NOT AN ASSISTANT
 * Beautiful input opens modal with ChatGPT responses AS Alae
 */

class AlaeChat {
    constructor() {
        this.memory = window.AlaeMemory;
        this.conversationHistory = [];
        this.isProcessing = false;
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.startTypingAnimation();
        console.log('Alae Chat System Ready');
    }

    setupElements() {
        // Beautiful input elements
        this.searchInput = document.getElementById('skillSearchInput');
        this.searchSubmit = document.getElementById('skillSearchSubmit');

        // Modal elements
        this.modalOverlay = document.getElementById('chatModalOverlay');
        this.modalClose = document.getElementById('chatModalClose');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.chatSend = document.getElementById('chatSend');

        // Typing animation questions
        this.sampleQuestions = [
            "What skills do you have?",
            "Tell me about your projects",
            "Where do you work?",
            "What's your experience with Python?",
            "Where did you go to school?",
            "Can you build APIs?",
            "What languages do you speak?"
        ];
        this.currentQuestionIndex = 0;
        this.isTypingAnimation = false;
        this.isUserTyping = false;
    }

    setupEventListeners() {
        // Beautiful input focus/blur for animation
        this.searchInput.addEventListener('focus', () => {
            this.stopTypingAnimation();
            this.isUserTyping = true;
        });

        this.searchInput.addEventListener('blur', () => {
            if (!this.searchInput.value.trim()) {
                this.isUserTyping = false;
                setTimeout(() => {
                    if (!this.isUserTyping) {
                        this.startTypingAnimation();
                    }
                }, 500);
            }
        });

        // Submit from beautiful input
        this.searchSubmit.addEventListener('click', () => this.openChatModal());
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.openChatModal();
            }
        });

        // Modal controls
        this.modalClose.addEventListener('click', () => this.closeChatModal());
        this.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.modalOverlay) {
                this.closeChatModal();
            }
        });

        // Chat input in modal
        this.chatSend.addEventListener('click', () => this.handleChatMessage());
        this.chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleChatMessage();
            }
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalOverlay.classList.contains('show')) {
                this.closeChatModal();
            }
        });
    }

    // Beautiful typing animation
    startTypingAnimation() {
        if (this.isUserTyping || this.isTypingAnimation) return;
        this.isTypingAnimation = true;
        this.typeNextQuestion();
    }

    stopTypingAnimation() {
        this.isTypingAnimation = false;
        if (this.currentAnimationTimeout) {
            clearTimeout(this.currentAnimationTimeout);
            this.currentAnimationTimeout = null;
        }
        if (this.searchInput.placeholder) {
            this.searchInput.placeholder = '';
        }
    }

    async typeNextQuestion() {
        if (!this.isTypingAnimation) return;

        const question = this.sampleQuestions[this.currentQuestionIndex];
        await this.typeText(question);
        if (!this.isTypingAnimation) return;

        await this.wait(2000);
        if (!this.isTypingAnimation) return;

        await this.deleteText();
        if (!this.isTypingAnimation) return;

        this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.sampleQuestions.length;
        await this.wait(500);
        this.typeNextQuestion();
    }

    async typeText(text) {
        for (let i = 0; i <= text.length; i++) {
            if (!this.isTypingAnimation) break;
            this.searchInput.placeholder = text.substring(0, i);
            await this.wait(50 + Math.random() * 30);
        }
    }

    async deleteText() {
        const currentText = this.searchInput.placeholder;
        for (let i = currentText.length; i >= 0; i--) {
            if (!this.isTypingAnimation) break;
            this.searchInput.placeholder = currentText.substring(0, i);
            await this.wait(30 + Math.random() * 20);
        }
    }

    wait(ms) {
        return new Promise(resolve => {
            this.currentAnimationTimeout = setTimeout(resolve, ms);
        });
    }

    // Open modal with initial message
    openChatModal() {
        const initialMessage = this.searchInput.value.trim();

        this.modalOverlay.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Clear chat and add initial message if provided
        this.chatMessages.innerHTML = '';

        if (initialMessage) {
            this.addMessage('user', initialMessage);
            this.searchInput.value = '';
            this.handleAIResponse(initialMessage);
        }

        // Focus chat input
        setTimeout(() => {
            this.chatInput.focus();
        }, 100);
    }

    closeChatModal() {
        this.modalOverlay.classList.remove('show');
        document.body.style.overflow = '';
        this.searchInput.focus();
    }

    async handleChatMessage() {
        const message = this.chatInput.value.trim();
        if (!message || this.isProcessing) return;

        this.addMessage('user', message);
        this.chatInput.value = '';
        await this.handleAIResponse(message);
    }

    async handleAIResponse(userMessage) {
        this.showTyping();
        this.isProcessing = true;

        try {
            const response = await this.getAlaeResponse(userMessage);
            this.hideTyping();
            this.addMessage('alae', response);

            this.conversationHistory.push({
                user: userMessage,
                alae: response,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            this.hideTyping();
            this.addMessage('alae', "Sorry, I'm having trouble responding right now. Please try again!");
            console.error('AI Response Error:', error);
        } finally {
            this.isProcessing = false;
        }
    }

    async getAlaeResponse(userMessage) {
        // Try multiple AI providers in order
        const providers = [
            { name: 'OpenAI', method: this.tryOpenAI.bind(this) },
            { name: 'Hugging Face', method: this.tryHuggingFace.bind(this) },
            { name: 'Google Gemini', method: this.tryGemini.bind(this) },
            { name: 'Smart Offline', method: this.getSmartOfflineResponse.bind(this) }
        ];

        for (const provider of providers) {
            try {
                console.log(`🔄 Trying ${provider.name}...`);
                const response = await provider.method(userMessage);
                if (response) {
                    console.log(`✅ ${provider.name} success!`);
                    return response;
                }
            } catch (error) {
                console.error(`❌ ${provider.name} failed:`, error);
                console.error('Full error details:', {
                    message: error.message,
                    stack: error.stack,
                    provider: provider.name
                });
                continue;
            }
        }

        // Ultimate fallback
        return "I'm having trouble responding right now, but I'd love to chat about my skills and experience! Please try again in a moment.";
    }

    async tryOpenAI(userMessage) {
        const apiKey = window.SEARCH_CONFIG?.OPENAI_API_KEY;
        if (!apiKey || apiKey === 'YOUR_OPENAI_API_KEY') {
            throw new Error('No API key');
        }

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
                        content: `You ARE Alae Laaziri. Respond as him in first person.

YOUR COMPLETE PROFILE:
${JSON.stringify(this.memory, null, 2)}

RECENT CONVERSATION:
${this.conversationHistory.slice(-3).map(h => `Them: ${h.user}\nYou: ${h.alae}`).join('\n\n')}

INSTRUCTIONS:
- You ARE Alae, not an assistant
- Use "I" for everything
- Be conversational and specific`
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ],
                max_tokens: 200,
                temperature: 0.8
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenAI API failed: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        return result.choices[0].message.content.trim();
    }

    async tryHuggingFace(userMessage) {
        // Skip Hugging Face for now - too unreliable without auth
        throw new Error('Hugging Face requires authentication');
    }

    async tryGemini(userMessage) {
        // Google Gemini API (free tier)
        const apiKey = window.SEARCH_CONFIG?.GEMINI_API_KEY;
        if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
            throw new Error('No Gemini API key');
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': apiKey
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You ARE Alae Laaziri. Respond as him in first person.

YOUR COMPLETE PROFILE:
${JSON.stringify(this.memory, null, 2)}

RECENT CONVERSATION:
${this.conversationHistory.slice(-3).map(h => `Them: ${h.user}\nYou: ${h.alae}`).join('\n\n')}

INSTRUCTIONS:
- You ARE Alae, not an assistant
- Use "I" for everything
- Keep responses under 50 words
- Don't say "Hi" or greet unless it's the first message
- Answer directly and concisely
- No unnecessary details

USER MESSAGE: ${userMessage}`
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('GEMINI FULL ERROR:', errorText);
            console.error('GEMINI API KEY:', apiKey.substring(0, 20) + '...');
            throw new Error(`Gemini API failed: ${response.status} - ${errorText}`);
        }

        const result = await response.json();
        return result.candidates[0].content.parts[0].text.trim();
    }

    getSmartOfflineResponse(userMessage) {
        const query = userMessage.toLowerCase();
        const memory = this.memory;

        // Skills and technical questions
        if (query.includes('skill') || query.includes('what can you do') || query.includes('technologies')) {
            const topSkills = ['Python', 'JavaScript', 'Flask', 'React'];
            return `I'm skilled in ${topSkills.join(', ')} and many other technologies. I've built production applications like ${memory.projects.shiftspace.name} and ${memory.projects.alaeautomates.name}. What specifically would you like to know about?`;
        }

        // Specific programming languages
        if (query.includes('python')) {
            const pythonSkill = memory.programming_skills.python;
            return `I'm an expert in Python with ${pythonSkill.years_experience}+ years of experience. I've used it to build ${pythonSkill.projects.join(', ')}. I work with Flask, data processing, and automation tools daily.`;
        }

        if (query.includes('javascript') || query.includes('js')) {
            const jsSkill = memory.programming_skills.javascript;
            return `I have ${jsSkill.years_experience} years of JavaScript experience. I've used it for ${jsSkill.use_cases.join(', ')} in projects like ${jsSkill.projects.join(', ')}.`;
        }

        if (query.includes('java') && !query.includes('javascript')) {
            const javaSkill = memory.programming_skills.java;
            return `I have ${javaSkill.years_experience} years of Java experience at an ${javaSkill.level.toLowerCase()} level, primarily for ${javaSkill.use_cases.join(' and ')}.`;
        }

        if (query.includes('golang') || query.includes(' go ') || query.includes('go programming')) {
            const goSkill = memory.programming_skills.golang;
            return `I have ${goSkill.years_experience} year of Go experience. I've used it for ${goSkill.use_cases.join(' and ')}.`;
        }

        if (query.includes('scala')) {
            const scalaSkill = memory.programming_skills.scala;
            return `I have ${scalaSkill.years_experience} year of Scala experience at a ${scalaSkill.level.toLowerCase()} level. I've been exposed to it through ${scalaSkill.use_cases.join(' and ')}.`;
        }

        // Education questions
        if (query.includes('education') || query.includes('school') || query.includes('university') || query.includes('degree')) {
            const edu = memory.education;
            return `I'm currently pursuing my ${edu.degree} at ${edu.university}, graduating in 2025. I've taken courses in ${edu.courses.slice(0, 4).join(', ')}, and more.`;
        }

        // Work experience
        if (query.includes('work') || query.includes('job') || query.includes('company') || query.includes('employment')) {
            const work = memory.work.current;
            return `I work as a ${work.title} at ${work.company} in ${work.location}. I've built automation solutions that save 20+ hours per week and developed the AlaeAutomates platform for document processing.`;
        }

        // Project questions
        if (query.includes('project') || query.includes('shiftspace') || query.includes('alaeautomates')) {
            if (query.includes('shiftspace')) {
                const project = memory.projects.shiftspace;
                return `ShiftSpace is my ${project.description.toLowerCase()} built with ${project.tech_stack.join(', ')}. It handles ${project.features.join(', ')}.`;
            }
            if (query.includes('alaeautomates')) {
                const project = memory.projects.alaeautomates;
                return `AlaeAutomates is my ${project.description.toLowerCase()} built with ${project.tech_stack.join(', ')}. It includes ${project.features.join(', ')}.`;
            }
            const projectNames = Object.keys(memory.projects).slice(0, 3);
            return `I've built several projects including ${projectNames.join(', ')}. My main ones are ShiftSpace (real-time scheduling) and AlaeAutomates (business automation platform). Which would you like to know more about?`;
        }

        // Languages spoken
        if (query.includes('language') && (query.includes('speak') || query.includes('fluent'))) {
            const langs = Object.entries(memory.languages).map(([lang, info]) =>
                `${lang.charAt(0).toUpperCase() + lang.slice(1).replace('_', ' ')} (${info.level})`
            );
            return `I speak ${langs.join(', ')}.`;
        }

        // Flask specific
        if (query.includes('flask')) {
            const flask = memory.technologies.web_frameworks.flask;
            return `I have advanced Flask experience. I've used it to build ${flask.projects.join(' and ')} for ${flask.use_cases.join(', ')}.`;
        }

        // React specific
        if (query.includes('react')) {
            const react = memory.technologies.web_frameworks.react;
            return `I have intermediate React experience. I've used it in ${react.projects.join(' and ')} for ${react.use_cases.join(' and ')}.`;
        }

        // Location questions
        if (query.includes('where') && (query.includes('live') || query.includes('located'))) {
            return `I'm based in ${memory.identity.location}.`;
        }

        // Contact/availability
        if (query.includes('contact') || query.includes('hire') || query.includes('available')) {
            return `I'm ${memory.contact.availability.toLowerCase()}. You can find my work on GitHub at ${memory.contact.github}.`;
        }

        // Basic conversational responses
        if (query.includes('hello') || query.includes('hi') || query.includes('hola')) {
            return "Hello! I'm Alae, a software developer specializing in Python, JavaScript, and full-stack applications. What would you like to know about my work?";
        }

        if (query.includes('how are you') || query.includes('how do you do')) {
            return "I'm doing great! I'm passionate about building scalable applications and automation solutions. Currently working on some exciting projects at United Corporate Services. What brings you here today?";
        }

        if (query.includes('who are you') || query.includes('about yourself')) {
            return `I'm ${memory.identity.name}, a ${memory.identity.title} based in ${memory.identity.location}. I'm currently pursuing my ${memory.education.degree} while working at ${memory.work.current.company}. I love building automation solutions and scalable web applications.`;
        }

        // Default response that's still personal and helpful
        return "I'd be happy to tell you about my skills, projects, education, or work experience. I'm a software developer with expertise in Python, JavaScript, and building scalable applications. What specifically would you like to know?";
    }

    addMessage(sender, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;

        messageDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message alae typing';
        typingDiv.id = 'typingIndicator';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content typing-dots';
        contentDiv.innerHTML = '<span></span><span></span><span></span>';

        typingDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.alaeChat = new AlaeChat();
    console.log('Alae Chat System Active');
});