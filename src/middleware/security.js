const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

// Rate limiting configuration
const createRateLimit = (windowMs = 15 * 60 * 1000, max = 100) => {
    return rateLimit({
        windowMs,
        max,
        message: {
            error: 'Too many requests from this IP, please try again later.',
            retryAfter: Math.ceil(windowMs / 1000)
        },
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res) => {
            res.status(429).json({
                error: 'Too many requests from this IP, please try again later.',
                retryAfter: Math.ceil(windowMs / 1000)
            });
        }
    });
};

// Security middleware configuration
const securityMiddleware = (app) => {
    // Helmet for security headers
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
                fontSrc: ["'self'", "https://fonts.gstatic.com"],
                scriptSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "https:"],
                connectSrc: ["'self'"]
            }
        },
        crossOriginEmbedderPolicy: false
    }));

    // CORS configuration
    const corsOptions = {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true,
        optionsSuccessStatus: 200,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
    };

    app.use(cors(corsOptions));

    // Global rate limiting
    const globalLimit = createRateLimit(
        parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
        parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
    );
    app.use(globalLimit);

    // API specific rate limiting
    const apiLimit = createRateLimit(5 * 60 * 1000, 50); // 50 requests per 5 minutes for API
    app.use('/api/', apiLimit);

    // Disable X-Powered-By header
    app.disable('x-powered-by');

    // Trust proxy for rate limiting behind reverse proxy
    app.set('trust proxy', 1);
};

// Input sanitization middleware
const sanitizeInput = (req, res, next) => {
    // Remove potentially dangerous characters
    const sanitize = (obj) => {
        for (let key in obj) {
            if (typeof obj[key] === 'string') {
                obj[key] = obj[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                obj[key] = obj[key].replace(/javascript:/gi, '');
                obj[key] = obj[key].replace(/on\w+\s*=/gi, '');
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                sanitize(obj[key]);
            }
        }
    };

    if (req.body) sanitize(req.body);
    if (req.query) sanitize(req.query);
    if (req.params) sanitize(req.params);

    next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);

    // Don't leak error details in production
    const isDevelopment = process.env.NODE_ENV === 'development';

    res.status(err.status || 500).json({
        error: isDevelopment ? err.message : 'Internal server error',
        ...(isDevelopment && { stack: err.stack })
    });
};

// 404 handler
const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    });
};

module.exports = {
    securityMiddleware,
    sanitizeInput,
    errorHandler,
    notFoundHandler,
    createRateLimit
};