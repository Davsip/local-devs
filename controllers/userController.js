const db = require('../models');

// Defining methods for the userController
module.exports = {
  returnJSON: function(req, res) {
      res.status(200).json( 'api/users route works' );
  },
  findAll: function(req, res) {
    db.User
      .find(req.query)
      .sort({ date: -1 })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  find: function(req, res) {

    console.log(`----------\nAt userController Find Method\n----------`);

    db.User
      .find( { 'email': req.params.id }, (err, found) => {

        if ( err ){
          console.log(`user controller err = ${err}`);
          res.json(err);
        } else {
          console.log(`user controller length = ${found.length}`);
          res.json(found);
        }
      });

  },

  // Edit User Object to match User Schema
  // Initial user creation based on Auth0 user profile
  create: function(req, res) {
    const newUser = {
      email: req.body.email,
      given_name: req.body.given_name,
      family_name: req.body.family_name,
      picture: req.body.picture,
      gender: req.body.gender,
      nickname: req.body.nickname,
      user_id: req.body.sub,
      isAdmin: req.body.isAdmin,
      zip: req.body.zip,
      phone: req.body.phone,
      experience_level: req.body.experience_level,
      technologies: req.body.technologies,
      experience_desc: req.body.experience_desc,
      bio_desc: req.body.bio_desc,
    };

    console.log(`----------
    At userController Create Method
    ----------`);
    // console.log(req.body);
    console.log(newUser);
    // res.json('at userController Create Method');

    db.User
      .create(newUser, (err, dbUser ) => { 
        if (err) {
          return res.status(422).json(err);
        }

        console.log(`user added: ${dbUser}`);
        res.json(dbUser);
        
      })
  },
  update: function(req, res) {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .findById({ _id: req.params.id })
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
};