const router = require('express').Router();
const authController = require('../../controllers/authController');

// Matches with '/login'
// router.route('/')
//     .get(authController.findAll)
//     .post(authController.create);

router.get('/', (req, res) => res.json({ msg: '/auth/login works' }));

module.exports = router;