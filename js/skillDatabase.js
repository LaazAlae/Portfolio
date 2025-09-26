/**
 * Comprehensive Skill Search Database
 * Industry-level implementation with detailed project mappings
 * Supports natural language queries with GitHub integration
 */

// Console debugging system
const SkillSearchDebug = {
    enabled: true,
    prefix: '[SkillSearch]',

    log(message, data = null) {
        if (!this.enabled) return;
        console.log(`${this.prefix} ${message}`, data || '');
    },

    warn(message, data = null) {
        if (!this.enabled) return;
        console.warn(`${this.prefix} WARNING: ${message}`, data || '');
    },

    error(message, error = null) {
        if (!this.enabled) return;
        console.error(`${this.prefix} ERROR: ${message}`, error || '');
    },

    group(title) {
        if (!this.enabled) return;
        console.group(`${this.prefix} ${title}`);
    },

    groupEnd() {
        if (!this.enabled) return;
        console.groupEnd();
    }
};

// Comprehensive skill database with real project mappings
const skillDatabase = {
    // Programming Languages
    "Python": {
        confidence: "expert",
        category: "programming",
        aliases: ["python", "py", "python3", "python programming"],
        description: "Advanced Python development with enterprise applications",
        projects: [
            {
                name: "AlaeAutomates Business Platform",
                repo: "https://github.com/LaazAlae/AlaeAutomates2.0",
                liveUrl: "https://alaeautomates.up.railway.app/",
                implementations: [
                    {
                        file: "processors/pdf_handler.py",
                        lines: "23-67",
                        description: "PyMuPDF text extraction with coordinate-based parsing and intelligent company name matching",
                        context: ["document processing", "text extraction", "automation"]
                    },
                    {
                        file: "database/manager.py",
                        lines: "15-45",
                        description: "SQLite operations with thread-safe file locking using fcntl",
                        context: ["database", "concurrency", "file systems"]
                    }
                ]
            },
            {
                name: "Custom Web Server (No Framework)",
                repo: "https://github.com/LaazAlae/webserver",
                implementations: [
                    {
                        file: "server.py",
                        lines: "112-156",
                        description: "Raw HTTP protocol implementation with socket programming",
                        context: ["networking", "protocols", "systems programming"]
                    }
                ]
            },
            {
                name: "Diplomatic Document Filler",
                repo: "https://github.com/LaazAlae/doc-filler",
                implementations: [
                    {
                        file: "main.py",
                        lines: "45-89",
                        description: "Kivy desktop application with cross-platform GUI and document automation",
                        context: ["desktop development", "GUI", "automation"]
                    }
                ]
            }
        ]
    },

    "JavaScript": {
        confidence: "expert",
        category: "programming",
        aliases: ["javascript", "js", "es6", "es6+", "ecmascript"],
        description: "Modern JavaScript with ES6+ features and framework expertise",
        projects: [
            {
                name: "FriendsGoTogether Rideshare",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "static/js/main.js",
                        lines: "145-289",
                        description: "Real-time Socket.IO integration with dynamic content updates and user interaction tracking",
                        context: ["real-time", "websockets", "user interface"]
                    },
                    {
                        file: "static/js/geolocation.js",
                        lines: "23-78",
                        description: "19,000+ city database with fuzzy search and autocomplete functionality",
                        context: ["search algorithms", "user experience", "data processing"]
                    }
                ]
            },
            {
                name: "Smart Laundry Management (NFC)",
                repo: "https://github.com/LaazAlae/modernlaundry",
                liveUrl: "https://laundryminutes.netlify.app/",
                implementations: [
                    {
                        file: "nfc-demo/app.js",
                        lines: "67-123",
                        description: "Web NFC API implementation with NDEFReader and machine ID extraction",
                        context: ["NFC", "modern web APIs", "IoT integration"]
                    }
                ]
            }
        ]
    },

    "React": {
        confidence: "expert",
        category: "frontend",
        aliases: ["react", "reactjs", "react.js", "react hooks", "jsx"],
        description: "Advanced React development with hooks, context, and modern patterns",
        projects: [
            {
                name: "Fabulous Nature Social",
                repo: "https://github.com/CSE370HCI/fabulous",
                liveUrl: "https://webdev.cse.buffalo.edu/hci/teams/fabulous/welcome",
                implementations: [
                    {
                        file: "src/components/UserProfile.jsx",
                        lines: "15-67",
                        description: "60+ React components with hooks architecture and Material-UI integration",
                        context: ["component architecture", "state management", "UI frameworks"]
                    },
                    {
                        file: "src/hooks/useSocket.js",
                        lines: "8-45",
                        description: "Custom React hooks for Socket.IO real-time communication",
                        context: ["custom hooks", "real-time features", "WebSocket integration"]
                    }
                ]
            },
            {
                name: "Enterprise Expense Tracker",
                repo: "https://github.com/LaazAlae/expenseTracker",
                liveUrl: "https://expensetracking.up.railway.app/",
                implementations: [
                    {
                        file: "client/src/components/Dashboard.jsx",
                        lines: "34-89",
                        description: "Real-time financial management with WebSocket synchronization and AES-256 encryption",
                        context: ["financial systems", "security", "real-time updates"]
                    }
                ]
            }
        ]
    },

    "Node.js": {
        confidence: "expert",
        category: "backend",
        aliases: ["node", "nodejs", "node.js", "express", "express.js"],
        description: "Enterprise-grade Node.js backend development with Express and security",
        projects: [
            {
                name: "Smart Laundry Management",
                repo: "https://github.com/LaazAlae/modernlaundry",
                liveUrl: "https://modernlaundry.onrender.com/",
                implementations: [
                    {
                        file: "server.js",
                        lines: "45-123",
                        description: "Express server with MongoDB, automated email notifications, and rate limiting",
                        context: ["server architecture", "email automation", "security"]
                    }
                ]
            },
            {
                name: "Enterprise Expense Tracker",
                repo: "https://github.com/LaazAlae/expenseTracker",
                liveUrl: "https://expensetracking.up.railway.app/",
                implementations: [
                    {
                        file: "server/app.js",
                        lines: "67-134",
                        description: "Government-grade security with AES-256 encryption and WebSocket real-time sync",
                        context: ["enterprise security", "encryption", "real-time systems"]
                    }
                ]
            }
        ]
    },

    "MongoDB": {
        confidence: "expert",
        category: "database",
        aliases: ["mongodb", "mongo", "nosql", "document database"],
        description: "Production MongoDB with optimization and real-time features",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "database/models.py",
                        lines: "23-89",
                        description: "MongoDB 4.2.5 with optimized indexing strategies for high-volume rideshare data",
                        context: ["database design", "indexing", "performance optimization"]
                    },
                    {
                        file: "database/aggregations.py",
                        lines: "45-123",
                        description: "Complex aggregation pipelines for geographic matching and user analytics",
                        context: ["aggregation", "geospatial", "analytics"]
                    }
                ]
            }
        ]
    },

    "PostgreSQL": {
        confidence: "advanced",
        category: "database",
        aliases: ["postgresql", "postgres", "sql", "relational database"],
        description: "Advanced PostgreSQL with optimization and government-level data",
        projects: [
            {
                name: "Federal Budget Analysis Database",
                repo: "https://github.com/yourname/budget-db",
                implementations: [
                    {
                        file: "schema/create.sql",
                        lines: "1-89",
                        description: "9-table schema with BCNF normalization and 31,225+ records per table",
                        context: ["database design", "normalization", "large datasets"]
                    },
                    {
                        file: "queries/optimization.sql",
                        lines: "156-203",
                        description: "Query optimization achieving 90%+ performance improvement through strategic indexing",
                        context: ["performance tuning", "indexing", "query optimization"]
                    }
                ]
            }
        ]
    },

    "Docker": {
        confidence: "advanced",
        category: "devops",
        aliases: ["docker", "containerization", "containers", "docker-compose"],
        description: "Production Docker deployments with multi-service orchestration",
        projects: [
            {
                name: "FriendsGoTogether Infrastructure",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "Dockerfile",
                        lines: "1-25",
                        description: "Multi-stage Docker build with Python 3.11 and production optimizations",
                        context: ["containerization", "deployment", "optimization"]
                    },
                    {
                        file: "docker-compose.yml",
                        lines: "8-34",
                        description: "Multi-service orchestration with Nginx reverse proxy and SSL termination",
                        context: ["orchestration", "reverse proxy", "SSL/TLS"]
                    }
                ]
            }
        ]
    },

    "Flask": {
        confidence: "expert",
        category: "backend",
        aliases: ["flask", "python flask", "flask api"],
        description: "Enterprise Flask applications with advanced security and automation",
        projects: [
            {
                name: "AlaeAutomates API Backend",
                repo: "https://github.com/LaazAlae/AlaeAutomates2.0",
                liveUrl: "https://alaeautomatesapi.up.railway.app/",
                implementations: [
                    {
                        file: "app.py",
                        lines: "23-89",
                        description: "Production Flask API with UUID session management and comprehensive security middleware",
                        context: ["API development", "session management", "enterprise security"]
                    }
                ]
            }
        ]
    },

    "Go": {
        confidence: "advanced",
        category: "programming",
        aliases: ["golang", "go", "go programming"],
        description: "Advanced Go for distributed systems and concurrent programming",
        projects: [
            {
                name: "Distributed Systems Protocol Suite",
                repo: "https://github.com/yourname/distributed-systems",
                implementations: [
                    {
                        file: "raft/leader_election.go",
                        lines: "67-134",
                        description: "Raft consensus protocol with leader election and MIT 6.824 compliance",
                        context: ["distributed systems", "consensus algorithms", "concurrency"]
                    },
                    {
                        file: "mapreduce/worker.go",
                        lines: "45-123",
                        description: "MapReduce framework with fault tolerance and dynamic load balancing",
                        context: ["parallel processing", "fault tolerance", "distributed computing"]
                    }
                ]
            }
        ]
    },

    "Security": {
        confidence: "expert",
        category: "security",
        aliases: ["security", "encryption", "authentication", "cybersecurity", "secure coding"],
        description: "Enterprise-grade security implementation with encryption and threat detection",
        projects: [
            {
                name: "Enterprise Expense Tracker",
                repo: "https://github.com/LaazAlae/expenseTracker",
                liveUrl: "https://expensetracking.up.railway.app/",
                implementations: [
                    {
                        file: "security/encryption.js",
                        lines: "15-67",
                        description: "AES-256-CBC encryption with bulletproof fallback mechanisms for financial data",
                        context: ["encryption", "data protection", "financial security"]
                    },
                    {
                        file: "security/threats.js",
                        lines: "34-89",
                        description: "Real-time threat detection with brute force prevention and IP blocking",
                        context: ["threat detection", "brute force protection", "monitoring"]
                    }
                ]
            }
        ]
    },

    "Real-time": {
        confidence: "expert",
        category: "architecture",
        aliases: ["real-time", "websocket", "socket.io", "live updates", "real time"],
        description: "Real-time communication systems with WebSocket and event-driven architecture",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "realtime/socketio_handler.py",
                        lines: "23-78",
                        description: "Socket.IO with Eventlet async processing for 1,000+ concurrent connections",
                        context: ["WebSocket", "scalability", "async processing"]
                    }
                ]
            }
        ]
    }
};

