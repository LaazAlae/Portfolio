// Portfolio Application - Main JavaScript
class PortfolioApp {
    constructor() {
        this.portfolioData = null;
        this.init();
    }

    async init() {
        try {
            await this.loadPortfolioData();
            await this.renderContent();
            this.setupEventListeners();
            this.setupNavigation();
        } catch (error) {
            console.error('Failed to initialize portfolio:', error);
            this.showError('Failed to load portfolio data');
        }
    }

    async loadPortfolioData() {
        try {
            const response = await fetch('/personal-info.json');
            this.portfolioData = await response.json();
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            throw error;
        }
    }

    async renderContent() {
        if (!this.portfolioData) return;

        this.renderPersonalInfo();
        this.renderAbout();
        this.renderExperience();
        this.renderEducation();
        this.renderSkills();
        this.renderLanguages();
        await this.renderProjects();
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
        ].filter(category => category.skills && category.skills.length > 0);

        container.innerHTML = skillCategories.map(category => `
            <div class="skill-category" data-category="${this.escapeHtml(category.title.toLowerCase().replace(/[\s&]/g, '_'))}">
                <h4 class="skill-category-title">${this.escapeHtml(category.title)}</h4>
                <div class="skill-tags">
                    ${category.skills.map(skill =>
                        `<span class="skill-tag ${skill.primary ? 'primary' : ''}" data-skill="${this.escapeHtml(skill.name)}">${this.escapeHtml(skill.name)}</span>`
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

        // Skill filtering will be rebuilt
    }

    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const navName = document.querySelector('.nav-name');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            if (scrollY > 50) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }

            if (scrollY > 100) {
                navName?.classList.add('visible');
            } else {
                navName?.classList.remove('visible');
            }
        });
    }


    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }


    async renderProjects() {
        const container = document.getElementById('projectsContainer');

        if (!container || !this.portfolioData || !this.portfolioData.projects) return;

        container.innerHTML = this.portfolioData.projects.map((project, index) => `
            <div class="project-card" data-project-index="${index}">
                <div class="project-card-header">
                    <h3 class="project-card-title">${this.escapeHtml(project.title)}</h3>
                </div>
                <div class="project-card-body">
                    <p class="project-card-description">${this.escapeHtml(project.shortDescription)}</p>
                </div>
                <div class="project-card-footer">
                    <button class="project-card-btn" aria-label="View ${project.title} details">
                        View Details
                        <svg class="project-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M7 17l9.2-9.2M17 17V7H7"/>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');

        this.attachProjectCardListeners(this.portfolioData.projects);
    }

    attachProjectCardListeners(projects) {
        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const projectIndex = parseInt(card.dataset.projectIndex);
                const project = projects[projectIndex];
                this.openProjectModal(project);
            });
        });
    }

    openProjectModal(project) {
        const modal = this.createModal(project);
        document.body.appendChild(modal);

        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        this.setupModalListeners(modal);
    }

    createModal(project) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal';

        const header = this.createModalHeader(project);
        const body = this.createModalBody(project);

        modalContent.appendChild(header);
        modalContent.appendChild(body);
        modal.appendChild(modalContent);

        return modal;
    }

    createModalHeader(project) {
        const header = document.createElement('div');
        header.className = 'modal-header';

        const title = document.createElement('h2');
        title.className = 'modal-title';
        title.textContent = project.title;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.setAttribute('aria-label', 'Close');
        closeBtn.textContent = '×';

        header.appendChild(title);
        header.appendChild(closeBtn);

        return header;
    }

    createModalBody(project) {
        const body = document.createElement('div');
        body.className = 'modal-body';

        const linksSection = this.createModalLinksDOM(project);
        const skillsSection = this.createModalSkillsDOM(project);
        const descSection = this.createModalDescriptionDOM(project);

        if (linksSection) body.appendChild(linksSection);
        if (skillsSection) body.appendChild(skillsSection);
        if (descSection) body.appendChild(descSection);

        return body;
    }

    createModalLinksDOM(project) {
        const links = [];

        if (project.githubUrl) {
            const githubLink = document.createElement('a');
            githubLink.href = project.githubUrl;
            githubLink.target = '_blank';
            githubLink.rel = 'noopener';
            githubLink.className = 'modal-link';

            const githubIcon = this.createSVGIcon('github');
            githubLink.appendChild(githubIcon);
            githubLink.appendChild(document.createTextNode('GitHub'));

            links.push(githubLink);
        }

        if (project.deploymentUrl) {
            const demoLink = document.createElement('a');
            demoLink.href = project.deploymentUrl;
            demoLink.target = '_blank';
            demoLink.rel = 'noopener';
            demoLink.className = 'modal-link';

            const demoIcon = this.createSVGIcon('external');
            demoLink.appendChild(demoIcon);
            demoLink.appendChild(document.createTextNode('Live Demo'));

            links.push(demoLink);
        }

        if (links.length === 0) return null;

        const section = document.createElement('div');
        section.className = 'modal-section';

        const title = document.createElement('h3');
        title.className = 'modal-section-title';
        title.textContent = 'Links';

        const linksContainer = document.createElement('div');
        linksContainer.className = 'modal-links';

        links.forEach(link => linksContainer.appendChild(link));

        section.appendChild(title);
        section.appendChild(linksContainer);

        return section;
    }

    createModalSkillsDOM(project) {
        if (!project.skills || project.skills.length === 0) return null;

        const section = document.createElement('div');
        section.className = 'modal-section';

        const title = document.createElement('h3');
        title.className = 'modal-section-title';
        title.textContent = 'Technologies';

        const skillsContainer = document.createElement('div');
        skillsContainer.className = 'modal-skills';

        project.skills.forEach(skillName => {
            const skill = document.createElement('span');
            skill.className = 'modal-skill';
            skill.textContent = skillName;
            skillsContainer.appendChild(skill);
        });

        section.appendChild(title);
        section.appendChild(skillsContainer);

        return section;
    }

    createModalDescriptionDOM(project) {
        if (!project.detailedDescription) return null;

        const section = document.createElement('div');
        section.className = 'modal-section';

        const title = document.createElement('h3');
        title.className = 'modal-section-title';
        title.textContent = 'Description';

        const descContainer = document.createElement('div');
        descContainer.className = 'modal-description';

        const paragraphs = project.detailedDescription.split('\n\n');
        paragraphs.forEach(paragraphText => {
            const p = document.createElement('p');
            p.textContent = paragraphText.trim();
            descContainer.appendChild(p);
        });

        section.appendChild(title);
        section.appendChild(descContainer);

        return section;
    }

    createSVGIcon(type) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', type === 'github' ? 'currentColor' : 'none');
        if (type !== 'github') {
            svg.setAttribute('stroke', 'currentColor');
            svg.setAttribute('stroke-width', '2');
        }

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        if (type === 'github') {
            path.setAttribute('d', 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z');
        } else {
            path.setAttribute('d', 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6');
            const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path2.setAttribute('d', 'M15 3h6v6');
            const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path3.setAttribute('d', 'M10 14L21 3');
            svg.appendChild(path2);
            svg.appendChild(path3);
        }

        svg.appendChild(path);
        return svg;
    }

    setupModalListeners(modal) {
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.closeModal(modal));

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal(modal);
            }
        }, { once: true });
    }

    closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';

        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 200);
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