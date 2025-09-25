// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Project data ordered by employer attractiveness (most to least impressive)
const projectsData = [
    {
        id: 'friendsgotogether',
        stage: 'Production Platform',
        title: 'FriendsGoTogether',
        headline: 'Production-deployed rideshare platform serving real users',
        highlights: ['Live at friendsgotogether.com', 'Real user base', 'Enterprise security'],
        summary: 'Full-stack platform with enterprise architecture and real-world impact.',
        image: '', // Add image path here
        overview: `FriendsGoTogether stands as a comprehensive production-deployed rideshare platform addressing critical transportation challenges affecting millions of university students. Built entirely from scratch and live at friendsgotogether.com, this platform demonstrates enterprise-level software architecture with advanced security implementations and real-time communication systems.`,
        links: [
            { label: 'Live Deployment', url: 'https://friendsgotogether.com', type: 'live' },
            { label: 'GitHub Repository', url: 'https://github.com/LaazAlae/ShiftSpace', type: 'repo' }
        ],
        sections: [
            {
                title: 'Enterprise Infrastructure',
                icon: 'blueprint',
                items: [
                    'Production Deployment: Live platform serving real users with Digital Ocean + Cloudflare + SSL',
                    'Docker Architecture: Multi-service containerization with Nginx reverse proxy and automated scaling',
                    'Database Design: MongoDB 4.2.5 with optimized indexing strategies for high-volume operations',
                    'Real-Time Communication: Socket.IO with Eventlet async processing enabling instant updates'
                ]
            },
            {
                title: 'Advanced Security Framework',
                icon: 'shield',
                items: [
                    'Rate Limiting: Sliding window algorithm with automatic IP blocking and abuse prevention',
                    'Authentication: bcrypt password hashing with UUID4 session tokens and SHA-256 storage',
                    'Data Protection: CSRF tokens, HTML sanitization, and comprehensive XSS prevention',
                    'SSL Implementation: Let\'s Encrypt automation achieving SSL Labs A+ rating with Perfect Forward Secrecy'
                ]
            },
            {
                title: 'Geographic Intelligence',
                icon: 'layers',
                items: [
                    'Location Database: 19,000+ validated US cities with real-time autocomplete and fuzzy matching',
                    'Search Optimization: Multi-criteria filtering supporting city, state, date, and user type combinations',
                    'Validation Layers: Client-side and server-side geographic verification against USPS standards'
                ]
            },
            {
                title: 'Business Impact',
                icon: 'impact',
                items: [
                    'Target Market: University students and commuters seeking cost-effective transportation',
                    'User Experience: Real-time post updates, reactions, and bookmarks without page refreshes',
                    'Social Features: User categorization system for drivers, passengers, and car owners with interaction tracking',
                    'Scalability: Architecture supports 1,000+ concurrent WebSocket connections with global expansion readiness'
                ]
            }
        ]
    },
    {
        id: 'alaeautomates',
        stage: 'Enterprise Automation',
        title: 'AlaeAutomates Business Platform Suite',
        headline: 'Enterprise automation platform serving real business client',
        highlights: ['United Corporate Services', 'Multi-iteration evolution', 'Production deployment'],
        summary: 'Comprehensive business automation for real client with separated architecture.',
        image: '', // Add image path here
        overview: `AlaeAutomates represents a comprehensive business automation platform developed for United Corporate Services (UCS) through multiple professional iterations. This enterprise-grade solution evolved from initial concept to sophisticated separated architecture, demonstrating practical business automation addressing real-world financial document processing challenges.`,
        links: [
            { label: 'AlaeAutomates 2.0', url: 'https://alaeautomates.up.railway.app/', type: 'live' },
            { label: 'Backend API Service', url: 'https://alaeautomatesapi.up.railway.app/', type: 'api' },
            { label: 'Modern Frontend', url: 'https://alaeautomatesbetter.up.railway.app/', type: 'frontend' }
        ],
        sections: [
            {
                title: 'Business Integration',
                icon: 'impact',
                items: [
                    'Production Deployment: Live system serving United Corporate Services with measurable business impact',
                    'Process Automation: Significant reduction in manual document sorting and organization time',
                    'Workflow Integration: Seamless integration with existing business processes and financial systems',
                    'Multi-Platform Evolution: Three iterations showcasing continuous improvement and architectural refinement'
                ]
            },
            {
                title: 'Advanced PDF Processing',
                icon: 'automation',
                items: [
                    'PyMuPDF-powered coordinate-based text extraction with intelligent company name matching against DNM lists',
                    'Multi-page PDF document analysis and splitting with automated invoice number extraction and validation',
                    'Custom multipart/form-data parser handling large file uploads with boundary detection and content separation',
                    'Fuzzy string matching using difflib.SequenceMatcher for intelligent company name resolution with confidence scoring'
                ]
            },
            {
                title: 'Separated Architecture',
                icon: 'blueprint',
                items: [
                    'Dedicated Flask API backend with UUID-based session management and persistent file storage using pickle',
                    'Express.js security-enhanced frontend with comprehensive middleware stack and performance optimization',
                    'SQLite-based company memory management with thread-safe operations and persistent equivalences',
                    'RESTful API design enabling seamless frontend integration and third-party system connectivity'
                ]
            },
            {
                title: 'Enterprise Security',
                icon: 'shield',
                items: [
                    'Multi-layered rate limiting: 1000 requests per 15 minutes general, 100 for API endpoints with IP tracking',
                    'Helmet security headers with Content Security Policy, HSTS, and comprehensive XSS protection',
                    'CORS configuration with dynamic origin validation supporting Railway and localhost environments',
                    'Input sanitization middleware removing attack vectors with NoSQL injection prevention'
                ]
            }
        ]
    },
    {
        id: 'laundry',
        stage: 'PWA + NFC Integration',
        title: 'Smart Laundry Management System',
        headline: 'Innovative NFC integration solving real dormitory problems',
        highlights: ['Cutting-edge NFC technology', 'Real problem solving', 'Dual deployments'],
        summary: 'Revolutionary system addressing genuine university residential challenges.',
        image: '', // Add image path here
        overview: `The Smart Laundry Management System represents an innovative dual-platform solution born from real-world frustration at Flint Village Apartments, University at Buffalo. This cutting-edge system tackles the daily challenge faced by hundreds of residents sharing limited laundry facilities through advanced web technologies and pioneering NFC integration.`,
        links: [
            { label: 'Production Platform', url: 'https://modernlaundry.onrender.com/', type: 'live' },
            { label: 'NFC Demo Application', url: 'https://laundryminutes.netlify.app/', type: 'demo' },
            { label: 'GitHub Repository', url: 'https://github.com/LaazAlae/modernlaundry', type: 'repo' }
        ],
        sections: [
            {
                title: 'Technical Innovation',
                icon: 'automation',
                items: [
                    'Dual-Platform Architecture: Full-stack Node.js application with MongoDB persistence and automated email notifications',
                    'NFC Demo: Cutting-edge Web NFC API implementation with Firebase Realtime Database synchronization',
                    'Progressive Web App: Service Worker implementation with offline functionality and native app-like installation',
                    'Real-Time Updates: Live machine status synchronization without traditional WebSocket complexity'
                ]
            },
            {
                title: 'Advanced NFC Integration',
                icon: 'layers',
                items: [
                    'Web NFC API: NDEFReader implementation for seamless tag interaction and automatic machine identification',
                    'URL Parsing: Intelligent machine ID extraction from NFC payloads with browser compatibility detection',
                    'Modal Automation: Instant machine selection triggering upon successful NFC detection',
                    'Cross-Platform Support: Graceful degradation for unsupported devices with progressive enhancement'
                ]
            },
            {
                title: 'Real-World Problem Solving',
                icon: 'impact',
                items: [
                    'Origin Story: Developed to address genuine dormitory challenges at Flint Village - hundreds of residents sharing just 2 washers and 2 dryers',
                    'Pain Point Resolution: Eliminates multiple daily trips to check machine availability and prevents clothes abandonment',
                    'Conflict Reduction: Transparent machine usage visibility reduces interpersonal conflicts and scheduling disputes',
                    'Quality of Life: Proactive notifications prevent laundry abandonment after cycle completion'
                ]
            },
            {
                title: 'Production Infrastructure',
                icon: 'blueprint',
                items: [
                    'Backend Infrastructure: Node.js Express with comprehensive API endpoints and MongoDB Atlas integration',
                    'Security Framework: Advanced rate limiting with SHA-256 hashing and 30-second cooldown mechanisms',
                    'Email Service: Nodemailer integration with Gmail SMTP and HTML template rendering',
                    'Dual Deployment: Render platform for backend services and Netlify for NFC demonstration'
                ]
            }
        ]
    },
    {
        id: 'expensetracker',
        stage: 'Government-Grade Security',
        title: 'Enterprise Expense Tracking System',
        headline: 'Government-grade security with real-time financial management',
        highlights: ['AES-256 encryption', 'Invite-only system', 'Real-time WebSocket sync'],
        summary: 'Sophisticated financial tracking system with enterprise-grade reliability.',
        image: '', // Add image path here
        overview: `The Enterprise Expense Tracking System represents a comprehensive real-time financial management platform designed with government-level security standards and enterprise-grade reliability. Built with invite-only architecture, bulletproof AES-256 encryption, and comprehensive threat detection systems, this platform addresses stringent enterprise requirements for secure financial data management with real-time collaboration capabilities and detailed audit logging.`,
        links: [
            { label: 'Live Production System', url: 'https://expensetracking.up.railway.app/', type: 'live' },
            { label: 'GitHub Repository', url: 'https://github.com/LaazAlae/expenseTracker', type: 'repo' }
        ],
        sections: [
            {
                title: 'Government-Grade Security',
                icon: 'shield',
                items: [
                    'AES-256-CBC encryption with bulletproof fallback mechanisms ensuring cross-platform data protection',
                    'Invite-only authentication system with no public registration and role-based access control (admin/user)',
                    'Advanced brute force detection with automatic IP blocking, account lockout protection, and unlock timers',
                    'Comprehensive security event logging with real-time threat scoring and automated alert generation'
                ]
            },
            {
                title: 'Real-Time Architecture',
                icon: 'automation',
                items: [
                    'Socket.IO WebSocket integration providing real-time data synchronization across all client sessions',
                    'User isolation architecture ensuring each user accesses only their own financial data securely',
                    'Connection resilience with automatic reconnection, queued operations, and background synchronization',
                    'Concurrent user management using Map-based socket tracking with administrative monitoring capabilities'
                ]
            },
            {
                title: 'Financial Management',
                icon: 'blueprint',
                items: [
                    'Complete CRUD operations for expense transactions with real-time editing and bulk BD number assignment',
                    'Smart autocomplete system with localStorage persistence remembering previous entries across sessions',
                    'Centralized budget calculations with mutex-like operation locks preventing concurrent modification conflicts',
                    'Excel export functionality with comprehensive transaction data and professional formatting'
                ]
            },
            {
                title: 'Enterprise Compliance',
                icon: 'research',
                items: [
                    'Comprehensive audit trail preservation with 30-day log retention and encrypted JSON database storage',
                    'Atomic write operations using fcntl locking mechanisms ensuring data consistency and integrity',
                    'Memory protection with automatic sensitive variable clearing and garbage collection procedures',
                    'Compliance with government security standards for financial data protection and regulatory requirements'
                ]
            }
        ]
    },
    {
        id: 'webserver',
        stage: 'Systems Engineering',
        title: 'Custom Web Server Foundation',
        headline: 'Zero-framework HTTP and WebSocket server from scratch',
        highlights: ['Pure Python sockets', 'RFC 6455 compliant', 'Protocol mastery'],
        summary: 'Complete web server demonstrating mastery of network fundamentals.',
        image: '', // Add image path here
        overview: `Custom Web Server Foundation represents a comprehensive study in network fundamentals, delivering HTTP routing, WebSocket chat, and authenticated sessions without relying on web frameworks. This implementation handles the entire request pipeline from TCP handshake through persistence, demonstrating deep understanding of protocol-level web server architecture and real-time communication systems.`,
        links: [],
        sections: [
            {
                title: 'Network Programming',
                icon: 'blueprint',
                items: [
                    'Custom TCP socket server using Python\'s socketserver module with manual HTTP request parsing',
                    'Thread-based request handling for concurrent client connections with proper resource management',
                    'Raw byte-level data processing and protocol implementation for complete control over communication',
                    'Custom routing system with exact and prefix path matching for flexible request handling'
                ]
            },
            {
                title: 'WebSocket RFC 6455 Compliance',
                icon: 'automation',
                items: [
                    'RFC 6455 compliant WebSocket protocol implementation from scratch with proper handshake computation',
                    'Binary frame parsing supporting all payload lengths (0-125, 126-65535, 65536+) with XOR masking',
                    'Continuation frame handling for fragmented messages and support for text/close frames',
                    'WebSocket connection management with state tracking and cleanup procedures'
                ]
            },
            {
                title: 'Advanced Features',
                icon: 'layers',
                items: [
                    'Real-time chat system with WebSocket-based messaging and instant delivery capabilities',
                    'Custom multipart/form-data parser for file uploads with boundary detection and content separation',
                    'Session token generation using UUID4 and SHA-256 hashing with secure cookie management',
                    'MongoDB integration for message persistence with unique ID sequencing and user session tracking'
                ]
            },
            {
                title: 'Security Framework',
                icon: 'shield',
                items: [
                    'Custom authentication with bcrypt hashing (12 rounds) and password complexity validation',
                    'Manual HTML entity escaping implementation preventing XSS attacks through character sanitization',
                    'XSRF token validation for state-changing operations with secure session management',
                    'Path validation for secure file access and proper HTTP status code handling (200, 302, 403, 404)'
                ]
            }
        ]
    },
    {
        id: 'distributed',
        stage: 'Graduate Research',
        title: 'Distributed Systems Protocol Suite',
        headline: 'Advanced distributed computing algorithms with MIT 6.824 compliance',
        highlights: ['Go concurrency mastery', 'MIT 6.824 compliance', 'Byzantine fault tolerance'],
        summary: 'Graduate-level distributed system design patterns and consensus algorithms.',
        image: '', // Add image path here
        overview: `The Distributed Systems Protocol Suite represents a comprehensive implementation of fundamental distributed computing algorithms developed for advanced coursework (CSE 486/586). This Go-based project series demonstrates mastery of complex distributed computing concepts including parallel processing, fault tolerance, consensus algorithms, and distributed snapshots at the protocol level.`,
        links: [],
        sections: [
            {
                title: 'MapReduce Framework',
                icon: 'automation',
                items: [
                    'Distributed MapReduce implementation with master-worker coordination using RPC communication',
                    'Dynamic task scheduling and load balancing with worker failure detection and task reassignment',
                    'Inverted index generation for document search optimization with concurrent task execution',
                    'Fault tolerance through task redundancy, reassignment, and idempotent task design for safe re-execution'
                ]
            },
            {
                title: 'Chandy-Lamport Algorithm',
                icon: 'research',
                items: [
                    'Complete distributed snapshot protocol implementation with token-passing system simulation',
                    'Channel state recording and management during snapshot capture with marker message handling',
                    'Global state reconstruction from distributed snapshots with consistency validation',
                    'Event-driven simulation framework with concurrent message processing and FIFO channel guarantees'
                ]
            },
            {
                title: 'Raft Consensus Protocol',
                icon: 'blueprint',
                items: [
                    'Leader election mechanism with RequestVote RPC and proper vote validation according to Raft specification',
                    'Log replication and consensus agreement with AppendEntries RPC and log consistency checking',
                    'Persistent state management with crash recovery using GOB encoding/decoding for reliability',
                    'Network unreliability handling with message reordering and Byzantine failure resistance'
                ]
            },
            {
                title: 'Advanced Concurrency',
                icon: 'layers',
                items: [
                    'Goroutine-based concurrent processing architecture with channel communication for synchronization',
                    'Mutex-based critical section protection with deadlock prevention and resource management',
                    'Load balancing algorithms for distributed work with efficient memory management and garbage collection',
                    'Comprehensive test coverage with fault injection testing and performance benchmarking under load conditions'
                ]
            }
        ]
    },
    {
        id: 'fabulous',
        stage: 'React Social Platform',
        title: 'Fabulous Nature Social',
        headline: 'Professional Agile-developed React social media platform',
        highlights: ['60+ React components', '15k+ lines of code', 'Semester-long Agile project'],
        summary: 'Advanced React ecosystem mastery and collaborative software engineering.',
        image: '', // Add image path here
        overview: `Fabulous Nature Social represents a comprehensive social media platform engineered specifically for nature photography enthusiasts through rigorous Agile/Scrum methodology. Developed by a five-member team over an entire academic semester for CSE370 Human-Computer Interaction, this production-deployed platform demonstrates professional-grade development workflows and collaborative software engineering practices.`,
        links: [
            { label: 'Live University Deployment', url: 'https://webdev.cse.buffalo.edu/hci/teams/fabulous/welcome', type: 'live' },
            { label: 'GitHub Repository', url: 'https://github.com/CSE370HCI/fabulous', type: 'repo' }
        ],
        sections: [
            {
                title: 'Professional Development Excellence',
                icon: 'research',
                items: [
                    'Agile Methodology Mastery: Four-sprint cycle with weekly stand-ups, retrospectives, and stakeholder demonstrations',
                    'Team Collaboration: Five-person development team with designated project manager and specialized role distribution',
                    'Code Quality: Comprehensive code review processes ensuring quality standards and knowledge transfer across team members',
                    'User-Centered Design: Human-Computer Interaction principles with iterative feedback incorporation and usability testing'
                ]
            },
            {
                title: 'React Ecosystem Expertise',
                icon: 'blueprint',
                items: [
                    'Component Architecture: Over 60 modular React components demonstrating advanced composition patterns and reusable design',
                    'Modern Technologies: React 18.3+ with functional components, React Hooks, and TypeScript integration for type-safe development',
                    'Real-Time Features: Socket.IO integration for messaging, notifications, and live user interactions',
                    'Performance Optimization: Code splitting, lazy loading, virtual scrolling, and comprehensive caching strategies'
                ]
            },
            {
                title: 'Advanced Frontend Implementation',
                icon: 'automation',
                items: [
                    'State Management: React Hooks architecture with SessionStorage and LocalStorage for persistent authentication',
                    'Material-UI Integration: Comprehensive component library with Styled Components for dynamic theming and responsive design',
                    'Navigation System: React Router DOM for client-side routing with dynamic highlighting and viewport position tracking',
                    'API Integration: RESTful service communication with comprehensive error handling and form validation systems'
                ]
            },
            {
                title: 'Specialized Platform Features',
                icon: 'layers',
                items: [
                    'Nature Photography Focus: Specialized tagging system with nature-specific categories (Wildlife, Landscapes, Botanical photography)',
                    'Community Building: Following/follower relationships with social graph management and engagement tracking',
                    'Educational Integration: Species identification features and photography technique sharing capabilities',
                    'Performance Features: Loading states, skeleton screens, and progressive disclosure for complex features'
                ]
            }
        ]
    },
    {
        id: 'budget-db',
        stage: 'Database Systems',
        title: 'Federal Budget Analysis Database System',
        headline: 'PostgreSQL database with real U.S. Treasury datasets',
        highlights: ['31,225+ records per table', '5-year Treasury datasets', '90%+ query optimization'],
        summary: 'Advanced PostgreSQL implementation with government spending analysis.',
        image: '', // Add image path here
        overview: `The Federal Budget Analysis Database System represents a sophisticated relational database solution designed for analyzing government spending patterns and promoting federal budget transparency. Built as a collaborative academic project for CSE 4/560 Database Systems, this system implements a rigorous 9-table schema handling extensive real-world data while demonstrating advanced database engineering principles and query optimization.`,
        links: [],
        sections: [
            {
                title: 'Enterprise Database Design',
                icon: 'blueprint',
                items: [
                    'Sophisticated 9-table PostgreSQL schema with hierarchical government structure (Agencies → Departments → Programs)',
                    'Advanced data normalization achieving Boyce-Codd Normal Form (BCNF) with comprehensive referential integrity',
                    'Professional constraint management with CASCADE deletion policies and complex functional dependency analysis',
                    'Strategic B-tree indexing on critical foreign key relationships achieving 90%+ query performance improvement'
                ]
            },
            {
                title: 'Real Treasury Data Integration',
                icon: 'research',
                items: [
                    'U.S. Treasury Daily Statement (DTS): 4,492 records and Monthly Statement (MTS): 1,371 records spanning 2020-2025',
                    'Professional data extraction from "Opening Balance Today" and "Current Month Gross Outlay Amount" fields',
                    'Intelligent parsing of hierarchical government structure using Parent ID and Classification ID mappings',
                    'Advanced data transformation handling fiscal year boundaries with intelligent synthetic data generation'
                ]
            },
            {
                title: 'Advanced Database Engineering',
                icon: 'automation',
                items: [
                    'Sophisticated trigger system preventing budget overruns with real-time validation and automatic logging',
                    'Professional stored procedures (sp_insert_vendor, fn_program_budget) with comprehensive error handling',
                    'Complex JOIN operations across 9 tables with GROUP BY aggregations and HAVING clauses for analysis',
                    'Query execution optimization from milliseconds to sub-millisecond response through strategic indexing'
                ]
            },
            {
                title: 'Government Transparency Features',
                icon: 'layers',
                items: [
                    'Cross-agency spending comparison with temporal trend analysis and variance reporting',
                    'Budget overrun detection with BudgetOverrunLog table and comprehensive audit trail generation',
                    'Vendor transaction tracking enabling procurement transparency and relationship analysis',
                    'Professional reporting capabilities supporting policy analysts, transparency advocates, and financial journalists'
                ]
            }
        ]
    },
    {
        id: 'docfiller',
        stage: 'Desktop Automation',
        title: 'Diplomatic Document Filler',
        headline: 'Cross-platform desktop automation for diplomatic workflows',
        highlights: ['Kivy cross-platform GUI', 'MS Word automation', 'Diplomatic workflow optimization'],
        summary: 'Professional desktop application streamlining diplomatic documentation.',
        image: '', // Add image path here
        overview: `The Diplomatic Document Filler represents a specialized desktop automation tool designed specifically for diplomatic and consular document processing workflows. Built using Python with Kivy framework for professional cross-platform GUI, the application automates the complex process of filling diplomatic shipping documents with dynamic table generation, intelligent placeholder replacement, and comprehensive document validation.`,
        links: [
            { label: 'GitHub Repository', url: 'https://github.com/LaazAlae/doc-filler', type: 'repo' }
        ],
        sections: [
            {
                title: 'Cross-Platform Architecture',
                icon: 'blueprint',
                items: [
                    'Professional Kivy framework GUI with responsive scroll view (600x800) supporting variable content length',
                    'PyInstaller packaging creating standalone executables for Windows, macOS, and Linux distribution',
                    'Advanced file handling supporting both development and packaged executable modes with path resolution',
                    'Cross-platform document opening capabilities with platform-specific system integration'
                ]
            },
            {
                title: 'Document Processing Engine',
                icon: 'automation',
                items: [
                    'Advanced Microsoft Word manipulation using python-docx with intelligent placeholder replacement system',
                    'Dynamic table generation with exact row height specification (0.32 inches) and professional cell alignment',
                    'XML-level document manipulation for precise table structure control and diplomatic box content insertion',
                    'Professional font formatting with RGB color management (Pt 14) and context-aware text transformation'
                ]
            },
            {
                title: 'Intelligent User Interface',
                icon: 'layers',
                items: [
                    'Dynamic dropdown system with persistent storage and diplomatic-specific presets (Names, Consular IDs, Flight Numbers)',
                    'Real-time form validation with visual feedback preventing invalid submissions and ensuring data integrity',
                    'Smart autocomplete functionality remembering previous entries across application sessions',
                    'Professional heartbeat animation effects and color-coded validation states for enhanced user experience'
                ]
            },
            {
                title: 'Professional Workflow',
                icon: 'research',
                items: [
                    'Secure admin access control (password: 1975) for dropdown option modification and system configuration',
                    'JSON-based configuration management with writable path handling in user home directory',
                    'Comprehensive error handling preventing application crashes with structured logging and debugging capabilities',
                    'Professional document output with automated desktop placement and systematic naming conventions'
                ]
            }
        ]
    }
];

