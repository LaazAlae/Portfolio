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

            // Check if data is empty and load template if needed
            if (this.isEmptyData(this.portfolioData)) {
                console.log('Loading template data...');
                const templateResponse = await fetch('/template.json');
                this.portfolioData = await templateResponse.json();
            }
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            // Fallback to template if main data fails
            try {
                const templateResponse = await fetch('/template.json');
                this.portfolioData = await templateResponse.json();
            } catch (templateError) {
                console.error('Error loading template data:', templateError);
                throw templateError;
            }
        }
    }

    isEmptyData(data) {
        if (!data || !data.personal) return true;

        // Check if essential fields are empty or placeholder-like
        const name = data.personal.name || '';
        const title = data.personal.title || '';

        return name.trim() === '' ||
               title.trim() === '' ||
               name === 'Your Name' ||
               title === 'Your Professional Title';
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

        if (!container) return;

        if (!experience || experience.length === 0) {
            container.innerHTML = '<p class="no-content">Experience information will appear here when added to the JSON file.</p>';
            return;
        }

        container.innerHTML = experience.map(exp => `
            <div class="experience-item">
                <h3>${this.escapeHtml(exp.title || 'Job Title')}</h3>
                <h4>${this.escapeHtml(exp.company || 'Company Name')}</h4>
                <p class="experience-date">${this.escapeHtml(exp.period || 'Period')}</p>
                <p class="experience-location">${this.escapeHtml(exp.location || 'Location')}</p>
                <ul>
                    ${(exp.responsibilities || ['Add job responsibilities to the JSON file']).map(resp =>
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

        if (!container) return;

        if (!skills) {
            container.innerHTML = '<p class="no-content">Skills will appear here when added to the JSON file.</p>';
            return;
        }

        const skillCategories = [
            { title: 'Core Programming', skills: skills.core_programming || [] },
            { title: 'Web Frameworks', skills: skills.web_frameworks || [] },
            { title: 'Infrastructure & Data', skills: skills.infrastructure_data || [] },
            { title: 'Security & Systems', skills: skills.security_systems || [] }
        ];

        // Show all categories with beautiful structure
        container.innerHTML = skillCategories.map(category => {
            const primarySkills = category.skills.filter(skill => skill.primary);
            const secondarySkills = category.skills.filter(skill => !skill.primary);

            return `
                <div class="skill-category clickable" data-category="${this.escapeHtml(category.title.toLowerCase().replace(/[\s&]/g, '_'))}">
                    <h4 class="skill-category-title">${this.escapeHtml(category.title)}</h4>
                    <div class="skill-tags">
                        ${primarySkills.length > 0 ? `
                            <div class="primary-skills">
                                ${primarySkills.map(skill =>
                                    `<span class="skill-tag primary clickable" data-skill="${this.escapeHtml(skill.name || 'Skill')}">${this.escapeHtml(skill.name || 'Skill')}</span>`
                                ).join('')}
                            </div>
                        ` : ''}
                        ${secondarySkills.length > 0 ? `
                            <div class="secondary-skills">
                                ${secondarySkills.map(skill =>
                                    `<span class="skill-tag clickable" data-skill="${this.escapeHtml(skill.name || 'Skill')}">${this.escapeHtml(skill.name || 'Skill')}</span>`
                                ).join('')}
                            </div>
                        ` : ''}
                        ${category.skills.length === 0 ? '<span class="skill-tag">Add skills to JSON</span>' : ''}
                    </div>
                </div>
            `;
        }).join('');

        // Add click listeners for skill filtering
        this.setupSkillFilterListeners();
    }

    renderLanguages() {
        const { languages } = this.portfolioData;
        const container = document.getElementById('languagesGrid');

        if (!container) return;

        if (!languages || languages.length === 0) {
            container.innerHTML = '<div class="language-item"><div class="language-info"><span class="language-name">Add languages to JSON</span><span class="language-level">Proficiency level</span></div></div>';
            return;
        }

        container.innerHTML = languages.map(lang => `
            <div class="language-item">
                <div class="language-info">
                    <span class="language-name">${this.escapeHtml(lang.name || 'Language')}</span>
                    <span class="language-level">${this.escapeHtml(lang.level || 'Level')}</span>
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

        if (!container) return;

        if (!this.portfolioData || !this.portfolioData.projects || this.portfolioData.projects.length === 0) {
            container.innerHTML = `
                <div class="project-card">
                    <div class="project-card-header">
                        <h3 class="project-card-title">Add Your Projects</h3>
                    </div>
                    <div class="project-card-body">
                        <p class="project-card-description">Copy the project template from template.json to add your projects here. Each project will automatically generate a new card.</p>
                    </div>
                    <div class="project-card-footer">
                        <button class="project-card-btn" disabled>
                            Template Project
                            <svg class="project-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 17l9.2-9.2M17 17V7H7"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.portfolioData.projects.map((project, index) => `
            <div class="project-card" data-project-index="${index}">
                <div class="project-card-header">
                    <h3 class="project-card-title">${this.escapeHtml(project.title || 'Project Title')}</h3>
                </div>
                <div class="project-card-body">
                    <p class="project-card-description">${this.escapeHtml(project.shortDescription || 'Project description will appear here')}</p>
                </div>
                <div class="project-card-footer">
                    <button class="project-card-btn" aria-label="View ${project.title || 'project'} details">
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

        body.appendChild(linksSection);
        if (skillsSection) body.appendChild(skillsSection);
        if (descSection) body.appendChild(descSection);

        return body;
    }

    createModalLinksDOM(project) {
        const linksContainer = document.createElement('div');
        linksContainer.className = 'modal-links';

        // Always create GitHub button
        const githubLink = document.createElement('a');
        if (project.githubUrl) {
            githubLink.href = project.githubUrl;
            githubLink.target = '_blank';
            githubLink.rel = 'noopener';
            githubLink.className = 'modal-link modal-link-github';
        } else {
            githubLink.className = 'modal-link modal-link-github disabled';
            githubLink.setAttribute('aria-disabled', 'true');
        }

        const githubIcon = this.createSVGIcon('github');
        githubLink.appendChild(githubIcon);
        githubLink.appendChild(document.createTextNode('GitHub'));

        // Always create Deploy button
        const deployLink = document.createElement('a');
        if (project.deploymentUrl) {
            deployLink.href = project.deploymentUrl;
            deployLink.target = '_blank';
            deployLink.rel = 'noopener';
            deployLink.className = 'modal-link modal-link-deploy';
        } else {
            deployLink.className = 'modal-link modal-link-deploy disabled';
            deployLink.setAttribute('aria-disabled', 'true');
        }

        const deployIcon = this.createSVGIcon('external');
        deployLink.appendChild(deployIcon);
        deployLink.appendChild(document.createTextNode('Live Demo'));

        linksContainer.appendChild(githubLink);
        linksContainer.appendChild(deployLink);

        return linksContainer;
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

    highlightTechnologies(text, projectSkills = []) {
        // First convert **text** to highlighted technology spans
        let result = text.replace(/\*\*(.*?)\*\*/g, '<span class="tech-highlight">$1</span>');

        // If we have project skills, also highlight them contextually when mentioned
        if (projectSkills && projectSkills.length > 0) {
            // Sort skills by length (longest first) to avoid partial matches
            const sortedSkills = projectSkills.slice().sort((a, b) => b.length - a.length);

            sortedSkills.forEach(skill => {
                // Skip if skill is too generic or already manually highlighted
                if (result.includes(`<span class="tech-highlight">${skill}</span>`)) {
                    return;
                }

                // Create regex to match the skill name (case insensitive, word boundaries)
                const escapedSkill = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`\\b(${escapedSkill})\\b`, 'gi');

                // Only replace if not already inside a tech-highlight span
                result = result.replace(regex, (match, p1, offset) => {
                    // Check if this match is already inside a tech-highlight span
                    const beforeMatch = result.substring(0, offset);

                    // Count unclosed tech-highlight spans before this position
                    const openSpans = (beforeMatch.match(/<span class="tech-highlight">/g) || []).length;
                    const closedSpans = (beforeMatch.match(/<\/span>/g) || []).length;

                    // If we're inside a span, don't highlight
                    if (openSpans > closedSpans) {
                        return match;
                    }

                    return `<span class="tech-highlight">${p1}</span>`;
                });
            });
        }

        return result;
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


    setupSkillFilterListeners() {
        // Add click listeners for skill categories
        document.querySelectorAll('.skill-category.clickable').forEach(category => {
            category.addEventListener('click', (e) => {
                e.stopPropagation();
                const categoryName = category.dataset.category;
                this.openSkillModal(categoryName, 'category');
            });
        });

        // Add click listeners for individual skill tags
        document.querySelectorAll('.skill-tag.clickable').forEach(skillTag => {
            skillTag.addEventListener('click', (e) => {
                e.stopPropagation();
                const skillName = skillTag.dataset.skill;
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
        card.className = 'skill-project-card';

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
                skillPill.className = 'skill-project-pill';
                skillPill.textContent = skillName;
                skillsContainer.appendChild(skillPill);
            });

            if (project.skills.length > 6) {
                const morePill = document.createElement('span');
                morePill.className = 'skill-project-pill more-skills';
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

    showError(message) {
        console.error(message);
        // Could add user-facing error display here
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});