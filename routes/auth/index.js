const router = require('express').Router();
const authRoutes = require('./auth');

// Authenication Routes
router.use('/', authRoutes);

module.exports = router;