const express = require('express');
const { body, validationResult } = require('express-validator');
const config = require('../config');
const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: 'Validation failed',
            details: errors.array()
        });
    }
    next();
};

// Get portfolio data
router.get('/portfolio', (req, res) => {
    try {
        const portfolioData = config.getPersonalInfo();
        res.json({
            success: true,
            data: portfolioData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to load portfolio data'
        });
    }
});

// Get specific project
router.get('/project/:id', (req, res) => {
    try {
        const { id } = req.params;
        const portfolioData = config.getPersonalInfo();
        const project = portfolioData.projects.find(p => p.id === id);

        if (!project) {
            return res.status(404).json({
                success: false,
                error: 'Project not found'
            });
        }

        res.json({
            success: true,
            data: project
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to load project data'
        });
    }
});

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        success: true,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Future contact form endpoint (placeholder)
router.post('/contact',
    [
        body('name').trim().isLength({ min: 2, max: 100 }).escape(),
        body('email').isEmail().normalizeEmail(),
        body('message').trim().isLength({ min: 10, max: 1000 }).escape()
    ],
    handleValidationErrors,
    (req, res) => {
        // Placeholder for contact form functionality
        res.json({
            success: true,
            message: 'Contact form functionality not implemented yet'
        });
    }
);

module.exports = router;