// SVG Icons for sections
const sectionIcons = {
    blueprint: `
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 9h18M3 15h18M9 3v18M15 3v18" opacity="0.4"/>
        </svg>
    `,
    layers: `
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 3l8 4-8 4-8-4 8-4z"/>
            <path d="M4 12l8 4 8-4" opacity="0.6"/>
            <path d="M4 16l8 4 8-4" opacity="0.3"/>
        </svg>
    `,
    shield: `
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 3l7 3v6c0 4.6-3.2 8.8-7 9.5-3.8-0.7-7-4.9-7-9.5V6l7-3z"/>
            <path d="M9.5 12.5l1.8 1.8 3.2-4.3"/>
        </svg>
    `,
    impact: `
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M5 19h14"/>
            <path d="M8 19V9l3 3 5-7"/>
            <path d="M16 19v-6" opacity="0.5"/>
        </svg>
    `,
    automation: `
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 3v2"/>
            <path d="M12 19v2"/>
            <path d="M3 12h2"/>
            <path d="M19 12h2"/>
            <path d="M5.6 5.6l1.4 1.4"/>
            <path d="M17 17l1.4 1.4"/>
            <path d="M18.4 5.6L17 7"/>
            <path d="M7 17l-1.4 1.4"/>
        </svg>
    `,
    research: `
        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="8" cy="8" r="3"/>
            <circle cx="17" cy="6" r="2"/>
            <circle cx="17" cy="15" r="3"/>
            <path d="M10.5 9.5l4 2"/>
            <path d="M14 6.5l-2 1"/>
            <path d="M8 11v3.5"/>
            <path d="M10 17l2 2"/>
        </svg>
    `
};

