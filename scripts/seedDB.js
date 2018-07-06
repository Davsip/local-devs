const mongoose = require('mongoose');
const db = require('../models');
mongoose.Promise = global.Promise;

// This file empties the Projects collection and inserts the projects below

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/localdevs',
  {
    useMongoClient: true
  }
);

// ********************************************************
// Alter Schema to match Project data needed for local devs
// ********************************************************
const projectSeed = [
  {
    title: 'The Dead Zone',
    author: 'Stephen King',
    synopsis:
      'A number-one national best seller about a man who wakes up from a five-year coma able to see people',
    date: new Date(Date.now())
  }
];

db.Projects
  .remove({})
  .then(() => db.Projects.collection.insertMany(projectSeed))
  .then(data => {
    console.log(data.insertedIds.length + ' records inserted!');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
