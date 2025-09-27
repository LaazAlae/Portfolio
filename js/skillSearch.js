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

        // Lock the result to prevent changes after modal opens
        const lockedResult = JSON.parse(JSON.stringify(result));

        let html = '';

        if (lockedResult.type === 'conversation') {
            html = this.renderConversation(lockedResult, originalQuery);
        } else if (lockedResult.type === 'direct') {
            html = this.renderDirect(lockedResult, originalQuery);
        } else if (lockedResult.type === 'success' && lockedResult.matches?.length > 0) {
            html = this.renderSuccessResults(lockedResult, originalQuery);
        } else if (lockedResult.type === 'no_results') {
            html = this.renderNoResults(lockedResult, originalQuery);
        } else {
            html = this.renderError(lockedResult);
        }

        this.elements.results.innerHTML = html;

        // Add click handlers for GitHub links
        this.setupResultInteractions();

        console.log('✅ Results rendered');
        console.groupEnd();
    }

    renderSuccessResults(result, query) {
        const metadata = result.metadata || {};

        // Use AI-generated response directly
        let responseText = result.content || "Here's what I found:";

        let html = `
            <div class="search-result-header">
                <h4>${responseText}</h4>
                <span class="search-meta">Found in ${metadata.processingTime}ms</span>
            </div>
        `;

        // Group projects by unique implementations to avoid duplicates
        const uniqueProjects = new Map();
        result.matches.forEach(match => {
            match.data.projects.forEach(project => {
                const key = `${project.name}-${project.repo}`;
                if (!uniqueProjects.has(key)) {
                    uniqueProjects.set(key, {
                        ...project,
                        skills: [match.skill]
                    });
                } else {
                    const existing = uniqueProjects.get(key);
                    if (!existing.skills.includes(match.skill)) {
                        existing.skills.push(match.skill);
                    }
                }
            });
        });

        const projects = Array.from(uniqueProjects.values());

        if (projects.length > 0) {
            // More natural description based on query type
            let description = this.getProjectDescription(query, projects);
            html += `<p style="color: var(--muted-color); margin-bottom: 1.5rem;">${description}</p>`;

            projects.slice(0, 3).forEach(project => {
                html += this.renderProject(project);
            });
        }

        // Add suggestion for more skills
        html += `
            <div class="search-suggestions">
                <p>Try asking about: ${this.getRandomSuggestions().join(', ')}</p>
            </div>
        `;

        return html;
    }

    renderProject(project) {
        try {
            const liveSection = project.liveUrl
                ? `<a href="${project.liveUrl}" target="_blank" rel="noopener" class="project-live">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15,3 21,3 21,9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Live Demo</a>`
                : '';

            // Ensure implementations exist and is an array
            const implementationsArray = project.implementations || [];
            const implementations = implementationsArray
                .slice(0, 2)
                .map(impl => {
                    try {
                        // Check if file actually exists by being more conservative with links
                        const repoLink = this.createSafeGitHubLink(project.repo, impl.file);

                        return `
                            <div class="implementation">
                                <div class="impl-header">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                        <polyline points="14,2 14,8 20,8"></polyline>
                                        <line x1="16" y1="13" x2="8" y2="13"></line>
                                        <line x1="16" y1="17" x2="8" y2="17"></line>
                                        <polyline points="10,9 9,9 8,9"></polyline>
                                    </svg>
                                    <span class="impl-title">${impl.file || 'Information'}</span>
                                    ${repoLink ? `<a href="${repoLink}" target="_blank" rel="noopener" class="impl-link">View Code</a>` : ''}
                                </div>
                                <p class="impl-description">${impl.description || ''}</p>
                            </div>
                        `;
                    } catch (implError) {
                        console.error('Error rendering implementation:', implError, impl);
                        return `<div class="implementation"><p>Error displaying implementation details</p></div>`;
                    }
                }).join('');

            return `
                <div class="project-result">
                    <div class="project-header">
                        <h6 class="project-name">${project.name || 'Project'}</h6>
                        <div class="project-links">
                            <a href="${project.repo || '#'}" target="_blank" rel="noopener" class="project-repo">
                                ${project.repo && project.repo.includes('github.com') ?
                                    `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                                    </svg>` :
                                    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="2" y1="12" x2="22" y2="12"></line>
                                        <path d="M9.09 9c0-1.66 1.34-3 3-3s3 1.34 3 3c0 1.66-1.34 3-3 3s-3-1.34-3-3z"></path>
                                    </svg>`}
                                ${project.repo && project.repo.includes('github.com') ? 'Repository' : 'Website'}
                            </a>
                            ${liveSection}
                        </div>
                    </div>
                    <div class="implementations">
                        ${implementations}
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error rendering project:', error, project);
            return `
                <div class="project-result">
                    <div class="project-header">
                        <h6 class="project-name">${project.name || 'Project'}</h6>
                    </div>
                    <p>Error displaying project details</p>
                </div>
            `;
        }
    }


    /**
     * Get natural project description based on query type
     */
    getProjectDescription(query, projects) {
        const normalizedQuery = query.toLowerCase();

        // Education queries
        if (normalizedQuery.includes('school') || normalizedQuery.includes('university') ||
            normalizedQuery.includes('college') || normalizedQuery.includes('education')) {
            return "Here are my academic details:";
        }

        // Work queries
        if (normalizedQuery.includes('work') || normalizedQuery.includes('job') ||
            normalizedQuery.includes('employment') || normalizedQuery.includes('career')) {
            return "Here's information about my current position:";
        }

        // Contact queries
        if (normalizedQuery.includes('contact') || normalizedQuery.includes('email') ||
            normalizedQuery.includes('phone') || normalizedQuery.includes('reach')) {
            return "Here's my contact information:";
        }

        // Language queries
        if (normalizedQuery.includes('language') && !normalizedQuery.includes('programming')) {
            return "Here are the languages I speak:";
        }

        // Coursework queries
        if (normalizedQuery.includes('course') || normalizedQuery.includes('class')) {
            return "Here are the relevant courses from my curriculum:";
        }

        // Default for technical skills
        return "You can find implementations in these projects:";
    }


    /**
     * Create safe GitHub links - only link to repos that actually exist
     */
    createSafeGitHubLink(repoUrl, filename) {
        // Only process GitHub URLs
        if (!repoUrl || !repoUrl.includes('github.com')) {
            return null; // Don't create link for non-GitHub URLs
        }

        // List of known working repos and their main files
        const knownRepos = {
            'https://github.com/LaazAlae/ShiftSpace': ['app.py', 'docker-compose.yml', 'Dockerfile', 'requirements.txt'],
            'https://github.com/LaazAlae/modernlaundry': ['server.js', 'package.json', 'public/manifest.json'],
            'https://github.com/LaazAlae/expenseTracker': ['package.json', 'README.md'],
            'https://github.com/LaazAlae/doc-filler': ['main.py', 'README.md'],
            'https://github.com/CSE370HCI/fabulous': ['src/App.jsx', 'package.json']
        };

        const knownFiles = knownRepos[repoUrl];
        if (!knownFiles) {
            // Unknown repo, just link to the main repo
            return repoUrl;
        }

        // Check if the file is likely to exist
        const probablyExists = knownFiles.some(knownFile =>
            filename.includes(knownFile) || knownFile.includes(filename.split('/').pop())
        );

        if (probablyExists) {
            return `${repoUrl}/blob/main/${filename}`;
        } else {
            // File probably doesn't exist, just link to repo
            return repoUrl;
        }
    }

    renderConversation(result, query) {
        const aiResponse = result.content || "I'm here to help you learn about Alae's skills and experience!";

        return `
            <div class="conversation-response">
                <h4>${aiResponse}</h4>
                <p>Try asking about:</p>
                <div class="skill-suggestions">
                    ${['Python experience', 'education background', 'work experience', 'JavaScript projects', 'contact info'].map(suggestion =>
                        `<span class="suggestion-pill" data-skill="${suggestion}">${suggestion}</span>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    renderDirect(result, query) {
        const aiResponse = result.content || "Here's what I can tell you:";

        return `
            <div class="direct-response">
                <h4>${aiResponse}</h4>
                <p>Want to learn more? Try asking:</p>
                <div class="skill-suggestions">
                    ${['Specific Python projects', 'React implementations', 'work experience details', 'education details', 'contact information'].map(suggestion =>
                        `<span class="suggestion-pill" data-skill="${suggestion}">${suggestion}</span>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    renderNoResults(result, query) {
        const aiResponse = result.content || `No exact matches found for "${query}"`;

        return `
            <div class="no-results">
                <h4>${aiResponse}</h4>
                <p>Here are some technologies I do work with:</p>
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