// Natural language query processing
class SkillQueryProcessor {
    constructor() {
        this.skillKeys = Object.keys(skillDatabase);
        SkillSearchDebug.log('SkillQueryProcessor initialized', { skillCount: this.skillKeys.length });
    }

    /**
     * Process natural language query and extract skills/context
     */
    processQuery(query) {
        SkillSearchDebug.group(`Processing query: "${query}"`);

        const normalized = query.toLowerCase()
            .replace(/[?!.,;:]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        SkillSearchDebug.log('Normalized query', normalized);

        const matches = [];
        const contextKeywords = this.extractContext(normalized);

        // Find skill matches using aliases and direct matches
        for (const [skillName, skillData] of Object.entries(skillDatabase)) {
            const matchScore = this.calculateMatchScore(normalized, skillName, skillData);

            if (matchScore > 0) {
                matches.push({
                    skill: skillName,
                    data: skillData,
                    score: matchScore,
                    context: contextKeywords
                });

                SkillSearchDebug.log(`Match found: ${skillName}`, { score: matchScore });
            }
        }

        // Sort by relevance score
        matches.sort((a, b) => b.score - a.score);

        SkillSearchDebug.log('Final matches', matches.map(m => ({ skill: m.skill, score: m.score })));
        SkillSearchDebug.groupEnd();

        return {
            originalQuery: query,
            normalizedQuery: normalized,
            matches: matches.slice(0, 3), // Top 3 matches
            context: contextKeywords,
            hasResults: matches.length > 0
        };
    }

    /**
     * Calculate relevance score for skill matching
     */
    calculateMatchScore(query, skillName, skillData) {
        let score = 0;
        const queryWords = query.split(' ');

        // Direct skill name match (highest priority)
        if (query.includes(skillName.toLowerCase())) {
            score += 100;
        }

        // Alias matching
        for (const alias of skillData.aliases) {
            if (query.includes(alias)) {
                score += 80;
            }
        }

        // Partial word matching
        queryWords.forEach(word => {
            if (word.length > 2) {
                if (skillName.toLowerCase().includes(word)) {
                    score += 30;
                }

                skillData.aliases.forEach(alias => {
                    if (alias.includes(word)) {
                        score += 20;
                    }
                });
            }
        });

        // Context matching within projects
        skillData.projects.forEach(project => {
            project.implementations.forEach(impl => {
                impl.context.forEach(ctx => {
                    if (query.includes(ctx)) {
                        score += 10;
                    }
                });
            });
        });

        return score;
    }

    /**
     * Extract context keywords from query
     */
    extractContext(query) {
        const contextPatterns = {
            setup: ['setup', 'install', 'configure', 'create', 'initialize'],
            implementation: ['implement', 'build', 'develop', 'code', 'programming'],
            advanced: ['optimize', 'scale', 'performance', 'enterprise', 'production'],
            security: ['secure', 'security', 'encrypt', 'authentication', 'protect'],
            database: ['database', 'data', 'query', 'sql', 'storage'],
            frontend: ['ui', 'interface', 'frontend', 'user experience', 'design'],
            backend: ['api', 'server', 'backend', 'service', 'microservice']
        };

        const foundContext = [];

        for (const [contextType, keywords] of Object.entries(contextPatterns)) {
            if (keywords.some(keyword => query.includes(keyword))) {
                foundContext.push(contextType);
            }
        }

        return foundContext;
    }
}

// Natural language response generator
class ResponseGenerator {
    constructor() {
        this.templates = {
            confident: [
                "Absolutely! I have **extensive experience** with {skill}. Here's where you can see it in action:",
                "Yes! I'm highly skilled in {skill}. Check out these implementations:",
                "Definitely! {skill} is one of my strong areas. Here are some examples:"
            ],
            moderate: [
                "Yes, I have solid experience with {skill}. You can find examples here:",
                "Certainly! I've worked extensively with {skill} in these projects:",
                "Absolutely! Here's where I've implemented {skill}:"
            ],
            basic: [
                "I have experience with {skill}. Here's where you can see it:",
                "Yes, I've worked with {skill} in:",
                "I have hands-on experience with {skill}. Check out:"
            ]
        };

        this.noResultsTemplates = [
            "I don't have direct experience with that specific technology, but here are some related skills I do have:",
            "That's not in my current skillset, but you might be interested in these related technologies:",
            "I haven't worked with that particular tool, but here are some similar technologies I've used:"
        ];
    }

