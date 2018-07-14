const router = require('express').Router();
const projectController = require('../../controllers/projectController');

// Matches with '/api/projects'
router.route('/')
    //.get(projectController.returnJSON)
    .get(projectController.findAll)
    .post(projectController.create);

// router.get('/', (req, res) => res.json( 'projects works' ));

// Matches with '/api/projects/:id'
// router.route('/:id')
//     .get(projectController.findById)
//     .put(projectController.update)
//     .delete(projectController.remove);


module.exports = router;