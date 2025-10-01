const fs = require('fs');
const path = require('path');

class ConfigManager {
    constructor() {
        this.personalInfo = null;
        this.loadPersonalInfo();
    }

    loadPersonalInfo() {
        try {
            const configPath = path.join(__dirname, '../../config/personal-info.json');
            const configData = fs.readFileSync(configPath, 'utf8');
            this.personalInfo = JSON.parse(configData);
        } catch (error) {
            console.warn('Personal info file not found, using placeholder data');
            this.personalInfo = this.getPlaceholderData();
        }
    }

    getPlaceholderData() {
        return {
            personal: {
                name: "Your Name",
                title: "Your Title | Your Expertise",
                education: "Your Education • Your Institution Year",
                location: "Your Location",
                email: "your.email@example.com",
                phone: "+1-XXX-XXX-XXXX",
                linkedin: "linkedin.com/in/your-profile",
                github: "github.com/your-username"
            },
            about: {
                description: "Write about yourself, your passion for technology, and what drives you as a developer.",
                secondary: "Share your journey, experiences, and what makes you unique in the tech industry."
            },
            education: {
                degree: "Your Degree",
                institution: "Your Institution",
                period: "Start Year – End Year",
                location: "Location"
            },
            experience: [
                {
                    title: "Your Job Title",
                    company: "Company Name",
                    period: "Start Date – End Date",
                    location: "Location",
                    responsibilities: [
                        "Key responsibility or achievement",
                        "Another important contribution",
                        "Technical project or innovation"
                    ]
                }
            ],
            skills: {
                programming_languages: [
                    { "name": "JavaScript", "primary": true },
                    { "name": "Python", "primary": true },
                    { "name": "TypeScript", "primary": false },
                    { "name": "Java", "primary": false }
                ],
                web_development: [
                    { "name": "React", "primary": true },
                    { "name": "Node.js", "primary": true },
                    { "name": "Express.js", "primary": false }
                ],
                databases_cloud: [
                    { "name": "MongoDB", "primary": true },
                    { "name": "PostgreSQL", "primary": false },
                    { "name": "AWS", "primary": false }
                ],
                specialized: [
                    { "name": "Full-Stack Development", "primary": true },
                    { "name": "API Development", "primary": false },
                    { "name": "DevOps", "primary": false }
                ]
            },
            languages: [
                { "name": "English", "level": "Native" },
                { "name": "Spanish", "level": "Conversational" }
            ],
            projects: [
                {
                    id: "sample-project",
                    title: "Sample Project",
                    stage: "Development",
                    headline: "Brief description of your project",
                    overview: "Detailed overview of what the project does and its impact.",
                    technologies: ["React", "Node.js", "MongoDB"],
                    highlights: ["Key Feature", "Innovation", "Achievement"],
                    links: {
                        demo: "https://your-demo.com",
                        repo: "https://github.com/your-username/project"
                    },
                    features: [
                        "Feature 1 description",
                        "Feature 2 description",
                        "Feature 3 description"
                    ],
                    technical: [
                        "Technical implementation detail 1",
                        "Technical implementation detail 2",
                        "Technical implementation detail 3"
                    ]
                }
            ]
        };
    }

    getPersonalInfo() {
        return this.personalInfo;
    }

    reloadConfig() {
        this.loadPersonalInfo();
    }
}

module.exports = new ConfigManager();