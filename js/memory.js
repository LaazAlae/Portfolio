/**
 * ALAE'S COMPLETE DIGITAL MEMORY - UPDATED WITH ALL PROJECT AND RESUME DATA
 * This is the ONLY source of truth - AI reads from here ONLY
 */

const AlaeMemory = {
    // Personal Identity
    identity: {
        name: "Alae Laaziri",
        title: "Software Developer | Full Stack Engineer",
        location: "68 Mohawk Rd, Yonkers, NY 10710",
        phone: "646-251-8065",
        email: "laazalae5@gmail.com",
        linkedin: "linkedin.com/in/alae-laaziri/",
        github: "github.com/LaazAlae",
        summary: "Passionate software developer with expertise in building scalable web applications and automation solutions"
    },

    // Education - UPDATED WITH CORRECT GRADUATION DATE
    education: {
        degree: "Bachelor of Science in Computer Science",
        university: "University at Buffalo–SUNY",
        duration: "August 2021 – May 2025",
        location: "Buffalo, NY",
        status: "GRADUATED MAY 2025",
        graduation_date: "May 2025",
        courses: [
            "Intro Machine Learning",
            "Systems Programming",
            "Distributed Systems",
            "Web App Development",
            "Software Security",
            "Data Models & SQL",
            "Algorithms & Complexity",
            "Computer Organization",
            "Human-Computer Interaction (CSE370)",
            "Database Systems (CSE 4/560)"
        ]
    },

    // Work Experience
    work: {
        current: {
            title: "Cash Application Specialist & Process Automation Developer",
            company: "United Corporate Services Inc.",
            location: "Yonkers, NY",
            duration: "Summer 2024, June 2025 – Present",
            type: "Current position",
            responsibilities: [
                "Developed comprehensive automation solutions using JavaScript, HTML, and Excel VBA that streamlined batch creation workflows for credit card and check payment processing across the organization",
                "Built AlaeAutomates web platform using Python and Flask featuring a statement processor that automatically categorizes 1000+ page PDFs and an invoice separator tool for intelligent document splitting by invoice number",
                "Created end-to-end payment automation tools that handle form filling, posting, and application processes while maintaining data accuracy and eliminating manual data entry errors",
                "Designed interactive employee training website prototype with quiz-based modules at executive request to address company-wide onboarding challenges, reducing reliance on manual training processes",
                "Implemented Excel macros and automated workflows that transformed multi-day manual document processing tasks into automated processes completed in seconds"
            ]
        }
    },

    // Programming Skills - MASSIVELY EXPANDED
    programming_skills: {
        python: {
            level: "Expert",
            years_experience: 4,
            confidence: 95,
            use_cases: ["Web development", "Automation", "Data processing", "APIs", "Document processing", "Distributed systems"],
            frameworks: ["Flask", "PyMuPDF", "Kivy"],
            projects: ["AlaeAutomates", "ShiftSpace", "FriendsGoTogether", "Document automation tools", "Custom Web Server", "Distributed Systems Protocol Suite", "Diplomatic Document Filler"]
        },
        javascript: {
            level: "Expert",
            years_experience: 3,
            confidence: 90,
            use_cases: ["Frontend development", "APIs", "DOM manipulation", "Real-time communication", "Automation"],
            frameworks: ["React", "Node.js", "Express.js", "Socket.IO", "Material-UI"],
            projects: ["ModernLaundry", "ExpenseTracker", "Portfolio website", "Fabulous Nature Social", "AlaeAutomates automation engine"]
        },
        java: {
            level: "Intermediate",
            years_experience: 2,
            confidence: 75,
            use_cases: ["Academic projects", "Object-oriented programming"]
        },
        c: {
            level: "Intermediate",
            years_experience: 2,
            confidence: 70,
            use_cases: ["Systems programming", "Academic coursework"]
        },
        golang: {
            level: "Advanced",
            years_experience: 1,
            confidence: 85,
            use_cases: ["Distributed systems", "Concurrent programming", "Consensus algorithms"],
            projects: ["Distributed Systems Protocol Suite", "Raft Consensus Implementation", "MapReduce Framework"]
        },
        scala: {
            level: "Beginner",
            years_experience: 0.5,
            confidence: 40,
            use_cases: ["Functional programming", "Academic exposure"]
        },
        html_css: {
            level: "Expert",
            years_experience: 3,
            confidence: 90,
            use_cases: ["Responsive design", "Modern layouts", "Progressive Web Apps"],
            technologies: ["CSS Grid", "Flexbox", "Material Design", "Responsive design"]
        },
        sql: {
            level: "Advanced",
            years_experience: 2,
            confidence: 80,
            use_cases: ["Database design", "Complex queries", "Performance optimization"],
            databases: ["PostgreSQL", "MongoDB", "SQLite"]
        }
    },

    // Technologies & Tools - MASSIVELY EXPANDED
    technologies: {
        web_frameworks: {
            flask: {
                experience: "Expert",
                projects: ["AlaeAutomates", "ShiftSpace", "FriendsGoTogether", "Naturrest"],
                use_cases: ["REST APIs", "Web applications", "Backend services", "Real-time applications"]
            },
            react: {
                experience: "Advanced",
                projects: ["ModernLaundry", "Portfolio components", "Fabulous Nature Social", "ExpenseTracker"],
                use_cases: ["Single page applications", "Component architecture", "Real-time UIs"]
            },
            express: {
                experience: "Advanced",
                projects: ["ExpenseTracker", "AlaeAutomates Modern API"],
                use_cases: ["API development", "Security middleware", "Real-time servers"]
            }
        },
        databases: {
            mongodb: {
                experience: "Advanced",
                projects: ["FriendsGoTogether", "ModernLaundry", "Custom Web Server"],
                use_cases: ["Document storage", "Web applications", "Real-time data"]
            },
            postgresql: {
                experience: "Advanced",
                projects: ["Federal Budget Analysis Database"],
                use_cases: ["Complex queries", "Government data analysis", "ACID compliance"]
            },
            sqlite: {
                experience: "Intermediate",
                projects: ["AlaeAutomates"],
                use_cases: ["Local storage", "Company memory management", "Thread-safe operations"]
            }
        },
        real_time: {
            websockets: {
                experience: "Expert",
                projects: ["ShiftSpace", "FriendsGoTogether", "Custom Web Server", "ExpenseTracker"],
                use_cases: ["Real-time communication", "Live updates", "Chat systems"]
            },
            socketio: {
                experience: "Expert",
                projects: ["FriendsGoTogether", "ExpenseTracker", "Fabulous Nature Social"],
                use_cases: ["Real-time broadcasting", "User collaboration", "Live notifications"]
            }
        },
        cloud_deployment: {
            docker: {
                experience: "Advanced",
                projects: ["FriendsGoTogether", "ModernLaundry", "AlaeAutomates"],
                use_cases: ["Application containerization", "Production deployment", "Multi-service orchestration"]
            },
            railway: {
                experience: "Advanced",
                projects: ["AlaeAutomates", "ExpenseTracker"],
                use_cases: ["Production hosting", "Automated deployment", "Environment management"]
            },
            digital_ocean: {
                experience: "Intermediate",
                projects: ["FriendsGoTogether"],
                use_cases: ["Cloud hosting", "SSL management", "Production infrastructure"]
            },
            netlify: {
                experience: "Intermediate",
                projects: ["ModernLaundry NFC Demo"],
                use_cases: ["Static hosting", "Continuous deployment", "CDN distribution"]
            }
        },
        security: {
            authentication: {
                experience: "Advanced",
                technologies: ["bcrypt", "JWT", "OAuth 2.0", "2FA", "Session management"],
                projects: ["FriendsGoTogether", "ExpenseTracker", "Custom Web Server"]
            },
            encryption: {
                experience: "Advanced",
                technologies: ["AES-256", "SHA-256", "HTTPS", "SSL/TLS"],
                projects: ["ExpenseTracker", "FriendsGoTogether"]
            },
            security_headers: {
                experience: "Advanced",
                technologies: ["CSP", "CORS", "Helmet", "Rate limiting", "XSS protection"],
                projects: ["All production applications"]
            }
        },
        emerging_tech: {
            nfc: {
                experience: "Intermediate",
                projects: ["ModernLaundry NFC Demo"],
                use_cases: ["Web NFC API", "Tag scanning", "Instant interactions"]
            },
            webrtc: {
                experience: "Beginner",
                projects: ["Custom Web Server"],
                use_cases: ["Video communication applications", "P2P connections"]
            }
        },
        development_tools: {
            git: {
                experience: "Expert",
                use_cases: ["Version control", "Team collaboration", "Branch management"]
            },
            vscode: {
                experience: "Expert",
                use_cases: ["Primary development environment", "Extension development"]
            },
            pyinstaller: {
                experience: "Advanced",
                projects: ["Diplomatic Document Filler"],
                use_cases: ["Desktop app distribution", "Cross-platform executables"]
            }
        },
        methodologies: {
            agile_scrum: {
                experience: "Advanced",
                projects: ["Fabulous Nature Social", "Naturrest"],
                use_cases: ["Sprint planning", "Team collaboration", "Iterative development"]
            },
            ci_cd: {
                experience: "Intermediate",
                projects: ["Multiple projects"],
                use_cases: ["Automated testing", "Continuous deployment", "Pipeline management"]
            }
        }
    },

    // Projects - COMPLETELY REWRITTEN WITH ALL DETAILS
    projects: {
        friendsgotogether: {
            name: "FriendsGoTogether",
            description: "Production-Grade Real-Time Rideshare Platform",
            tech_stack: ["Python", "Flask", "MongoDB", "Socket.IO", "Docker", "Digital Ocean", "Cloudflare"],
            features: ["Real-time communication", "Advanced security", "Geographic validation", "User authentication", "Production deployment"],
            live_url: "https://friendsgotogether.com",
            github: "https://github.com/LaazAlae/ShiftSpace",
            status: "Production Live",
            complexity: "Expert",
            type: "Full-stack rideshare platform",
            highlights: ["19,000+ validated US cities", "SSL Labs A+ rating", "Real-time WebSocket communication", "Advanced rate limiting", "CSRF protection"]
        },
        alaeautomates: {
            name: "AlaeAutomates Business Platform Suite",
            description: "Enterprise-Grade PDF Processing and Financial Automation",
            tech_stack: ["Python", "Flask", "Express.js", "SQLite", "Railway"],
            features: ["PDF processing", "Document categorization", "Invoice separation", "Company name matching", "Security middleware"],
            live_url: "https://alaeautomates.up.railway.app/",
            github: "https://github.com/LaazAlae/AlaeAutomates2.0",
            status: "Production ready",
            complexity: "Expert",
            type: "Business automation platform",
            client: "United Corporate Services",
            highlights: ["1000+ page PDF processing", "AES-256 encryption", "Fuzzy string matching", "Multi-platform deployment"]
        },
        modernlaundry: {
            name: "Smart Laundry Management System",
            description: "Progressive Web Application with NFC Integration",
            tech_stack: ["Node.js", "React", "MongoDB", "Socket.IO", "Web NFC API", "Firebase"],
            features: ["Real-time machine tracking", "Email notifications", "NFC tag scanning", "Progressive Web App"],
            live_url: "https://modernlaundry.onrender.com/",
            nfc_demo: "https://laundryminutes.netlify.app/",
            github: "https://github.com/LaazAlae/modernlaundry",
            status: "Production ready",
            complexity: "Advanced",
            type: "IoT management system",
            highlights: ["Web NFC API integration", "Real-time notifications", "Dual-platform architecture", "Service Worker implementation"]
        },
        fabulous_nature_social: {
            name: "Fabulous Nature Social",
            description: "Agile-Developed React Social Media Platform",
            tech_stack: ["React", "TypeScript", "Socket.IO", "Material-UI", "Styled Components"],
            features: ["Social media features", "Real-time chat", "Photo sharing", "Nature-focused community"],
            live_url: "https://webdev.cse.buffalo.edu/hci/teams/fabulous/welcome",
            github: "https://github.com/CSE370HCI/fabulous",
            status: "Academic production",
            complexity: "Advanced",
            type: "Social media platform",
            methodology: "Agile/Scrum",
            highlights: ["60+ React components", "5-person team", "4 sprint development", "University production deployment"]
        },
        expensetracker: {
            name: "Enterprise Expense Tracking System",
            description: "Real-Time Financial Management with Government-Grade Security",
            tech_stack: ["Node.js", "Express", "Socket.IO", "React", "AES-256", "bcrypt"],
            features: ["Real-time collaboration", "AES-256 encryption", "Invite-only system", "Comprehensive audit trails"],
            live_url: "https://expensetracking.up.railway.app/",
            github: "https://github.com/LaazAlae/expenseTracker",
            status: "Production ready",
            complexity: "Expert",
            type: "Financial management system",
            highlights: ["Government-grade security", "Real-time WebSocket updates", "Threat detection", "Comprehensive logging"]
        },
        custom_web_server: {
            name: "Custom Web Server Foundation",
            description: "Zero-Framework Backend Implementation",
            tech_stack: ["Python", "Raw sockets", "WebSocket protocol", "HTTP/1.1", "MongoDB"],
            features: ["HTTP server from scratch", "WebSocket implementation", "Authentication system", "Real-time chat"],
            github: "https://github.com/LaazAlae/CustomWebServer",
            status: "Educational complete",
            complexity: "Expert",
            type: "Protocol implementation",
            highlights: ["RFC 6455 WebSocket compliance", "Binary frame parsing", "Custom authentication", "Zero framework dependencies"]
        },
        distributed_systems: {
            name: "Distributed Systems Protocol Suite",
            description: "Advanced Algorithms and Consensus Implementation",
            tech_stack: ["Go", "RPC", "Distributed computing", "Raft consensus", "MapReduce"],
            features: ["Raft leader election", "Log replication", "MapReduce framework", "Fault tolerance"],
            github: "Multiple academic repositories",
            status: "Academic complete",
            complexity: "Graduate-level",
            type: "Distributed algorithms",
            course: "CSE 486/586 - Distributed Systems",
            highlights: ["MIT 6.824 standards", "Raft consensus protocol", "Chandy-Lamport snapshots", "Byzantine fault tolerance"]
        },
        diplomatic_document_filler: {
            name: "Diplomatic Document Filler",
            description: "Professional Form Automation with PyInstaller Distribution",
            tech_stack: ["Python", "Kivy", "python-docx", "PyInstaller"],
            features: ["Dynamic form generation", "Document automation", "Cross-platform GUI", "Professional distribution"],
            github: "https://github.com/LaazAlae/doc-filler",
            status: "Production ready",
            complexity: "Advanced",
            type: "Desktop automation tool",
            highlights: ["Cross-platform executable", "Dynamic table generation", "Professional UI", "Diplomatic workflow optimization"]
        },
        federal_budget_database: {
            name: "Federal Budget Analysis Database System",
            description: "Enterprise-Grade PostgreSQL Database for Government Transparency",
            tech_stack: ["PostgreSQL", "Advanced SQL", "Triggers", "Stored procedures"],
            features: ["Government data analysis", "Budget oversight", "Complex queries", "Performance optimization"],
            github: "Academic team project",
            status: "Academic complete",
            complexity: "Advanced",
            type: "Database system",
            course: "CSE 4/560 Database Systems",
            highlights: ["31,225+ records per table", "90%+ query optimization", "Real U.S. Treasury data", "BCNF normalization"]
        },
        naturrest: {
            name: "Naturrest",
            description: "Nature-focused REST API and web application",
            tech_stack: ["Python", "Flask", "REST APIs"],
            features: ["RESTful architecture", "Agile development methodology", "Team collaboration"],
            methodology: "Agile/Scrum",
            github: "https://github.com/LaazAlae/naturrest",
            status: "Completed",
            complexity: "Medium",
            type: "Web application with REST API"
        }
    },

    // Languages Spoken
    languages: {
        arabic: {
            level: "Native",
            context: "First language, family communication"
        },
        french: {
            level: "Native",
            context: "Bilingual upbringing, professional use"
        },
        english: {
            level: "Fluent",
            context: "Academic, professional, programming"
        },
        moroccan_darija: {
            level: "Native",
            context: "Cultural heritage, family"
        }
    },

    // Contact & Social
    contact: {
        note: "Contact information can be provided upon request",
        github: "https://github.com/LaazAlae",
        portfolio: "Professional portfolio website",
        availability: "Open to opportunities and collaborations",
        phone: "646-251-8065",
        email: "laazalae5@gmail.com",
        linkedin: "linkedin.com/in/alae-laaziri/"
    }
};

// Make globally available
window.AlaeMemory = AlaeMemory;