const mongoose = require('mongoose');
const db = require('../models');
mongoose.Promise = global.Promise;

// This file empties the Projects collection and inserts the projects below

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/localdevs',
);

// ********************************************************
// Alter Schema to match Project data needed for local devs
// ********************************************************
const projectSeed = [
  {
    name: 'Local Devs',
    desc: 'In this project we will be build a platform that allows local freelance developers the opportunity to apply for and work on real world applications posted by local companies.',
    locationZip: 75219,
    budget: 10000,
    img: null,
    reqSkills: [ 'React', 'MongoDB', 'Express', 'Node' ],
    seLed: true,
    startDate: new Date('July 1, 2018 03:24:00'),
    compDate: new Date('July 18, 2018 06:24:00'),
    compPerc: 0,
    teamMembers: null
  }
];

db.Project
  .remove({})
  .then(() => db.Project.collection.insertMany(projectSeed))
  .then(data => {
    console.log(data.insertedIds.length + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