    /**
     * Generate natural language response
     */
    generateResponse(queryResult) {
        SkillSearchDebug.group('Generating response');
        SkillSearchDebug.log('Query result', queryResult);

        if (!queryResult.hasResults) {
            return this.generateNoResultsResponse();
        }

        const responses = [];

        queryResult.matches.forEach((match, index) => {
            const confidence = this.getConfidenceLevel(match.data.confidence);
            const template = this.selectTemplate(confidence);
            const skillResponse = this.buildSkillResponse(match, template);
            responses.push(skillResponse);
        });

        const finalResponse = {
            type: 'success',
            query: queryResult.originalQuery,
            content: responses.join('\n\n'),
            matches: queryResult.matches,
            metadata: {
                totalMatches: queryResult.matches.length,
                context: queryResult.context,
                processingTime: Date.now()
            }
        };

        SkillSearchDebug.log('Generated response', finalResponse);
        SkillSearchDebug.groupEnd();

        return finalResponse;
    }

    /**
     * Build response for individual skill match
     */
    buildSkillResponse(match, template) {
        const skill = match.skill;
        const data = match.data;

        let response = template.replace('{skill}', skill);

        // Add project implementations
        const projectSections = data.projects.map(project => {
            const implementations = project.implementations
                .slice(0, 2) // Limit to top 2 implementations per project
                .map(impl => {
                    const githubLink = `[${impl.file}](${project.repo}/blob/main/${impl.file}#L${impl.lines})`;
                    return `- ${githubLink} - ${impl.description}`;
                }).join('\n  ');

            const liveUrlSection = project.liveUrl ? ` | [Live Demo](${project.liveUrl})` : '';

            return `\n**🚀 ${project.name}**${liveUrlSection}\n  ${implementations}`;
        }).join('\n');

        return response + projectSections;
    }

