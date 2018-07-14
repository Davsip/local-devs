const router = require('express').Router();
const userController = require('../../controllers/userController');

// Matches with '/api/users'
router.route('/')
    //.get(userController.returnJSON)
    .get(userController.findAll)
    .post(userController.create);

// Matches with '/api/users/:id'
router.route('/:id')
    .get(userController.find)
    .put(userController.update)
    .delete(userController.remove);

module.exports = router;