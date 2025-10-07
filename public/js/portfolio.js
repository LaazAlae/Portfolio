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
        const { personal, about, experience, education, skills, languages, projects } = this.portfolioData;

        this.renderPersonalInfo(personal);
        this.renderAbout(about);
        this.renderExperience(experience);
        this.renderEducation(education);
        this.renderSkills(skills);
        this.renderLanguages(languages);
        this.renderProjects(projects);
    }

    renderPersonalInfo(personal) {
        const elements = {
            navName: document.getElementById('navName'),
            heroName: document.getElementById('heroName'),
            heroTitle: document.getElementById('heroTitle'),
            heroEducation: document.getElementById('heroEducation')
        };

        if (elements.navName) elements.navName.textContent = personal.name;
        if (elements.heroName) elements.heroName.textContent = personal.name;
        if (elements.heroTitle) elements.heroTitle.textContent = personal.title;
        if (elements.heroEducation) elements.heroEducation.textContent = personal.education;

        document.title = `${personal.name} - Portfolio`;
        this.updateNavigationLinks(personal);
    }

    updateNavigationLinks(personal) {
        const links = {
            email: document.querySelector('.nav-social a[href^="mailto:"]'),
            github: document.querySelector('.nav-social a[aria-label="GitHub"]'),
            linkedin: document.querySelector('.nav-social a[aria-label="LinkedIn"]')
        };

        if (links.email && personal.email) {
            links.email.href = `mailto:${personal.email}`;
            links.email.addEventListener('click', (e) => {
                e.preventDefault();
                this.copyToClipboard(personal.email);
            });
        }
        if (links.github && personal.github) links.github.href = `https://${personal.github}`;
        if (links.linkedin && personal.linkedin) links.linkedin.href = `https://${personal.linkedin}`;
    }

    renderAbout(about) {
        const descElement = document.getElementById('aboutDescription');
        const secondaryElement = document.getElementById('aboutSecondary');

        if (descElement) descElement.textContent = about.description;
        if (secondaryElement) secondaryElement.textContent = about.secondary;
    }

    renderExperience(experience) {
        const container = document.getElementById('experienceContainer');
        if (!container || !experience?.length) return;

        container.innerHTML = experience.map(exp => `
            <div class="experience-item unified-card">
                <h3>${this.escapeHtml(exp.title)}</h3>
                <h4>${this.escapeHtml(exp.company)}</h4>
                <p class="experience-date">${this.escapeHtml(exp.period)}</p>
                <p class="experience-location">${this.escapeHtml(exp.location)}</p>
                <ul>
                    ${exp.responsibilities.map(resp => `<li>${this.escapeHtml(resp)}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    renderEducation(education) {
        const elements = {
            degree: document.getElementById('educationDegree'),
            institution: document.getElementById('educationInstitution'),
            period: document.getElementById('educationPeriod')
        };

        if (elements.degree) elements.degree.textContent = education.degree;
        if (elements.institution) elements.institution.textContent = education.institution;
        if (elements.period) elements.period.textContent = `${education.period} • ${education.location}`;
    }

    renderSkills(skills) {
        const container = document.getElementById('skillsGrid');
        if (!container || !skills) return;

        const skillCategories = [
            { title: 'Core Programming', skills: skills.core_programming || [] },
            { title: 'Web Frameworks', skills: skills.web_frameworks || [] },
            { title: 'Infrastructure & Data', skills: skills.infrastructure_data || [] },
            { title: 'Security & Systems', skills: skills.security_systems || [] }
        ];

        container.innerHTML = skillCategories.map(category => `
            <div class="skill-category clickable unified-card" data-category="${category.title.toLowerCase().replace(/[\s&]/g, '_')}">
                <h4 class="skill-category-title">${category.title}</h4>
                <div class="smart-pill-zone">
                    ${category.skills.map(skill =>
                        `<span class="smart-pill ${skill.primary ? 'primary' : ''} clickable" data-skill="${skill.name}">${skill.name}</span>`
                    ).join('')}
                </div>
            </div>
        `).join('');

        this.setupSkillFilterListeners();
    }

    renderLanguages(languages) {
        const container = document.getElementById('languagesGrid');
        if (!container || !languages?.length) return;

        container.innerHTML = languages.map(lang => `
            <div class="language-item unified-card">
                <div class="language-info">
                    <span class="language-name">${lang.name}</span>
                    <span class="language-level">${lang.level}</span>
                </div>
            </div>
        `).join('');
    }





    setupEventListeners() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }

    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const navName = document.querySelector('.nav-name');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            navbar?.classList.toggle('scrolled', scrollY > 50);
            navName?.classList.toggle('visible', scrollY > 100);
        });
    }


    escapeHtml(text) {
        return text?.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]) || '';
    }


    renderProjects(projects) {
        const container = document.getElementById('projectsContainer');
        if (!container || !projects?.length) return;

        container.innerHTML = projects.map((project, index) => `
            <div class="project-card unified-card" data-project-index="${index}">
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

        this.attachProjectCardListeners(projects);
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
        setTimeout(() => modal.classList.add('active'), 10);
        this.setupModalListeners(modal);
    }

    createModal(project) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h2 class="modal-title">${project.title}</h2>
                    <button class="modal-close" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body"></div>
            </div>
        `;

        const body = modal.querySelector('.modal-body');
        body.appendChild(this.createModalLinksDOM(project));
        if (project.skills?.length) body.appendChild(this.createModalSkillsDOM(project));
        if (project.detailedDescription) body.appendChild(this.createModalDescriptionDOM(project));

        return modal;
    }



    createModalLinksDOM(project) {
        const container = document.createElement('div');
        container.className = 'modal-links';

        const createLink = (url, className, text, iconType) => {
            const link = document.createElement('a');
            link.className = `modal-link ${className} ${url ? '' : 'disabled'}`;
            if (url) {
                link.href = url;
                link.target = '_blank';
                link.rel = 'noopener';
            } else {
                link.setAttribute('aria-disabled', 'true');
            }
            link.appendChild(this.createSVGIcon(iconType));
            link.appendChild(document.createTextNode(text));
            return link;
        };

        container.appendChild(createLink(project.githubUrl, 'modal-link-github', 'GitHub', 'github'));
        container.appendChild(createLink(project.deploymentUrl, 'modal-link-deploy', 'Live Demo', 'external'));
        return container;
    }

    createModalSkillsDOM(project) {
        const section = document.createElement('div');
        section.className = 'modal-section';
        section.innerHTML = `
            <h3 class="modal-section-title">Technologies</h3>
            <div class="modal-skills">
                ${project.skills.map(skill => `<span class="modal-skill-pill">${skill}</span>`).join('')}
            </div>
        `;
        return section;
    }

    createModalDescriptionDOM(project) {
        if (!project.detailedDescription) return null;

        const section = document.createElement('div');
        section.className = 'modal-section';

        const title = document.createElement('h3');
        title.className = 'modal-section-title';
        title.textContent = 'Project Details';

        const descContainer = document.createElement('div');
        descContainer.className = 'modal-description';

        // Parse the description into sections
        const sections = project.detailedDescription.split('\n\n');

        sections.forEach((sectionText) => {
            const trimmed = sectionText.trim();
            if (!trimmed) return;

            // Check if this section has bullet points
            if (trimmed.includes('\n•')) {
                // Split into header and bullet points
                const lines = trimmed.split('\n');
                const header = lines[0];
                const bullets = lines.slice(1).filter(line => line.trim().startsWith('•'));

                // Create section header
                if (header && !header.startsWith('•')) {
                    const h3 = document.createElement('h3');
                    h3.textContent = header;
                    descContainer.appendChild(h3);
                }

                // Create bullet list
                if (bullets.length > 0) {
                    const ul = document.createElement('ul');
                    bullets.forEach(bullet => {
                        const li = document.createElement('li');
                        li.innerHTML = this.highlightTechnologies(bullet.replace('•', '').trim(), project.skills);
                        ul.appendChild(li);
                    });
                    descContainer.appendChild(ul);
                }
            } else {
                // Regular paragraph
                const p = document.createElement('p');
                p.innerHTML = this.highlightTechnologies(trimmed, project.skills);
                descContainer.appendChild(p);
            }
        });

        section.appendChild(title);
        section.appendChild(descContainer);

        return section;
    }

    highlightTechnologies(text) {
        return text.replace(/\*\*(.*?)\*\*/g, '<span class="description-pill">$1</span>');
    }

    createSVGIcon(type) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');

        if (type === 'github') {
            svg.setAttribute('fill', 'currentColor');
            svg.innerHTML = '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>';
        } else {
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            svg.setAttribute('stroke-width', '2');
            svg.innerHTML = '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/>';
        }

        return svg;
    }

    setupModalListeners(modal) {
        modal.querySelector('.modal-close').addEventListener('click', () => this.closeModal(modal));
        modal.addEventListener('click', (e) => e.target === modal && this.closeModal(modal));
        document.addEventListener('keydown', (e) => e.key === 'Escape' && this.closeModal(modal), { once: true });
    }

    closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => modal.parentNode?.removeChild(modal), 200);
    }

    copyToClipboard(email) {
        navigator.clipboard.writeText(email).then(() => {
            this.showToast(`Gmail: ${email} copied to clipboard`);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = email;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showToast(`Gmail: ${email} copied to clipboard`);
        });
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }


    setupSkillFilterListeners() {
        // Add click listeners for skill categories
        document.querySelectorAll('.skill-category.clickable').forEach(category => {
            category.addEventListener('click', (e) => {
                e.stopPropagation();
                const categoryName = category.dataset.category;
                this.openSkillModal(categoryName, 'category');
            });
        });

        // Add click listeners for individual skill pills
        document.querySelectorAll('.smart-pill.clickable').forEach(skillPill => {
            skillPill.addEventListener('click', (e) => {
                e.stopPropagation();
                const skillName = skillPill.dataset.skill;
                this.openSkillModal(skillName, 'skill');
            });
        });
    }

    openSkillModal(filterValue, filterType) {
        const filteredProjects = this.getProjectsBySkill(filterValue, filterType);
        const modal = this.createSkillModal(filterValue, filterType, filteredProjects);
        document.body.appendChild(modal);

        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        this.setupModalListeners(modal);
    }

    getProjectsBySkill(filterValue, filterType) {
        if (!this.portfolioData || !this.portfolioData.projects) return [];

        return this.portfolioData.projects.filter(project => {
            if (!project.skills || project.skills.length === 0) return false;

            if (filterType === 'category') {
                // Get all skills in this category
                const categorySkills = this.getSkillsInCategory(filterValue);
                return project.skills.some(skill => categorySkills.includes(skill));
            } else {
                // Individual skill filter
                return project.skills.includes(filterValue);
            }
        });
    }

    getSkillsInCategory(categoryKey) {
        if (!this.portfolioData || !this.portfolioData.skills) return [];

        // Map display category names to JSON keys
        const categoryMap = {
            'core_programming': 'core_programming',
            'web_frameworks': 'web_frameworks',
            'infrastructure___data': 'infrastructure_data', // "Infrastructure & Data" becomes "infrastructure___data"
            'security___systems': 'security_systems' // "Security & Systems" becomes "security___systems"
        };

        const actualCategoryKey = categoryMap[categoryKey] || categoryKey;
        const category = this.portfolioData.skills[actualCategoryKey];

        if (!category || !Array.isArray(category)) return [];

        return category.map(skill => skill.name);
    }

    createSkillModal(filterValue, filterType, projects) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';

        const modalContent = document.createElement('div');
        modalContent.className = 'modal skill-modal';

        const header = this.createSkillModalHeader(filterValue, filterType);
        const body = this.createSkillModalBody(projects);

        modalContent.appendChild(header);
        modalContent.appendChild(body);
        modal.appendChild(modalContent);

        return modal;
    }

    createSkillModalHeader(filterValue, filterType) {
        const header = document.createElement('div');
        header.className = 'modal-header';

        const title = document.createElement('h2');
        title.className = 'modal-title';

        const displayName = filterType === 'category'
            ? this.formatCategoryName(filterValue)
            : filterValue;

        title.textContent = `Projects using ${displayName}`;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close';
        closeBtn.setAttribute('aria-label', 'Close');
        closeBtn.textContent = '×';

        header.appendChild(title);
        header.appendChild(closeBtn);

        return header;
    }

    formatCategoryName(categoryKey) {
        return categoryKey.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    createSkillModalBody(projects) {
        const body = document.createElement('div');
        body.className = 'modal-body skill-modal-body';

        if (projects.length === 0) {
            const noProjects = document.createElement('p');
            noProjects.className = 'no-projects';
            noProjects.textContent = 'No projects found using this skill or category.';
            body.appendChild(noProjects);
            return body;
        }

        const projectsGrid = document.createElement('div');
        projectsGrid.className = 'skill-projects-grid';

        projects.forEach((project) => {
            const projectCard = this.createSkillProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });

        body.appendChild(projectsGrid);
        return body;
    }

    createSkillProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'skill-project-card unified-card';

        const title = document.createElement('h3');
        title.className = 'skill-project-title';
        title.textContent = project.title;

        const description = document.createElement('p');
        description.className = 'skill-project-description';
        description.textContent = project.shortDescription;

        const skillsContainer = document.createElement('div');
        skillsContainer.className = 'skill-project-skills';

        if (project.skills && project.skills.length > 0) {
            project.skills.slice(0, 6).forEach(skillName => {
                const skillPill = document.createElement('span');
                skillPill.className = 'modal-project-pill';
                skillPill.textContent = skillName;
                skillsContainer.appendChild(skillPill);
            });

            if (project.skills.length > 6) {
                const morePill = document.createElement('span');
                morePill.className = 'modal-project-pill more-skills';
                morePill.textContent = `+${project.skills.length - 6} more`;
                skillsContainer.appendChild(morePill);
            }
        }

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(skillsContainer);

        // Add click handler to open project details
        card.addEventListener('click', () => {
            // Close skill modal first
            const skillModal = card.closest('.modal-overlay');
            this.closeModal(skillModal);

            // Open project modal
            setTimeout(() => {
                this.openProjectModal(project);
            }, 300);
        });

        return card;
    }

}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});