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
      _id: req.body._id,
      title: req.body.headline.main,
      url: req.body.web_url
    };
    db.Project
      .create(Project)
      .then(dbProject => res.json(dbProject))
      .catch(err => res.status(422).json(err));
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