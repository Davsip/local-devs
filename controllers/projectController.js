const db = require('../models');

// Defining methods for the projectController
module.exports = {

  returnJSON: function(req, res) {
      res.status(200).json( 'api/projects route works' );
  },
  findAll: function(req, res) {
    db.Project
      .find(req.query)
      .sort({ date: -1 })
      .then(dbProject => res.json(dbProject))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Project
      .findById(req.params.id)
      .then(dbProject => res.json(dbProject))
      .catch(err => res.status(422).json(err));
  },

  // edit Project object to match Project Schema
  create: function(req, res) {
    const Project = {
      name: req.body.name,
      desc: req.body.desc,
      locationZip: req.body.locationZip,
      budget: req.body.budget,
      img: req.body.img,
      reqSkills: req.body.reqSkills,
      seLed: req.body.seLed,
      startDate: req.body.startDate,
      duration: req.body.duration,
      compPerc: req.body.compPerc,
      teamMembers: req.body.teamMembers,
      teamApplicants: req.body.teamApplicants,
      projectStage: req.body.projectStage,
      teamSize: req.body.teamSize
    };

    db.Project
      .create(Project, (err, dbProject) => {
        if (err) {
          return res.status(422).json(err);
        }

        console.log(`project added: ${dbProject}`);
        res.json(dbProject);

      })

  },
  update: function(req, res) {
    db.Project
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbProject => res.json(dbProject))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Project
      .findById({ _id: req.params.id })
      .then(dbProject => dbProject.remove())
      .then(dbProject => res.json(dbProject))
      .catch(err => res.status(422).json(err));
  }
};