// DOM Elements
const timelineContainer = document.getElementById('timeline-container');
const dialogOverlay = document.getElementById('project-dialog-overlay');
const dialogContent = document.getElementById('dialog-content');
const dialogCloseBtn = document.getElementById('dialog-close-btn');

// Create project lookup for easy access
const projectLookup = {};
projectsData.forEach(project => {
    projectLookup[project.id] = project;
});

// Render timeline items
function renderTimeline() {
    projectsData.forEach((project, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';

        // Add side class for alternating layout (right, left, right, left...)
        const side = index % 2 === 0 ? 'right' : 'left';
        timelineItem.classList.add(`timeline-${side}`);

        timelineItem.innerHTML = `
            <div class="project-card" data-project="${project.id}">
                ${project.image ? `<div class="project-image"><img src="${project.image}" alt="${project.title}"></div>` : ''}
                <div class="project-content">
                    <span class="project-stage">${project.stage}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-headline">${project.headline}</p>
                    <div class="project-highlights">
                        ${project.highlights.map(highlight =>
                            `<span class="highlight-tag">${highlight}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;

        timelineContainer.appendChild(timelineItem);

        // Add click listener for dialog
        const projectCard = timelineItem.querySelector('.project-card');
        projectCard.addEventListener('click', () => openProjectDialog(project.id));
    });
}