    /**
     * Generate response when no matches found
     */
    generateNoResultsResponse() {
        const template = this.noResultsTemplates[0];

        // Suggest top skills as alternatives
        const topSkills = ['Python', 'JavaScript', 'React', 'Node.js', 'MongoDB']
            .map(skill => `[${skill}](#skill-${skill.toLowerCase()})`)
            .join(', ');

        return {
            type: 'no_results',
            content: `${template}\n\n**My core technologies**: ${topSkills}`,
            suggestions: ['Python', 'JavaScript', 'React', 'Node.js', 'MongoDB']
        };
    }

    /**
     * Select appropriate template based on confidence
     */
    selectTemplate(confidence) {
        const templates = this.templates[confidence] || this.templates.moderate;
        return templates[Math.floor(Math.random() * templates.length)];
    }

    /**
     * Map confidence levels
     */
    getConfidenceLevel(confidence) {
        const mapping = {
            'expert': 'confident',
            'advanced': 'moderate',
            'intermediate': 'moderate',
            'basic': 'basic'
        };
        return mapping[confidence] || 'moderate';
    }
}

// Main skill search system
class SkillSearchSystem {
    constructor() {
        this.processor = new SkillQueryProcessor();
        this.responseGenerator = new ResponseGenerator();

        SkillSearchDebug.log('SkillSearchSystem initialized');
    }

