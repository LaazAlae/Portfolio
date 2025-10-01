// Portfolio Application - Main JavaScript
class PortfolioApp {
    constructor() {
        this.portfolioData = null;
        this.currentProject = null;
        this.isScrolling = false;
        this.scrollTimeout = null;

        this.init();
    }

    async init() {
        try {
            await this.loadPortfolioData();
            this.renderContent();
            this.setupEventListeners();
            this.setupNavigation();
        } catch (error) {
            console.error('Failed to initialize portfolio:', error);
            this.showError('Failed to load portfolio data');
        }
    }

    async loadPortfolioData() {
        try {
            const response = await fetch('/api/portfolio');
            const result = await response.json();

            if (result.success) {
                this.portfolioData = result.data;
            } else {
                throw new Error(result.error || 'Failed to load data');
            }
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            throw error;
        }
    }

    renderContent() {
        if (!this.portfolioData) return;

        this.renderPersonalInfo();
        this.renderAbout();
        this.renderExperience();
        this.renderEducation();
        this.renderSkills();
        this.renderLanguages();
        this.setupFloatingDots();

        // Handle window resize with debouncing for performance
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.setupFloatingDots();
            }, 150);
        });
    }

    renderPersonalInfo() {
        const { personal } = this.portfolioData;

        // Update navigation name
        const navName = document.getElementById('navName');
        if (navName) navName.textContent = personal.name;

        // Update hero section
        const heroName = document.getElementById('heroName');
        const heroTitle = document.getElementById('heroTitle');
        const heroEducation = document.getElementById('heroEducation');

        if (heroName) heroName.textContent = personal.name;
        if (heroTitle) heroTitle.textContent = personal.title;
        if (heroEducation) heroEducation.textContent = personal.education;

        // Update page title
        document.title = `${personal.name} - Portfolio`;
    }

    renderAbout() {
        const { about } = this.portfolioData;

        const descElement = document.getElementById('aboutDescription');
        const secondaryElement = document.getElementById('aboutSecondary');

        if (descElement) descElement.textContent = about.description;
        if (secondaryElement) secondaryElement.textContent = about.secondary;
    }

    renderExperience() {
        const { experience } = this.portfolioData;
        const container = document.getElementById('experienceContainer');

        if (!container || !experience) return;

        container.innerHTML = experience.map(exp => `
            <div class="experience-item">
                <h3>${this.escapeHtml(exp.title)}</h3>
                <h4>${this.escapeHtml(exp.company)}</h4>
                <p class="experience-date">${this.escapeHtml(exp.period)}</p>
                <p class="experience-location">${this.escapeHtml(exp.location)}</p>
                <ul>
                    ${exp.responsibilities.map(resp =>
                        `<li>${this.escapeHtml(resp)}</li>`
                    ).join('')}
                </ul>
            </div>
        `).join('');
    }

    renderEducation() {
        const { education } = this.portfolioData;

        const degreeElement = document.getElementById('educationDegree');
        const institutionElement = document.getElementById('educationInstitution');
        const periodElement = document.getElementById('educationPeriod');

        if (degreeElement) degreeElement.textContent = education.degree;
        if (institutionElement) institutionElement.textContent = education.institution;
        if (periodElement) periodElement.textContent = `${education.period} • ${education.location}`;
    }

    renderSkills() {
        const { skills } = this.portfolioData;
        const container = document.getElementById('skillsGrid');

        if (!container || !skills) return;

        const skillCategories = [
            { title: 'Programming Languages', skills: skills.programming_languages },
            { title: 'Web Development', skills: skills.web_development },
            { title: 'Databases & Cloud', skills: skills.databases_cloud },
            { title: 'Specialized Skills', skills: skills.specialized }
        ];

        container.innerHTML = skillCategories.map(category => `
            <div class="skill-category">
                <h4>${this.escapeHtml(category.title)}</h4>
                <div class="skill-tags">
                    ${category.skills.map(skill =>
                        `<span class="skill-tag ${skill.primary ? 'primary' : ''}">${this.escapeHtml(skill.name)}</span>`
                    ).join('')}
                </div>
            </div>
        `).join('');
    }

    renderLanguages() {
        const { languages } = this.portfolioData;
        const container = document.getElementById('languagesGrid');

        if (!container || !languages) return;

        container.innerHTML = languages.map(lang => `
            <div class="language-item">
                <div class="language-info">
                    <span class="language-name">${this.escapeHtml(lang.name)}</span>
                    <span class="language-level">${this.escapeHtml(lang.level)}</span>
                </div>
            </div>
        `).join('');
    }





    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

    }

    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const navName = document.querySelector('.nav-name');

        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Add scrolled class for styling
            if (currentScrollY > 50) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }

            // Show/hide nav name based on scroll position
            if (currentScrollY > 100) {
                navName?.classList.add('visible');
            } else {
                navName?.classList.remove('visible');
            }

            lastScrollY = currentScrollY;
        });
    }


    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    setupFloatingDots() {
        const container = document.querySelector('.floating-dots-track');
        if (!container) return;

        // Sample project data
        const projects = [
            { title: 'Project', type: 'Web' },
            { title: 'Project', type: 'App' },
            { title: 'Project', type: 'API' },
            { title: 'Project', type: 'Web' },
            { title: 'Project', type: 'App' },
            { title: 'Project', type: 'API' },
            { title: 'Project', type: 'Web' },
            { title: 'Project', type: 'App' }
        ];

        // Project container approach
        const projectSpacing = 100; // Spacing between dots
        const screenWidth = window.innerWidth;
        const projectsNeeded = Math.ceil((screenWidth * 4) / projectSpacing) + 20;

        // Clear and create project containers
        container.innerHTML = '';

        for (let i = 0; i < projectsNeeded; i++) {
            const project = projects[i % projects.length];
            const projectContainer = this.createProjectContainer(project, i);
            container.appendChild(projectContainer);
        }

        // Set width and animation
        const trackWidth = projectsNeeded * projectSpacing;
        container.style.width = `${trackWidth}px`;

        container.style.animation = 'none';
        container.offsetHeight;
        container.style.animation = 'dotsFloat 60s linear infinite';
    }

    createProjectContainer(project, index) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        dot.style.marginRight = '100px';

        return dot;
    }

    showError(message) {
        console.error(message);
        // Could add user-facing error display here
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});