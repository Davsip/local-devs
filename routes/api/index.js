const router = require('express').Router();
const projectRoutes = require('./projects');
const authRoutes = require('./auth');

// Project Routes
router.use('/projects', projectRoutes);

// Authenticated Routes
router.use('/auth', authRoutes);

module.exports = router;