// Build navigation links HTML
function buildNavLinks(links) {
    if (!links || !links.length) return '';

    return `
        <div class="dialog-links">
            ${links.map(link => {
                const typeClass = link.type ? ` ${link.type}` : '';
                const target = link.url && link.url.startsWith('http') ? '_blank' : '_self';
                const rel = target === '_blank' ? 'noopener noreferrer' : 'noopener';
                return `<a href="${link.url}" class="dialog-link${typeClass}" target="${target}" rel="${rel}">${link.label}</a>`;
            }).join('')}
        </div>
    `;
}

// Build sections HTML
function buildSections(sections) {
    return `
        <div class="dialog-sections">
            ${sections.map(section => {
                const icon = sectionIcons[section.icon] || sectionIcons.blueprint;
                return `
                    <div class="dialog-section">
                        <div class="section-header">
                            ${icon}
                            <h3>${section.title}</h3>
                        </div>
                        <ul class="section-items">
                            ${section.items.map(item =>
                                `<li class="section-item">${item}</li>`
                            ).join('')}
                        </ul>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Open project dialog
function openProjectDialog(projectId) {
    const project = projectLookup[projectId];
    if (!project) return;

    dialogContent.innerHTML = `
        ${project.image ? `<div class="dialog-hero-image"><img src="${project.image}" alt="${project.title}"></div>` : ''}
        <div class="dialog-header">
            <span class="dialog-stage">${project.stage}</span>
            <h2 class="dialog-title">${project.title}</h2>
            <p class="dialog-headline">${project.headline}</p>
            ${buildNavLinks(project.links)}
        </div>
        <div class="dialog-body">
            <p class="dialog-overview">${project.overview}</p>
            ${buildSections(project.sections)}
        </div>
    `;

    // Show dialog with guaranteed centering
    dialogOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close project dialog
function closeProjectDialog() {
    dialogOverlay.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Timeline intersection observer for animations
function setupTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Event listeners
dialogCloseBtn.addEventListener('click', closeProjectDialog);

dialogOverlay.addEventListener('click', (e) => {
    if (e.target === dialogOverlay) {
        closeProjectDialog();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dialogOverlay.classList.contains('show')) {
        closeProjectDialog();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderTimeline();
    setupTimelineAnimations();
});