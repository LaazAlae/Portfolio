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
    // Personal Information
    "education": {
        confidence: "expert",
        category: "personal",
        aliases: ["education", "school", "university", "college", "degree", "bachelor", "bachelor's", "graduate", "graduation", "where did you study", "where did you go to school"],
        description: "Bachelor of Science in Computer Science from University at Buffalo–SUNY",
        projects: [
            {
                name: "University at Buffalo–SUNY",
                repo: "https://www.buffalo.edu/",
                implementations: [
                    {
                        file: "Academic Record",
                        description: "Bachelor of Science in Computer Science, Aug 2021 – May 2025, Buffalo, NY"
                    }
                ]
            }
        ]
    },
    "work experience": {
        confidence: "expert",
        category: "personal",
        aliases: ["work", "job", "experience", "employment", "career", "where do you work", "current job", "position"],
        description: "Cash Application Specialist & Process Automation Developer at United Corporate Services",
        projects: [
            {
                name: "United Corporate Services Inc.",
                repo: "https://unitedcorporateservices.com/",
                implementations: [
                    {
                        file: "Current Position",
                        description: "Cash Application Specialist & Process Automation Developer, Summer 2024 & June 2025 – Present, Yonkers, NY"
                    }
                ]
            }
        ]
    },
    "contact": {
        confidence: "expert",
        category: "personal",
        aliases: ["contact", "email", "phone", "address", "location", "linkedin", "github", "how to reach", "contact info"],
        description: "Contact information and professional profiles",
        projects: [
            {
                name: "Professional Contact",
                repo: "https://linkedin.com/in/alae-laaziri/",
                implementations: [
                    {
                        file: "Contact Details",
                        description: "Email: laazalae5@gmail.com, Phone: 646-251-8065, Address: 68 Mohawk Rd, Yonkers, NY 10710"
                    },
                    {
                        file: "Professional Profiles",
                        description: "LinkedIn: linkedin.com/in/alae-laaziri/, GitHub: github.com/LaazAlae"
                    }
                ]
            }
        ]
    },
    "coursework": {
        confidence: "expert",
        category: "personal",
        aliases: ["courses", "coursework", "classes", "subjects", "curriculum", "what did you study", "academic background"],
        description: "Relevant computer science coursework and academic background",
        projects: [
            {
                name: "Academic Curriculum",
                repo: "https://engineering.buffalo.edu/computer-science-engineering.html",
                implementations: [
                    {
                        file: "Core Courses",
                        description: "Intro Machine Learning, Systems Programming, Distributed Systems, Web App Development, Software Security"
                    },
                    {
                        file: "Additional Courses",
                        description: "Data Models & SQL, Algorithms & Complexity, Computer Organization"
                    }
                ]
            }
        ]
    },
    "languages spoken": {
        confidence: "expert",
        category: "personal",
        aliases: ["languages", "spoken languages", "multilingual", "what languages do you speak", "arabic", "french", "english", "moroccan"],
        description: "Multilingual speaker with native proficiency in multiple languages",
        projects: [
            {
                name: "Language Proficiency",
                repo: "",
                implementations: [
                    {
                        file: "Native Languages",
                        description: "Arabic (Native), French (Native), Moroccan Darija (Native)"
                    },
                    {
                        file: "Additional Languages",
                        description: "English (Fluent)"
                    }
                ]
            }
        ]
    },
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
                        file: "server/security/encryption.js",
                        lines: "15-67",
                        description: "AES-256-CBC encryption with bulletproof fallback mechanisms for financial data",
                        context: ["encryption", "data protection", "financial security"]
                    },
                    {
                        file: "server/middleware/security.js",
                        lines: "34-89",
                        description: "Real-time threat detection with brute force prevention and IP blocking",
                        context: ["threat detection", "brute force protection", "monitoring"]
                    }
                ]
            }
        ]
    },

    "HTTPS": {
        confidence: "expert",
        category: "security",
        aliases: ["https", "ssl", "tls", "secure", "certificates", "encryption", "security headers", "ssl certificate", "let's encrypt"],
        description: "Production HTTPS implementation with SSL/TLS certificates and security headers",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "docker-compose.yml",
                        lines: "15-25",
                        description: "Docker SSL configuration with Let's Encrypt certificate automation",
                        context: ["https", "ssl", "certificates", "docker", "deployment"]
                    },
                    {
                        file: "app.py",
                        lines: "50-80",
                        description: "Flask HTTPS enforcement with secure headers and SSL redirect configuration",
                        context: ["flask", "ssl", "https", "security"]
                    }
                ]
            },
            {
                name: "Smart Laundry Management",
                repo: "https://github.com/LaazAlae/modernlaundry",
                liveUrl: "https://modernlaundry.onrender.com/",
                implementations: [
                    {
                        file: "server.js",
                        lines: "67-89",
                        description: "Production HTTPS deployment with SSL certificate management and secure cookie policies",
                        context: ["https", "production", "security", "cookies"]
                    }
                ]
            }
        ]
    },

    "WebSocket": {
        confidence: "expert",
        category: "real-time",
        aliases: ["websocket", "websockets", "web socket", "ws", "socket connection", "real-time communication"],
        description: "Advanced WebSocket implementation for real-time bidirectional communication",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "app.py",
                        lines: "120-180",
                        description: "Socket.IO WebSocket implementation with Eventlet async processing for 1,000+ concurrent connections",
                        context: ["websocket", "real-time", "socket.io"]
                    }
                ]
            },
            {
                name: "Enterprise Expense Tracker",
                repo: "https://github.com/LaazAlae/expenseTracker",
                liveUrl: "https://expensetracking.up.railway.app/",
                implementations: [
                    {
                        file: "server/socket/index.js",
                        lines: "15-89",
                        description: "Real-time financial data synchronization using WebSocket with user isolation architecture",
                        context: ["websocket", "real-time sync", "financial data"]
                    }
                ]
            },
            {
                name: "Fabulous Nature Social",
                repo: "https://github.com/CSE370HCI/fabulous",
                liveUrl: "https://webdev.cse.buffalo.edu/hci/teams/fabulous/welcome",
                implementations: [
                    {
                        file: "src/components/Chat.jsx",
                        lines: "25-89",
                        description: "Real-time messaging with Socket.IO WebSocket integration for nature photography community",
                        context: ["websocket", "real-time chat", "social features"]
                    }
                ]
            }
        ]
    },

    "Real-time": {
        confidence: "expert",
        category: "architecture",
        aliases: ["real-time", "realtime", "live updates", "real time", "live data"],
        description: "Real-time communication systems with WebSocket and event-driven architecture",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "app.py",
                        lines: "200-250",
                        description: "Real-time post updates and user interactions without page refreshes",
                        context: ["real-time", "user interaction", "live updates"]
                    }
                ]
            }
        ]
    },

    // CRYPTOGRAPHY & HASHING
    "SHA-256": {
        confidence: "expert",
        category: "security",
        aliases: ["sha256", "sha-256", "hash", "hashing", "cryptographic hash"],
        description: "Advanced cryptographic hashing with SHA-256 for secure token generation and data integrity",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "app.py",
                        lines: "45-67",
                        description: "UUID4-based session token generation with SHA-256 database storage for secure authentication",
                        context: ["authentication", "session management", "security"]
                    }
                ]
            },
            {
                name: "Enterprise Expense Tracker",
                repo: "https://github.com/LaazAlae/expenseTracker",
                liveUrl: "https://expensetracking.up.railway.app/",
                implementations: [
                    {
                        file: "server/auth/tokens.js",
                        lines: "23-45",
                        description: "SHA-256 hash validation for secure authentication tokens and session management",
                        context: ["authentication", "tokens", "security"]
                    }
                ]
            }
        ]
    },

    "bcrypt": {
        confidence: "expert",
        category: "security",
        aliases: ["bcrypt", "password hashing", "salt", "rounds"],
        description: "Secure password hashing with bcrypt using 12 salt rounds for maximum security",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "app.py",
                        lines: "89-120",
                        description: "bcrypt password hashing with 12 salt rounds for maximum security in user authentication",
                        context: ["password security", "authentication", "encryption"]
                    }
                ]
            },
            {
                name: "Custom Web Server",
                repo: "https://github.com/LaazAlae/webserver",
                implementations: [
                    {
                        file: "auth/security.py",
                        lines: "25-45",
                        description: "Custom authentication with bcrypt hashing and password complexity validation",
                        context: ["authentication", "security", "manual implementation"]
                    }
                ]
            }
        ]
    },

    "JWT": {
        confidence: "advanced",
        category: "security",
        aliases: ["jwt", "json web token", "tokens", "bearer token"],
        description: "JSON Web Token implementation for secure authentication and session management",
        projects: [
            {
                name: "Enterprise Expense Tracker",
                repo: "https://github.com/LaazAlae/expenseTracker",
                liveUrl: "https://expensetracking.up.railway.app/",
                implementations: [
                    {
                        file: "server/middleware/auth.js",
                        lines: "15-45",
                        description: "JWT-based authentication with 30-day persistent session management",
                        context: ["authentication", "sessions", "middleware"]
                    }
                ]
            }
        ]
    },

    "CSRF": {
        confidence: "expert",
        category: "security",
        aliases: ["csrf", "xsrf", "cross-site request forgery", "csrf protection"],
        description: "Cross-Site Request Forgery protection with cryptographically secure token validation",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "app.py",
                        lines: "200-230",
                        description: "Cryptographically secure XSRF token generation using secrets module with database validation",
                        context: ["security", "csrf protection", "tokens"]
                    }
                ]
            }
        ]
    },

    "XSS": {
        confidence: "expert",
        category: "security",
        aliases: ["xss", "cross-site scripting", "html sanitization", "input validation"],
        description: "Cross-Site Scripting prevention with comprehensive input sanitization",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "app.py",
                        lines: "250-280",
                        description: "HTML entity escaping using Python's html module for XSS prevention",
                        context: ["security", "input sanitization", "xss prevention"]
                    }
                ]
            }
        ]
    },

    "Rate Limiting": {
        confidence: "expert",
        category: "security",
        aliases: ["rate limiting", "ddos protection", "throttling", "request limiting"],
        description: "Advanced rate limiting with sliding window algorithm and DDoS protection",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "app.py",
                        lines: "300-340",
                        description: "Sliding window rate limiting (50 requests per 10-second window) with automatic IP blocking",
                        context: ["security", "ddos protection", "rate limiting"]
                    }
                ]
            }
        ]
    },

    // PDF PROCESSING
    "PyMuPDF": {
        confidence: "expert",
        category: "document processing",
        aliases: ["pymupdf", "pdf processing", "text extraction", "document parsing"],
        description: "Advanced PDF processing with PyMuPDF for coordinate-based text extraction",
        projects: [
            {
                name: "AlaeAutomates Business Platform",
                repo: "https://github.com/LaazAlae/AlaeAutomates2.0",
                liveUrl: "https://alaeautomates.up.railway.app/",
                implementations: [
                    {
                        file: "app.py",
                        lines: "156-200",
                        description: "PyMuPDF coordinate-based text extraction with intelligent company name matching",
                        context: ["pdf processing", "text extraction", "automation"]
                    }
                ]
            }
        ]
    },

    "python-docx": {
        confidence: "expert",
        category: "document processing",
        aliases: ["python-docx", "word processing", "document automation", "office integration"],
        description: "Microsoft Word document automation with python-docx for professional document generation",
        projects: [
            {
                name: "Diplomatic Document Filler",
                repo: "https://github.com/LaazAlae/doc-filler",
                implementations: [
                    {
                        file: "main.py",
                        lines: "67-120",
                        description: "Advanced Microsoft Word manipulation with dynamic table generation and XML-level control",
                        context: ["document automation", "office integration", "diplomatic workflows"]
                    }
                ]
            }
        ]
    },

    // ASYNC PROCESSING
    "Eventlet": {
        confidence: "advanced",
        category: "async",
        aliases: ["eventlet", "async processing", "green threads", "concurrency"],
        description: "Eventlet async processing for high-performance concurrent operations",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "app.py",
                        lines: "15-30",
                        description: "Socket.IO real-time communication with Eventlet async processing",
                        context: ["async processing", "real-time", "performance"]
                    }
                ]
            }
        ]
    },

    // DESKTOP DEVELOPMENT
    "Kivy": {
        confidence: "advanced",
        category: "desktop",
        aliases: ["kivy", "desktop gui", "cross-platform", "python gui"],
        description: "Cross-platform desktop application development with Kivy framework",
        projects: [
            {
                name: "Diplomatic Document Filler",
                repo: "https://github.com/LaazAlae/doc-filler",
                implementations: [
                    {
                        file: "main.py",
                        lines: "25-89",
                        description: "Professional cross-platform GUI with responsive design and real-time validation",
                        context: ["desktop development", "gui", "cross-platform"]
                    }
                ]
            }
        ]
    },

    "PyInstaller": {
        confidence: "advanced",
        category: "deployment",
        aliases: ["pyinstaller", "executable", "packaging", "distribution"],
        description: "Application packaging with PyInstaller for standalone executable distribution",
        projects: [
            {
                name: "Diplomatic Document Filler",
                repo: "https://github.com/LaazAlae/doc-filler",
                implementations: [
                    {
                        file: "build.py",
                        lines: "10-35",
                        description: "PyInstaller packaging for Windows, macOS, and Linux with dependency bundling",
                        context: ["packaging", "distribution", "cross-platform"]
                    }
                ]
            }
        ]
    },

    // CONCURRENCY AND DISTRIBUTED SYSTEMS
    "Goroutines": {
        confidence: "expert",
        category: "concurrency",
        aliases: ["goroutines", "go concurrency", "channels", "concurrent programming"],
        description: "Advanced Go concurrency with goroutines and channels for distributed systems",
        projects: [
            {
                name: "Distributed Systems Protocol Suite",
                repo: "https://github.com/yourusername/distributed-systems",
                implementations: [
                    {
                        file: "mapreduce/worker.go",
                        lines: "45-89",
                        description: "Goroutine-based concurrent processing with channel communication for MapReduce",
                        context: ["concurrency", "distributed systems", "parallel processing"]
                    }
                ]
            }
        ]
    },

    "Raft Consensus": {
        confidence: "expert",
        category: "distributed systems",
        aliases: ["raft", "consensus", "leader election", "distributed consensus"],
        description: "Raft consensus protocol implementation with leader election and log replication",
        projects: [
            {
                name: "Distributed Systems Protocol Suite",
                repo: "https://github.com/yourusername/distributed-systems",
                implementations: [
                    {
                        file: "raft/leader_election.go",
                        lines: "67-134",
                        description: "Complete Raft leader election with RequestVote RPC and MIT 6.824 compliance",
                        context: ["distributed systems", "consensus", "fault tolerance"]
                    }
                ]
            }
        ]
    },

    "MapReduce": {
        confidence: "expert",
        category: "distributed systems",
        aliases: ["mapreduce", "parallel processing", "distributed computing", "big data"],
        description: "MapReduce framework implementation with fault tolerance and dynamic load balancing",
        projects: [
            {
                name: "Distributed Systems Protocol Suite",
                repo: "https://github.com/yourusername/distributed-systems",
                implementations: [
                    {
                        file: "mapreduce/master.go",
                        lines: "89-156",
                        description: "Distributed MapReduce with master-worker coordination and task reassignment",
                        context: ["distributed computing", "fault tolerance", "parallel processing"]
                    }
                ]
            }
        ]
    },

    // DATABASE ADVANCED FEATURES
    "Database Indexing": {
        confidence: "expert",
        category: "database",
        aliases: ["indexing", "b-tree", "query optimization", "performance tuning"],
        description: "Advanced database indexing strategies achieving 90%+ query performance improvement",
        projects: [
            {
                name: "Federal Budget Analysis Database",
                repo: "https://github.com/yourusername/budget-db",
                implementations: [
                    {
                        file: "indexes.sql",
                        lines: "12-45",
                        description: "Strategic B-tree indexing on foreign key relationships achieving 90%+ performance improvement",
                        context: ["database optimization", "indexing", "performance"]
                    }
                ]
            }
        ]
    },

    "Aggregation Pipelines": {
        confidence: "expert",
        category: "database",
        aliases: ["aggregation", "mongodb aggregation", "pipelines", "data processing"],
        description: "Complex MongoDB aggregation pipelines for advanced data analysis",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "app.py",
                        lines: "400-450",
                        description: "Complex aggregation pipelines for geographic matching and user analytics",
                        context: ["mongodb", "aggregation", "analytics"]
                    }
                ]
            }
        ]
    },

    "Database Triggers": {
        confidence: "advanced",
        category: "database",
        aliases: ["triggers", "database triggers", "stored procedures", "automation"],
        description: "Database triggers for automated validation and business logic enforcement",
        projects: [
            {
                name: "Federal Budget Analysis Database",
                repo: "https://github.com/yourusername/budget-db",
                implementations: [
                    {
                        file: "triggers.sql",
                        lines: "25-67",
                        description: "Budget overrun prevention triggers with real-time validation and logging",
                        context: ["database automation", "validation", "business logic"]
                    }
                ]
            }
        ]
    },

    // NGINX AND WEB SERVER
    "Nginx": {
        confidence: "advanced",
        category: "devops",
        aliases: ["nginx", "reverse proxy", "load balancer", "web server"],
        description: "Nginx reverse proxy configuration with SSL termination and load balancing",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "docker-compose.yml",
                        lines: "35-50",
                        description: "Nginx reverse proxy with SSL termination and gzip compression",
                        context: ["reverse proxy", "ssl", "performance"]
                    }
                ]
            }
        ]
    },

    "WSGI": {
        confidence: "advanced",
        category: "backend",
        aliases: ["wsgi", "web server gateway", "python web server", "production server"],
        description: "Production WSGI server configuration for Python web applications",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "app.py",
                        lines: "1-15",
                        description: "Python Flask web framework with production WSGI server configuration",
                        context: ["production deployment", "wsgi", "flask"]
                    }
                ]
            }
        ]
    },

    // EMAIL AND NOTIFICATIONS
    "Email Automation": {
        confidence: "advanced",
        category: "automation",
        aliases: ["email", "nodemailer", "smtp", "automated notifications"],
        description: "Automated email notification systems with SMTP integration",
        projects: [
            {
                name: "Smart Laundry Management",
                repo: "https://github.com/LaazAlae/modernlaundry",
                liveUrl: "https://modernlaundry.onrender.com/",
                implementations: [
                    {
                        file: "server.js",
                        lines: "89-130",
                        description: "Nodemailer integration with Gmail SMTP and HTML template rendering",
                        context: ["email automation", "notifications", "smtp"]
                    }
                ]
            }
        ]
    },

    // PROGRESSIVE WEB APPS
    "Service Workers": {
        confidence: "advanced",
        category: "frontend",
        aliases: ["service worker", "pwa", "offline", "caching"],
        description: "Progressive Web App implementation with Service Workers and offline functionality",
        projects: [
            {
                name: "Smart Laundry Management",
                repo: "https://github.com/LaazAlae/modernlaundry",
                liveUrl: "https://modernlaundry.onrender.com/",
                implementations: [
                    {
                        file: "public/sw.js",
                        lines: "15-89",
                        description: "Service Worker implementation with multi-tier caching and offline-first architecture",
                        context: ["pwa", "caching", "offline functionality"]
                    }
                ]
            }
        ]
    },

    "Web App Manifest": {
        confidence: "advanced",
        category: "frontend",
        aliases: ["manifest", "pwa manifest", "app installation", "native app"],
        description: "Web App Manifest for native app-like installation and user experience",
        projects: [
            {
                name: "Smart Laundry Management",
                repo: "https://github.com/LaazAlae/modernlaundry",
                liveUrl: "https://modernlaundry.onrender.com/",
                implementations: [
                    {
                        file: "public/manifest.json",
                        lines: "1-25",
                        description: "Web App Manifest with native app-like installation experience and icon configuration",
                        context: ["pwa", "app installation", "mobile"]
                    }
                ]
            }
        ]
    },

    // MASSIVE SKILLS ADDITION - ALL MISSING FROM SKILLS.JSON
    // Database Skills
    "BCNF": {
        confidence: "expert",
        category: "database",
        aliases: ["bcnf", "boyce-codd normal form", "normalization", "database design"],
        description: "Advanced database normalization with Boyce-Codd Normal Form for optimal schema design",
        projects: [
            {
                name: "Federal Budget Analysis Database",
                repo: "https://github.com/yourusername/budget-db",
                implementations: [
                    {
                        file: "schema/normalization.sql",
                        lines: "45-89",
                        description: "9-table PostgreSQL schema achieving Boyce-Codd Normal Form with comprehensive referential integrity",
                        context: ["database design", "normalization", "schema optimization"]
                    }
                ]
            }
        ]
    },

    "Database Design": {
        confidence: "expert",
        category: "database",
        aliases: ["database design", "schema design", "db design", "data modeling"],
        description: "Professional database design with normalization and performance optimization",
        projects: [
            {
                name: "Federal Budget Analysis Database",
                repo: "https://github.com/yourusername/budget-db",
                implementations: [
                    {
                        file: "schema/create.sql",
                        lines: "1-120",
                        description: "Sophisticated 9-table PostgreSQL schema with hierarchical government structure and 31,225+ records per table",
                        context: ["database design", "schema architecture", "enterprise data"]
                    }
                ]
            }
        ]
    },

    "Normalization": {
        confidence: "expert",
        category: "database",
        aliases: ["normalization", "database normalization", "normal forms", "data normalization"],
        description: "Advanced database normalization techniques including BCNF and functional dependencies",
        projects: [
            {
                name: "Federal Budget Analysis Database",
                repo: "https://github.com/yourusername/budget-db",
                implementations: [
                    {
                        file: "analysis/normalization.sql",
                        lines: "25-67",
                        description: "Comprehensive functional dependency analysis achieving BCNF with optimized table structures",
                        context: ["normalization", "functional dependencies", "optimization"]
                    }
                ]
            }
        ]
    },

    "Stored Procedures": {
        confidence: "advanced",
        category: "database",
        aliases: ["stored procedures", "procedures", "database procedures", "pl/sql"],
        description: "Advanced stored procedures for complex business logic and data validation",
        projects: [
            {
                name: "Federal Budget Analysis Database",
                repo: "https://github.com/yourusername/budget-db",
                implementations: [
                    {
                        file: "procedures/budget_procedures.sql",
                        lines: "89-145",
                        description: "Professional stored procedures (sp_insert_vendor, fn_program_budget) with comprehensive error handling",
                        context: ["stored procedures", "business logic", "data validation"]
                    }
                ]
            }
        ]
    },

    "ACID Compliance": {
        confidence: "advanced",
        category: "database",
        aliases: ["acid", "acid compliance", "transactions", "database transactions"],
        description: "ACID transaction compliance ensuring data consistency and reliability",
        projects: [
            {
                name: "Federal Budget Analysis Database",
                repo: "https://github.com/yourusername/budget-db",
                implementations: [
                    {
                        file: "transactions/acid_compliance.sql",
                        lines: "15-45",
                        description: "ACID-compliant transaction management with rollback procedures and consistency checks",
                        context: ["transactions", "data consistency", "reliability"]
                    }
                ]
            }
        ]
    },

    // Frontend Technologies
    "ES6+": {
        confidence: "expert",
        category: "frontend",
        aliases: ["es6", "es6+", "ecmascript 6", "modern javascript", "es2015"],
        description: "Modern JavaScript with ES6+ features including arrow functions, destructuring, and modules",
        projects: [
            {
                name: "Fabulous Nature Social",
                repo: "https://github.com/CSE370HCI/fabulous",
                liveUrl: "https://webdev.cse.buffalo.edu/hci/teams/fabulous/welcome",
                implementations: [
                    {
                        file: "src/components/UserProfile.jsx",
                        lines: "25-89",
                        description: "Modern ES6+ JavaScript with arrow functions, destructuring, and template literals",
                        context: ["modern javascript", "es6 features", "functional programming"]
                    }
                ]
            }
        ]
    },

    "CSS Grid": {
        confidence: "advanced",
        category: "frontend",
        aliases: ["css grid", "grid layout", "css grid layout", "grid"],
        description: "Advanced CSS Grid layout for complex responsive designs",
        projects: [
            {
                name: "Fabulous Nature Social",
                repo: "https://github.com/CSE370HCI/fabulous",
                liveUrl: "https://webdev.cse.buffalo.edu/hci/teams/fabulous/welcome",
                implementations: [
                    {
                        file: "src/styles/grid.css",
                        lines: "45-89",
                        description: "Professional CSS Grid implementation for responsive photo gallery layouts",
                        context: ["css grid", "responsive design", "layout"]
                    }
                ]
            }
        ]
    },

    "Flexbox": {
        confidence: "expert",
        category: "frontend",
        aliases: ["flexbox", "css flexbox", "flex layout", "flexible box"],
        description: "Expert-level Flexbox implementation for responsive and flexible layouts",
        projects: [
            {
                name: "Enterprise Expense Tracker",
                repo: "https://github.com/LaazAlae/expenseTracker",
                liveUrl: "https://expensetracking.up.railway.app/",
                implementations: [
                    {
                        file: "client/src/styles/layout.css",
                        lines: "67-123",
                        description: "Advanced Flexbox layouts for financial dashboard with responsive design patterns",
                        context: ["flexbox", "responsive design", "dashboard layout"]
                    }
                ]
            }
        ]
    },

    // Cloud and DevOps
    "Railway": {
        confidence: "expert",
        category: "cloud",
        aliases: ["railway", "railway.app", "cloud deployment", "hosting"],
        description: "Production cloud deployment and hosting with Railway platform",
        projects: [
            {
                name: "AlaeAutomates Business Platform",
                repo: "https://github.com/LaazAlae/AlaeAutomates2.0",
                liveUrl: "https://alaeautomates.up.railway.app/",
                implementations: [
                    {
                        file: "railway.json",
                        lines: "1-25",
                        description: "Railway deployment configuration with environment variables and build optimization",
                        context: ["cloud deployment", "railway", "production hosting"]
                    }
                ]
            }
        ]
    },

    "Render": {
        confidence: "advanced",
        category: "cloud",
        aliases: ["render", "render.com", "cloud hosting", "deployment"],
        description: "Cloud deployment with Render platform for production applications",
        projects: [
            {
                name: "Smart Laundry Management",
                repo: "https://github.com/LaazAlae/modernlaundry",
                liveUrl: "https://modernlaundry.onrender.com/",
                implementations: [
                    {
                        file: "render.yaml",
                        lines: "10-35",
                        description: "Render deployment configuration with Node.js runtime and environment setup",
                        context: ["cloud deployment", "render", "node.js hosting"]
                    }
                ]
            }
        ]
    },

    "Netlify": {
        confidence: "advanced",
        category: "cloud",
        aliases: ["netlify", "static hosting", "jamstack", "frontend deployment"],
        description: "Static site deployment and hosting with Netlify for frontend applications",
        projects: [
            {
                name: "Smart Laundry Management",
                repo: "https://github.com/LaazAlae/modernlaundry",
                liveUrl: "https://laundryminutes.netlify.app/",
                implementations: [
                    {
                        file: "netlify.toml",
                        lines: "5-25",
                        description: "Netlify deployment configuration for NFC demo with build optimization",
                        context: ["static hosting", "netlify", "frontend deployment"]
                    }
                ]
            }
        ]
    },

    // Advanced Backend Technologies
    "WSGI": {
        confidence: "expert",
        category: "backend",
        aliases: ["wsgi", "web server gateway interface", "python wsgi", "gunicorn"],
        description: "Production WSGI server implementation for Python web applications",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "app.py",
                        lines: "1-25",
                        description: "Python Flask application with production WSGI server configuration and Docker deployment",
                        context: ["wsgi", "production deployment", "python web server"]
                    }
                ]
            }
        ]
    },

    "Socket.IO": {
        confidence: "expert",
        category: "real-time",
        aliases: ["socket.io", "socketio", "socket io", "real-time sockets"],
        description: "Socket.IO implementation for real-time bidirectional event-based communication",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "app.py",
                        lines: "180-250",
                        description: "Socket.IO server with Eventlet async processing for real-time rideshare updates",
                        context: ["socket.io", "real-time", "event-driven"]
                    }
                ]
            },
            {
                name: "Enterprise Expense Tracker",
                repo: "https://github.com/LaazAlae/expenseTracker",
                liveUrl: "https://expensetracking.up.railway.app/",
                implementations: [
                    {
                        file: "server.js",
                        lines: "89-145",
                        description: "Real-time financial data synchronization with Socket.IO and user isolation",
                        context: ["socket.io", "financial systems", "real-time sync"]
                    }
                ]
            }
        ]
    },

    "HTTP/1.1": {
        confidence: "expert",
        category: "network",
        aliases: ["http/1.1", "http 1.1", "http protocol", "hypertext transfer protocol"],
        description: "HTTP/1.1 protocol implementation with complete request/response handling",
        projects: [
            {
                name: "Custom Web Server",
                repo: "https://github.com/LaazAlae/webserver",
                implementations: [
                    {
                        file: "http/parser.py",
                        lines: "45-120",
                        description: "Complete HTTP/1.1 protocol implementation with request parsing and response generation",
                        context: ["http protocol", "web server", "network programming"]
                    }
                ]
            }
        ]
    },

    // Testing and Quality Assurance
    "Unit Testing": {
        confidence: "advanced",
        category: "testing",
        aliases: ["unit testing", "unit tests", "testing", "automated testing"],
        description: "Comprehensive unit testing with automated test suites and coverage analysis",
        projects: [
            {
                name: "Distributed Systems Protocol Suite",
                repo: "https://github.com/yourusername/distributed-systems",
                implementations: [
                    {
                        file: "tests/raft_test.go",
                        lines: "25-89",
                        description: "Comprehensive unit tests for Raft consensus with fault injection and edge case coverage",
                        context: ["unit testing", "go testing", "distributed systems testing"]
                    }
                ]
            }
        ]
    },

    "Integration Testing": {
        confidence: "advanced",
        category: "testing",
        aliases: ["integration testing", "integration tests", "system testing"],
        description: "End-to-end integration testing with real-world scenario validation",
        projects: [
            {
                name: "Enterprise Expense Tracker",
                repo: "https://github.com/LaazAlae/expenseTracker",
                liveUrl: "https://expensetracking.up.railway.app/",
                implementations: [
                    {
                        file: "tests/integration/auth.test.js",
                        lines: "45-123",
                        description: "Integration testing for authentication flow with database and encryption validation",
                        context: ["integration testing", "authentication testing", "end-to-end"]
                    }
                ]
            }
        ]
    },

    // Performance and Optimization
    "Load Balancing": {
        confidence: "advanced",
        category: "devops",
        aliases: ["load balancing", "load balancer", "traffic distribution", "scaling"],
        description: "Load balancing implementation for high-availability and performance scaling",
        projects: [
            {
                name: "FriendsGoTogether Platform",
                repo: "https://github.com/LaazAlae/ShiftSpace",
                liveUrl: "https://friendsgotogether.com",
                implementations: [
                    {
                        file: "docker-compose.yml",
                        lines: "45-67",
                        description: "Nginx load balancing configuration with multiple Flask instances and health checks",
                        context: ["load balancing", "nginx", "high availability"]
                    }
                ]
            }
        ]
    },

    "Performance Monitoring": {
        confidence: "advanced",
        category: "monitoring",
        aliases: ["performance monitoring", "monitoring", "metrics", "observability"],
        description: "Application performance monitoring with metrics collection and alerting",
        projects: [
            {
                name: "Enterprise Expense Tracker",
                repo: "https://github.com/LaazAlae/expenseTracker",
                liveUrl: "https://expensetracking.up.railway.app/",
                implementations: [
                    {
                        file: "server/monitoring/metrics.js",
                        lines: "34-89",
                        description: "Real-time performance monitoring with response time tracking and resource usage metrics",
                        context: ["performance monitoring", "metrics", "observability"]
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
     * AI-enhanced query processing with intelligent routing
     */
    async processQuery(query) {
        SkillSearchDebug.group(`Processing query: "${query}"`);

        // Step 1: AI determines intent and routes appropriately
        const routingResult = await this.routeQuery(query);
        SkillSearchDebug.log('AI routing result', routingResult);

        // If it's a conversation or direct response, return immediately
        if (routingResult.type === 'conversation' || routingResult.type === 'direct') {
            SkillSearchDebug.groupEnd();
            return {
                originalQuery: query,
                normalizedQuery: query,
                matches: [],
                context: [],
                hasResults: false,
                conversationResponse: routingResult.response,
                responseType: routingResult.type
            };
        }

        // If it's a search, proceed with normal search logic
        const searchTerms = routingResult.query;
        const normalized = searchTerms.toLowerCase()
            .replace(/[?!.,;:]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        const matches = [];
        const contextKeywords = this.extractContext(normalized);

        // Find skill matches using AI-enhanced search terms
        for (const [skillName, skillData] of Object.entries(skillDatabase)) {
            const matchScore = this.calculateMatchScore(normalized, skillName, skillData);

            if (matchScore > 100) { // Minimum threshold to prevent weak matches
                matches.push({
                    skill: skillName,
                    data: skillData,
                    score: matchScore,
                    context: contextKeywords,
                    originalQuery: query // Keep original for AI formatting
                });

                SkillSearchDebug.log(`Match found: ${skillName}`, { score: matchScore, query: normalized });
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
     * Calculate relevance score for skill matching - ENHANCED PRECISION
     */
    calculateMatchScore(query, skillName, skillData) {
        let score = 0;
        const queryWords = query.split(' ').filter(word => word.length > 2);
        const normalizedQuery = query.toLowerCase();
        const normalizedSkillName = skillName.toLowerCase();

        // EXACT skill name match (highest priority)
        if (normalizedQuery.includes(normalizedSkillName)) {
            score += 1000; // Much higher score for exact matches
        }

        // Direct alias exact matching (very high priority)
        for (const alias of skillData.aliases) {
            if (normalizedQuery.includes(alias.toLowerCase())) {
                score += 800;
            }
        }

        // Intent-based matching - check for specific technology mentions
        const intentKeywords = this.extractTechnologyIntent(normalizedQuery);
        if (intentKeywords.length > 0) {
            for (const keyword of intentKeywords) {
                if (normalizedSkillName.includes(keyword) ||
                    skillData.aliases.some(alias => alias.toLowerCase().includes(keyword))) {
                    score += 500; // High score for technology intent
                }
            }
        }

        // Word boundary matching (more precise than substring)
        queryWords.forEach(word => {
            const wordLower = word.toLowerCase();

            // Exact word match in skill name
            if (normalizedSkillName.split(/[\s-_]/).includes(wordLower)) {
                score += 200;
            }

            // Exact word match in aliases
            skillData.aliases.forEach(alias => {
                if (alias.toLowerCase().split(/[\s-_]/).includes(wordLower)) {
                    score += 150;
                }
            });

            // Partial matching (reduced importance)
            if (normalizedSkillName.includes(wordLower) && wordLower.length > 3) {
                score += 50;
            }
        });

        // Context matching (only if other matches exist)
        if (score > 0) {
            skillData.projects.forEach(project => {
                if (project.implementations && Array.isArray(project.implementations)) {
                    project.implementations.forEach(impl => {
                        if (impl.context && Array.isArray(impl.context)) {
                            impl.context.forEach(ctx => {
                                if (normalizedQuery.includes(ctx.toLowerCase())) {
                                    score += 25; // Reduced context importance
                                }
                            });
                        }
                    });
                }
            });
        }

        // Penalty for irrelevant matches
        if (score < 100 && this.isIrrelevantMatch(normalizedQuery, normalizedSkillName, skillData)) {
            score = 0; // Zero out irrelevant matches
        }

        return score;
    }

    /**
     * Extract technology intent from query
     */
    extractTechnologyIntent(query) {
        const techIntents = {
            'websocket': ['websocket', 'socket', 'real-time', 'realtime'],
            'database': ['database', 'db', 'sql', 'mongodb', 'postgres'],
            'frontend': ['frontend', 'ui', 'interface', 'react', 'css', 'html'],
            'backend': ['backend', 'server', 'api', 'node', 'express', 'flask'],
            'security': ['security', 'auth', 'encrypt', 'secure', 'ssl', 'https'],
            'deployment': ['deploy', 'hosting', 'cloud', 'docker', 'server'],
            'testing': ['test', 'testing', 'unit', 'integration'],
            'mobile': ['mobile', 'nfc', 'app', 'ios', 'android']
        };

        const foundIntents = [];
        for (const [category, keywords] of Object.entries(techIntents)) {
            if (keywords.some(keyword => query.includes(keyword))) {
                foundIntents.push(...keywords);
            }
        }

        return foundIntents;
    }

    /**
     * Check if a match is irrelevant based on query context
     */
    isIrrelevantMatch(query, skillName, skillData) {
        // Define incompatible technology pairs
        const incompatiblePairs = [
            { query: ['websocket', 'socket', 'real-time'], incompatible: ['css', 'grid', 'flex', 'style', 'layout'] },
            { query: ['database', 'sql'], incompatible: ['css', 'html', 'frontend', 'ui'] },
            { query: ['frontend', 'ui'], incompatible: ['database', 'sql', 'server'] },
            { query: ['backend', 'server'], incompatible: ['css', 'html', 'frontend'] },
            { query: ['security', 'auth'], incompatible: ['css', 'layout', 'ui'] },
            { query: ['mobile', 'nfc'], incompatible: ['database', 'sql', 'server'] }
        ];

        for (const pair of incompatiblePairs) {
            const hasQueryTerm = pair.query.some(term => query.includes(term));
            const hasIncompatibleSkill = pair.incompatible.some(term =>
                skillName.includes(term) ||
                skillData.aliases.some(alias => alias.toLowerCase().includes(term)) ||
                skillData.category.includes(term)
            );

            if (hasQueryTerm && hasIncompatibleSkill) {
                return true; // This is an irrelevant match
            }
        }

        return false;
    }

    /**
     * AI-powered query router - determines intent and handles appropriately
     */
    async routeQuery(userQuery) {
        try {
            // Check daily usage limit first
            const dailyUsage = this.getAIDailyUsage();
            if (dailyUsage >= 100) {
                SkillSearchDebug.warn('AI daily limit reached, using fallback');
                return { type: 'search', query: this.fallbackQueryTranslation(userQuery) };
            }

            // Check if API key is configured
            const apiKey = window.SEARCH_CONFIG?.OPENAI_API_KEY;
            if (!apiKey || apiKey === 'YOUR_OPENAI_API_KEY') {
                SkillSearchDebug.warn('No API key configured, using fallback');
                return { type: 'search', query: this.fallbackQueryTranslation(userQuery) };
            }

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${window.SEARCH_CONFIG?.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY'}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [{
                        role: "system",
                        content: `You are Alae's intelligent portfolio assistant. You have access to his complete profile and must respond accurately based ONLY on what he actually has.

ALAE'S ACTUAL PROFILE:
- Programming: Python (expert), JavaScript (expert), Go (advanced)
- Education: Computer Science BS at University at Buffalo (2021-2025)
- Work: Cash Application Specialist & Process Automation Developer at United Corporate Services
- Projects: ShiftSpace (Python/Flask), AlaeAutomates (Python), ModernLaundry (Node.js), ExpenseTracker (JavaScript)
- Courses: Machine Learning, Systems Programming, Distributed Systems, Web Development, Software Security
- Languages: Arabic (native), French (native), English (fluent), Moroccan Darija (native)
- Technologies: Flask, React, WebSockets, Docker, MongoDB, REST APIs

RESPONSE RULES:
1. General questions about skills/abilities → List actual skills from above
2. Specific tech questions → Search if he has it, honest "no" if he doesn't
3. Personal questions (education/work) → Direct factual answer
4. Casual/inappropriate → Conversational redirect
5. NEVER make up skills he doesn't have

Examples:
"What skills do you have?" → {"type": "direct", "response": "I'm skilled in Python, JavaScript, Go, Flask, React, WebSockets, Docker, and MongoDB. I also have experience with machine learning, distributed systems, and web security."}
"Do you know Python?" → {"type": "search", "query": "python"}
"Where did you go to school?" → {"type": "direct", "response": "I'm studying Computer Science at University at Buffalo, graduating in 2025."}
"Hello" → {"type": "conversation", "response": "Hi! I'm here to help you learn about Alae's skills and experience."}`
                    }, {
                        role: "user",
                        content: userQuery
                    }],
                    max_tokens: 100,
                    temperature: 0.3
                })
            });

            if (response.ok) {
                const result = await response.json();
                let aiContent = result.choices[0].message.content.trim();

                // Clean up the response to ensure valid JSON
                if (aiContent.startsWith('```json')) {
                    aiContent = aiContent.replace(/```json\s*/, '').replace(/```\s*$/, '');
                }

                console.log('Raw AI response:', aiContent);

                try {
                    const aiResult = JSON.parse(aiContent);
                    this.incrementAIDailyUsage();
                    SkillSearchDebug.log('AI Query Routing', { original: userQuery, routed: aiResult });
                    return aiResult;
                } catch (parseError) {
                    console.error('JSON parsing failed:', parseError, 'Content:', aiContent);
                    throw parseError;
                }
            } else {
                throw new Error('API request failed');
            }
        } catch (error) {
            SkillSearchDebug.error('AI routing failed, using fallback', error);
            console.error('Full routing error:', error);

            // For common conversational queries, handle locally
            const lowerQuery = userQuery.toLowerCase();

            if (['hello', 'hi', 'hey'].some(q => lowerQuery.includes(q))) {
                return {
                    type: 'conversation',
                    response: "Hi there! Feel free to ask me about Alae's skills and experience."
                };
            }

            if (['how are you', 'what\'s up', 'how\'s it going'].some(q => lowerQuery.includes(q))) {
                return {
                    type: 'conversation',
                    response: "I'm doing great! I'm here to help you explore Alae's portfolio. What would you like to know?"
                };
            }

            // Handle inappropriate/joke queries
            const inappropriateKeywords = ['sex', 'nsfw', 'adult', 'inappropriate'];
            if (inappropriateKeywords.some(keyword => lowerQuery.includes(keyword))) {
                return {
                    type: 'conversation',
                    response: "I'm here to help you learn about Alae's professional skills and projects. What would you like to know about his programming experience?"
                };
            }

            return { type: 'search', query: this.fallbackQueryTranslation(userQuery) };
        }
    }

    /**
     * Fallback query translation when AI is unavailable
     */
    fallbackQueryTranslation(query) {
        const normalized = query.toLowerCase();

        // Direct skill detection patterns
        const skillPatterns = {
            'python': ['python'],
            'javascript': ['javascript', 'js'],
            'react': ['react'],
            'c++': ['c\\+\\+', 'cpp'],
            'c': ['\\bc\\b'],
            'java': ['\\bjava\\b'],
            'scala': ['scala'],
            'golang': ['golang', '\\bgo\\b'],
            'node': ['node', 'nodejs'],
            'flask': ['flask'],
            'mongodb': ['mongodb', 'mongo'],
            'docker': ['docker'],
            'education': ['school', 'university', 'college', 'education', 'study', 'graduate'],
            'work': ['work', 'job', 'employment', 'career'],
            'contact': ['contact', 'email', 'phone', 'reach']
        };

        // Find the best matching skill
        for (const [skill, patterns] of Object.entries(skillPatterns)) {
            for (const pattern of patterns) {
                const regex = new RegExp(pattern, 'i');
                if (regex.test(normalized)) {
                    return skill;
                }
            }
        }

        // If no specific skill found, extract main keywords
        const keywords = normalized
            .replace(/[?!.,;]/g, ' ')
            .replace(/\b(do you know|can you|have you|are you|where did you|what is your|tell me about|experience with)\b/g, '')
            .split(' ')
            .filter(word => word.length > 2)
            .join(' ')
            .trim();

        return keywords || normalized;
    }

    /**
     * AI usage tracking for rate limiting
     */
    getAIDailyUsage() {
        const today = new Date().toDateString();
        const stored = localStorage.getItem('ai_usage_' + today);
        return stored ? parseInt(stored) : 0;
    }

    incrementAIDailyUsage() {
        const today = new Date().toDateString();
        const current = this.getAIDailyUsage();
        localStorage.setItem('ai_usage_' + today, (current + 1).toString());
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
        // Fallback templates (used when AI is unavailable)
        this.fallbackTemplates = {
            confident: [
                "Absolutely! I've got extensive experience with {skill}. I've implemented it across multiple production projects, and I'd love to show you exactly where you can see it in action:",
                "Yes! {skill} is definitely one of my strong areas. I've built several systems with it, and the implementations are quite robust. Here's what I've created:"
            ],
            moderate: [
                "Yes, I've worked extensively with {skill}! I've implemented it in several projects and have some good examples to share:",
                "Sure thing! I have solid, practical experience with {skill}. Let me show you where you can see it in action:"
            ],
            basic: [
                "I do have experience with {skill}! Here's where I've implemented it:",
                "Yes, I've worked with {skill} in a few projects. Let me show you:"
            ]
        };

        this.noResultsTemplates = [
            "I don't have direct experience with that specific technology, but here are some related skills I do have:",
            "That's not in my current skillset, but you might be interested in these related technologies:",
            "I haven't worked with that particular tool, but here are some similar technologies I've used:"
        ];
    }

    /**
     * AI-powered response formatting for human-like answers
     */
    async formatResponseWithAI(originalQuery, matches) {
        try {
            // Check daily usage limit
            const dailyUsage = this.getAIDailyUsage();
            if (dailyUsage >= 100) {
                SkillSearchDebug.warn('AI daily limit reached for responses, using fallback');
                return this.generateFallbackResponse(matches[0]);
            }

            // Prepare context about the skills and projects
            const skillsContext = matches.map(match => {
                const projects = match.data.projects.slice(0, 2); // Top 2 projects
                return `${match.skill}: ${match.data.description}. Projects: ${projects.map(p => `${p.name} (${p.repo})`).join(', ')}`;
            }).join('\n');

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${window.SEARCH_CONFIG?.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY'}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [{
                        role: "system",
                        content: `You are Alae's portfolio assistant. Answer questions about his skills based ONLY on the provided context. If a skill isn't in the context, say you don't have experience with it. Keep responses SHORT (1-2 sentences max).

Available Skills/Projects:
${skillsContext}

STRICT RULES:
- ONLY mention skills/projects from the context above
- If skill not in context: "I don't have experience with [skill], but I do work with [related skills from context]"
- If skill IS in context: "Yes, I have experience with [skill]. You can see it in [specific project from context]"
- Keep responses under 100 characters for titles
- NO hallucination - stick to facts only`
                    }, {
                        role: "user",
                        content: originalQuery
                    }],
                    max_tokens: 50,
                    temperature: 0.1
                })
            });

            if (response.ok) {
                const result = await response.json();
                const aiResponse = result.choices[0].message.content.trim();
                this.incrementAIDailyUsage();
                SkillSearchDebug.log('AI Response Generated', { original: originalQuery, aiResponse });
                return aiResponse;
            } else {
                throw new Error('API request failed');
            }
        } catch (error) {
            SkillSearchDebug.error('AI response formatting failed, using fallback', error);
            return this.generateFallbackResponse(matches[0]);
        }
    }

    /**
     * Get AI daily usage (shared method)
     */
    getAIDailyUsage() {
        const today = new Date().toDateString();
        const stored = localStorage.getItem('ai_usage_' + today);
        return stored ? parseInt(stored) : 0;
    }

    /**
     * Increment AI daily usage (shared method)
     */
    incrementAIDailyUsage() {
        const today = new Date().toDateString();
        const current = this.getAIDailyUsage();
        localStorage.setItem('ai_usage_' + today, (current + 1).toString());
    }

    /**
     * Generate fallback response when AI is unavailable
     */
    generateFallbackResponse(match) {
        const confidence = this.getConfidenceLevel(match.data.confidence);
        const templates = this.fallbackTemplates[confidence];
        const template = templates[Math.floor(Math.random() * templates.length)];
        return template.replace('{skill}', match.skill);
    }

    /**
     * AI formatting for "no results" responses
     */
    async formatNoResultsWithAI(originalQuery) {
        try {
            // Get some actual skills to suggest instead
            const actualSkills = Object.keys(skillDatabase).slice(0, 5);

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${window.SEARCH_CONFIG?.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY'}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [{
                        role: "system",
                        content: `You are Alae's portfolio assistant. Someone asked about a skill he doesn't have. Be honest and suggest related skills he does have.

Alae's actual skills: ${actualSkills.join(', ')}

Response format: "I don't have experience with [skill], but I do work with [related skills from list above]"`
                    }, {
                        role: "user",
                        content: originalQuery
                    }],
                    max_tokens: 30,
                    temperature: 0.1
                })
            });

            if (response.ok) {
                const result = await response.json();
                this.incrementAIDailyUsage();
                return result.choices[0].message.content.trim();
            } else {
                throw new Error('API request failed');
            }
        } catch (error) {
            // Extract the skill being asked about
            const skillMatch = originalQuery.toLowerCase().match(/\b(python|javascript|react|scala|c\+\+|cpp|java|golang|go|node|flask|docker|vue|angular)\b/);
            const skillAsked = skillMatch ? skillMatch[1] : 'that technology';
            return `I don't have experience with ${skillAsked}, but I do work with Python, JavaScript, and Go`;
        }
    }

    /**
     * Generate natural language response
     */
    async generateResponse(queryResult) {
        SkillSearchDebug.group('Generating AI-enhanced response');
        SkillSearchDebug.log('Query result', queryResult);

        // Handle conversation and direct responses first
        if (queryResult.conversationResponse) {
            const responseType = queryResult.responseType === 'direct' ? 'direct' : 'conversation';
            return {
                type: responseType,
                query: queryResult.originalQuery,
                content: queryResult.conversationResponse,
                matches: [],
                metadata: { aiEnhanced: true, conversational: true }
            };
        }

        if (!queryResult.hasResults) {
            // Use AI for "no results" responses too
            const noResultsResponse = await this.formatNoResultsWithAI(queryResult.originalQuery);
            return {
                type: 'no_results',
                query: queryResult.originalQuery,
                content: noResultsResponse,
                matches: [],
                metadata: { aiEnhanced: true }
            };
        }

        // Use AI to generate human-like response
        const aiResponse = await this.formatResponseWithAI(
            queryResult.originalQuery,
            queryResult.matches
        );

        const finalResponse = {
            type: 'success',
            query: queryResult.originalQuery,
            content: aiResponse, // AI-generated human-like response
            matches: queryResult.matches,
            metadata: {
                totalMatches: queryResult.matches.length,
                context: queryResult.context,
                processingTime: Date.now(),
                aiEnhanced: true
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
        const templates = this.conversationalTemplates[confidence] || this.conversationalTemplates.moderate;
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

            // Process the query with AI enhancement
            const queryResult = await this.processor.processQuery(query);

            // Generate AI-enhanced response
            const response = await this.responseGenerator.generateResponse(queryResult);

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