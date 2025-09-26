/**
 * Skill Search Interface - Industry-level HCI Implementation
 * Features: Animated typing, intelligent search, professional modal responses
 * Debugging: Comprehensive console logging for development
 */

class SkillSearchInterface {
    constructor() {
        this.searchSystem = null;
        this.isTypingAnimation = false;
        this.isUserTyping = false;
        this.currentAnimationTimeout = null;

        // Sample questions for typing animation
        this.sampleQuestions = [
            "Do you know React?",
            "Python experience?",
            "Can you build APIs?",
            "Database setup?",
            "Docker containers?",
            "Real-time features?",
            "Enterprise security?",
            "MongoDB queries?",
            "JavaScript frameworks?",
            "Full-stack development?"
        ];

        this.currentQuestionIndex = 0;
        this.init();

        console.log('🎯 SkillSearchInterface initialized');
    }

    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setupInterface());
            } else {
                this.setupInterface();
            }
        } catch (error) {
            console.error('[SkillSearch] Initialization failed:', error);
        }
    }

    setupInterface() {
        try {
            // Initialize search system
            this.searchSystem = new SkillSearchSystem();

            // Get DOM elements
            this.elements = {
                input: document.getElementById('skillSearchInput'),
                submit: document.getElementById('skillSearchSubmit'),
                modal: document.getElementById('skillSearchModal'),
                modalClose: document.getElementById('skillSearchClose'),
                results: document.getElementById('skillSearchResults'),
                container: document.querySelector('.skill-search-container')
            };

            // Validate elements exist
            if (!this.elements.input || !this.elements.submit) {
                throw new Error('Required DOM elements not found');
            }

            this.setupEventListeners();
            this.startTypingAnimation();

            console.log('✅ SkillSearchInterface setup complete');

        } catch (error) {
            console.error('[SkillSearch] Setup failed:', error);
        }
    }

    setupEventListeners() {
        // Input focus/blur events
        this.elements.input.addEventListener('focus', () => {
            console.log('🎯 Input focused - stopping animation');
            this.stopTypingAnimation();
            this.isUserTyping = true;
        });

        this.elements.input.addEventListener('blur', (e) => {
            // Only restart animation if input is empty and not submitting
            if (!this.elements.input.value.trim() && !e.relatedTarget?.closest('.skill-search-submit')) {
                setTimeout(() => {
                    if (!this.isUserTyping && !this.elements.input.value.trim()) {
                        console.log('🎯 Input blurred - restarting animation');
                        this.startTypingAnimation();
                    }
                }, 500);
            }
        });

        // Input typing detection
        this.elements.input.addEventListener('input', (e) => {
            this.isUserTyping = e.target.value.length > 0;

            // Handle Enter key
            this.elements.input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleSearch();
                }
            });
        });

        // Submit button
        this.elements.submit.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleSearch();
        });

        // Modal controls
        this.elements.modalClose.addEventListener('click', () => this.closeModal());

        this.elements.modal.addEventListener('click', (e) => {
            if (e.target === this.elements.modal) {
                this.closeModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.elements.modal.classList.contains('show')) {
                this.closeModal();
            }
        });

        console.log('✅ Event listeners attached');
    }

    /**
     * Animated typing system - Professional implementation
     */
    startTypingAnimation() {
        if (this.isUserTyping || this.isTypingAnimation) return;

        this.isTypingAnimation = true;
        console.log('🎬 Starting typing animation');

        this.typeNextQuestion();
    }

    stopTypingAnimation() {
        this.isTypingAnimation = false;

        if (this.currentAnimationTimeout) {
            clearTimeout(this.currentAnimationTimeout);
            this.currentAnimationTimeout = null;
        }

        // Clear placeholder if animation was running
        if (this.elements.input.placeholder) {
            this.elements.input.placeholder = '';
        }

        console.log('⏹️ Typing animation stopped');
    }

    async typeNextQuestion() {
        if (!this.isTypingAnimation) return;

        const question = this.sampleQuestions[this.currentQuestionIndex];
        console.log(`✍️ Typing question: "${question}"`);

        // Type out the question
        await this.typeText(question);

        if (!this.isTypingAnimation) return;

        // Pause before deleting
        await this.wait(2000);

        if (!this.isTypingAnimation) return;

        // Delete the question
        await this.deleteText();

        if (!this.isTypingAnimation) return;

        // Move to next question
        this.currentQuestionIndex = (this.currentQuestionIndex + 1) % this.sampleQuestions.length;

        // Pause before next question
        await this.wait(500);

        // Continue animation
        this.typeNextQuestion();
    }

    async typeText(text) {
        for (let i = 0; i <= text.length; i++) {
            if (!this.isTypingAnimation) break;

            this.elements.input.placeholder = text.substring(0, i);
            await this.wait(50 + Math.random() * 30); // Variable typing speed for realism
        }
    }

    async deleteText() {
        const currentText = this.elements.input.placeholder;

        for (let i = currentText.length; i >= 0; i--) {
            if (!this.isTypingAnimation) break;

            this.elements.input.placeholder = currentText.substring(0, i);
            await this.wait(30 + Math.random() * 20); // Faster deletion
        }
    }

    wait(ms) {
        return new Promise(resolve => {
            this.currentAnimationTimeout = setTimeout(resolve, ms);
        });
    }

    /**
     * Handle search submission - Industry-level implementation
     */
    async handleSearch() {
        const query = this.elements.input.value.trim();

        if (!query) {
            console.warn('🔍 Empty search query');
            return;
        }

        console.group(`🔍 SEARCH INITIATED: "${query}"`);

        try {
            // Show loading state
            this.showLoadingState();

            // Perform search
            const startTime = performance.now();
            const result = await this.searchSystem.search(query);
            const searchTime = Math.round(performance.now() - startTime);

            console.log(`⚡ Search completed in ${searchTime}ms`);
            console.log('📊 Search result:', result);

            // Display results
            this.displayResults(result, query);
            this.openModal();

        } catch (error) {
            console.error('🚨 Search failed:', error);
            this.displayError('Search failed. Please try again.');
        } finally {
            this.hideLoadingState();
            console.groupEnd();
        }
    }

    /**
     * Professional loading state management
     */
    showLoadingState() {
        this.elements.submit.classList.add('loading');
        this.elements.submit.disabled = true;
        this.elements.input.disabled = true;

        // Add loading spinner to button
        const svg = this.elements.submit.querySelector('svg');
        svg.style.animation = 'spin 1s linear infinite';

        console.log('⏳ Loading state activated');
    }

    hideLoadingState() {
        this.elements.submit.classList.remove('loading');
        this.elements.submit.disabled = false;
        this.elements.input.disabled = false;

        // Remove loading spinner
        const svg = this.elements.submit.querySelector('svg');
        svg.style.animation = '';

        console.log('✅ Loading state deactivated');
    }

    /**
     * Professional results display - Industry HCI standards
     */
    displayResults(result, originalQuery) {
        console.group('🎨 Rendering results');

        let html = '';

        if (result.type === 'success' && result.matches?.length > 0) {
            html = this.renderSuccessResults(result, originalQuery);
        } else if (result.type === 'no_results') {
            html = this.renderNoResults(result, originalQuery);
        } else {
            html = this.renderError(result);
        }

        this.elements.results.innerHTML = html;

        // Add click handlers for GitHub links
        this.setupResultInteractions();

        console.log('✅ Results rendered');
        console.groupEnd();
    }

    renderSuccessResults(result, query) {
        const metadata = result.metadata || {};

        let html = `
            <div class="search-result-header">
                <h4>Found ${result.matches.length} relevant skill${result.matches.length !== 1 ? 's' : ''}</h4>
                <span class="search-meta">Found in ${metadata.processingTime}ms</span>
            </div>
        `;

        result.matches.forEach((match, index) => {
            const skill = match.skill;
            const data = match.data;
            const confidenceClass = `confidence-${data.confidence}`;

            html += `
                <div class="skill-result ${confidenceClass}">
                    <div class="skill-header">
                        <h5 class="skill-name">${skill}</h5>
                        <span class="skill-confidence ${data.confidence}">${data.confidence}</span>
                    </div>
                    <p class="skill-description">${data.description}</p>

                    <div class="skill-projects">
                        ${data.projects.slice(0, 2).map(project => this.renderProject(project)).join('')}
                    </div>
                </div>
            `;
        });

        // Add suggestion for more skills
        html += `
            <div class="search-suggestions">
                <p>Try asking about: ${this.getRandomSuggestions().join(', ')}</p>
            </div>
        `;

        return html;
    }

    renderProject(project) {
        const liveSection = project.liveUrl
            ? `<a href="${project.liveUrl}" target="_blank" rel="noopener" class="project-live">🚀 Live Demo</a>`
            : '';

        const implementations = project.implementations
            .slice(0, 2)
            .map(impl => `
                <div class="implementation">
                    <a href="${project.repo}/blob/main/${impl.file}#L${impl.lines}"
                       target="_blank"
                       rel="noopener"
                       class="impl-link">
                        📄 ${impl.file}:${impl.lines}
                    </a>
                    <p class="impl-description">${impl.description}</p>
                </div>
            `).join('');

        return `
            <div class="project-result">
                <div class="project-header">
                    <h6 class="project-name">${project.name}</h6>
                    <div class="project-links">
                        <a href="${project.repo}" target="_blank" rel="noopener" class="project-repo">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            Repository
                        </a>
                        ${liveSection}
                    </div>
                </div>
                <div class="implementations">
                    ${implementations}
                </div>
            </div>
        `;
    }

    renderNoResults(result, query) {
        return `
            <div class="no-results">
                <h4>No exact matches found for "${query}"</h4>
                <p>But here are some technologies I do work with:</p>
                <div class="skill-suggestions">
                    ${this.getRandomSuggestions().map(skill =>
                        `<span class="suggestion-pill" data-skill="${skill}">${skill}</span>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    renderError(result) {
        return `
            <div class="search-error">
                <h4>Search Error</h4>
                <p>${result.content || 'An unexpected error occurred. Please try again.'}</p>
            </div>
        `;
    }

    setupResultInteractions() {
        // Handle suggestion pills
        this.elements.results.querySelectorAll('.suggestion-pill').forEach(pill => {
            pill.addEventListener('click', (e) => {
                const skill = e.target.dataset.skill;
                this.elements.input.value = skill;
                this.closeModal();
                setTimeout(() => this.handleSearch(), 100);
            });
        });

        // Track link clicks for analytics
        this.elements.results.querySelectorAll('a[target="_blank"]').forEach(link => {
            link.addEventListener('click', (e) => {
                console.log('🔗 External link clicked:', e.target.href);
            });
        });
    }

    getRandomSuggestions(count = 5) {
        const allSkills = this.searchSystem.getAvailableSkills().map(s => s.name);
        const shuffled = [...allSkills].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    /**
     * Modal management - Professional UX
     */
    openModal() {
        this.elements.modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Focus management for accessibility
        setTimeout(() => {
            const firstFocusable = this.elements.modal.querySelector('button, a, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) firstFocusable.focus();
        }, 100);

        console.log('📖 Modal opened');
    }

    closeModal() {
        this.elements.modal.classList.remove('show');
        document.body.style.overflow = '';

        // Return focus to input
        this.elements.input.focus();

        console.log('📖 Modal closed');
    }

    displayError(message) {
        this.elements.results.innerHTML = `
            <div class="search-error">
                <h4>Search Error</h4>
                <p>${message}</p>
            </div>
        `;
    }
}

// Initialize when DOM is ready
let skillSearchInterface;

function initializeSkillSearch() {
    try {
        skillSearchInterface = new SkillSearchInterface();
        console.log('🎯 Skill search interface initialized successfully');
    } catch (error) {
        console.error('🚨 Failed to initialize skill search:', error);
    }
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSkillSearch);
} else {
    initializeSkillSearch();
}

// Export for global access
window.SkillSearchInterface = SkillSearchInterface;