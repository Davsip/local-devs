const router = require('express').Router();
const projectRoutes = require('./projects');
const userRoutes = require('./users');

// Project Routes
router.use('/projects', projectRoutes);

// User Routes
router.use('/users', userRoutes);

module.exports = router;