    /**
     * Main search function - industry-level implementation
     */
    async search(query) {
        const startTime = performance.now();

        try {
            SkillSearchDebug.group(`🔍 SKILL SEARCH: "${query}"`);

            // Process the query
            const queryResult = this.processor.processQuery(query);

            // Generate response
            const response = this.responseGenerator.generateResponse(queryResult);

            // Add performance metrics
            response.metadata = {
                ...response.metadata,
                processingTime: Math.round(performance.now() - startTime),
                timestamp: new Date().toISOString()
            };

            SkillSearchDebug.log('✅ Search completed', {
                processingTime: response.metadata.processingTime + 'ms',
                matches: response.matches?.length || 0
            });

            SkillSearchDebug.groupEnd();

            return response;

        } catch (error) {
            SkillSearchDebug.error('Search failed', error);

            return {
                type: 'error',
                content: 'Sorry, there was an error processing your search. Please try again.',
                error: error.message,
                metadata: {
                    processingTime: Math.round(performance.now() - startTime),
                    timestamp: new Date().toISOString()
                }
            };
        }
    }

    /**
     * Get available skills for suggestions
     */
    getAvailableSkills() {
        return Object.keys(skillDatabase).map(skill => ({
            name: skill,
            category: skillDatabase[skill].category,
            confidence: skillDatabase[skill].confidence
        }));
    }

    /**
     * Get random skill suggestions
     */
    getRandomSkillSuggestions(count = 5) {
        const skills = Object.keys(skillDatabase);
        const shuffled = skills.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
}

// Export for use in main application
window.SkillSearchSystem = SkillSearchSystem;
window.SkillSearchDebug = SkillSearchDebug;

SkillSearchDebug.log('🎯 Skill Database loaded successfully', {
    totalSkills: Object.keys(skillDatabase).length,
    categories: [...new Set(Object.values(skillDatabase).map(s => s.category))]
});