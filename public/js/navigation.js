// Enhanced Navigation with Active Section Highlighting
class NavigationManager {
    constructor() {
        this.sections = ['about', 'experience', 'projects', 'background'];
        this.init();
    }

    init() {
        this.setupScrollSpy();
        this.setupSmoothScrolling();
        this.updateActiveSection();
    }

    setupScrollSpy() {
        const options = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.setActiveSection(entry.target.id);
                }
            });
        }, options);

        this.sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
                observer.observe(element);
            }
        });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('.sub-nav-link[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);

                if (target) {
                    const topNavbarHeight = document.querySelector('.top-navbar').offsetHeight;
                    const subNavbarHeight = document.querySelector('.sub-navbar').offsetHeight;
                    const totalNavHeight = topNavbarHeight + subNavbarHeight;
                    const targetPosition = target.offsetTop - totalNavHeight - 40;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    this.setActiveSection(targetId);
                }
            });
        });
    }

    setActiveSection(sectionId) {
        // Remove active class from all links
        document.querySelectorAll('.sub-nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current section link
        const activeLink = document.querySelector(`.sub-nav-link[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    updateActiveSection() {
        // Set initial active section based on scroll position
        const scrollPosition = window.pageYOffset;
        const topNavbarHeight = document.querySelector('.top-navbar').offsetHeight;
        const subNavbarHeight = document.querySelector('.sub-navbar').offsetHeight;
        const totalNavHeight = topNavbarHeight + subNavbarHeight;

        for (let i = this.sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(this.sections[i]);
            if (section && scrollPosition >= section.offsetTop - totalNavHeight - 120) {
                this.setActiveSection(this.sections[i]);
                break;
            }
        }
    }
}

// Initialize navigation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});