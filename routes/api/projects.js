const router = require('express').Router();
const projectController = require('../../controllers/projectController');

// Matches with '/api/projects'
router.route('/')
    //.get(projectController.returnJSON)
    .get(projectController.findAll)
    .post(projectController.create);

// Matches with '/api/projects/applicant/:id'
router.route('/applicant/:id')
    .get(projectController.findById)
    .put(projectController.updateApplicant)
    .delete(projectController.remove);


module.exports = router;