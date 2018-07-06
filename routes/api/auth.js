const router = require('express').Router();
const authController = require('../../controllers/authController');

// Matches with '/api/auth'
router.route('/')
    .get(authController.findAll)
    .post(authController.create);

// Matches with '/api/auths/:id'
router.route('/:id')
    .get(authController.findById)
    .put(authController.update)
    .delete(authController.remove);

module.exports = router;