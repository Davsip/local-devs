const router = require('express').Router();
const projectRoutes = require('./projects');

// Project Routes
router.use('/projects', projectRoutes);

module.exports = router;