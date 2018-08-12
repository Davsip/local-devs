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
    reqSkills: [ 'React', 'MongoDB', 'HTML', 'CSS','Node', 'Bootstrap' ],
    seLed: true,
    startDate: new Date('July 1, 2018 03:24:00'),
    duration: 3,
    compPerc: 0,
    teamMembers: [ 'jcwarner@gmail.com', 'baber9@gmail.com' ],
    teamApplicants: [],
    projectStage: 'started',
    teamSize: 4
  },
  {
    name: 'Mobile Weather App',
    desc: 'Two developers needed for a five month project.',
    locationZip: 75214,
    budget: 20000,
    img: null,
    reqSkills: [ 'Python', 'HTML', 'JavaScript', 'Sass', 'JQuery', 'React' ],
    seLed: true,
    startDate: new Date('July 15, 2018 03:24:00'),
    duration: 5,
    compPerc: 0,
    teamMembers: [ 'jcwarner@gmail.com', 'baber9@gmail.com' ],
    teamApplicants: [ 'jcwarner@gmail.com', 'baber9@gmail.com' ],
    projectStage: 'started',
    teamSize: 2
  },
  {
    name: 'AD Web App',
    desc: 'Four developers needed for an eleven month project.',
    locationZip: 75219,
    budget: 10000,
    img: null,
    reqSkills: [ 'C#', 'HTML', 'JavaScript', 'CSS', 'JQuery', 'Angular' ],
    seLed: true,
    startDate: new Date('August 1, 2018 03:24:00'),
    duration: 11,
    compPerc: 0,
    teamMembers: [],
    teamApplicants: [ 'jcwarner@gmail.com', 'baber9@gmail.com' ],
    projectStage: 'pending',
    teamSize: 4
  },
  {
    name: 'Tuition System',
    desc: 'Two developers needed for a five month project.',
    locationZip: 75219,
    budget: 10000,
    img: null,
    reqSkills: [ 'JavaScript', 'Handlebars', 'HTML', 'Bootstrap', 'CSS', 'Node', 'MongoDB' ],
    seLed: true,
    startDate: new Date('August 13, 2018 03:24:00'),
    duration: 5,
    compPerc: 0,
    teamMembers: [],
    teamApplicants: [],
    projectStage: 'pending',
    teamSize: 4
  },
  {
    name: 'AD Network Web App',
    desc: 'Client needs clean, dynamic Active Directory personnel resource site.  This is an eleven month project and the team will consist of four developers. Client expects developers to have great teamwork and communication skills. Weekly deliverables are expected.',
    locationZip: 75219,
    budget: 100000,
    img: null,
    reqSkills: [ 'C#', 'HTML', 'JavaScript', 'CSS', 'JQuery', 'Angular' ],
    seLed: true,
    startDate: new Date('September 10, 2018 03:24:00'),
    duration: 11,
    compPerc: 0,
    teamMembers: [],
    teamApplicants: [],
    projectStage: 'pending',
    teamSize: 4
  },
  {
    name: 'Website Redesign',
    desc: "For this project, five developers will be working with one of our Solutions Experts to redesign the client's current website for mobility.  This project is expected to take seven months.  Need to be able to work well in a team.  Weekly deliverables are expected.",
    locationZip: 75219,
    budget: 150000,
    img: null,
    reqSkills: [ 'JavaScript', 'React', 'HTML', 'Bootstrap', 'Node' ],
    seLed: true,
    startDate: new Date('July 23, 2018 03:24:00'),
    duration: 7,
    compPerc: 0,
    teamMembers: [],
    teamApplicants: [],
    projectStage: 'pending',
    teamSize: 5
  },
  {
    name: 'Company ReBranding',
    desc: "Client is looking for two graphics design experts for company re-branding. Your team will work directly with the client to discuss culture and history of the company to come up with a clean design.  This project will be three months.",
    locationZip: 75219,
    budget: 4000,
    img: null,
    reqSkills: [ 'Photoshop', 'Illustrator' ],
    seLed: true,
    startDate: new Date('July 20, 2018 03:24:00'),
    duration: 3,
    compPerc: 0,
    teamMembers: [],
    teamApplicants: [],
    projectStage: 'pending',
    teamSize: 2
  },
  {
    name: 'Accounting System',
    desc: "For this project, you'll work with seven other developers and a Solutions Expert to overhaul our client's current accounting system.  This project will last eleven months and will require a good amount of collaboration.  Excellent written and oral communication required.  Weekly deliverables will be required.",
    locationZip: 75219,
    budget: 125000,
    img: null,
    reqSkills: [ 'Java', 'MySQL', 'CSS', 'JavaScript', 'JQuery', 'Bootstrap' ],
    seLed: true,
    startDate: new Date('October 11, 2018 03:24:00'),
    duration: 11,
    compPerc: 0,
    teamMembers: [],
    teamApplicants: [],
    projectStage: 'pending',
    teamSize: 7
  },
  {
    name: 'Customer Feedback Site',
    desc: "Our client is wanting two developers to create a customer feedback site.  This project will take 5 months.",
    locationZip: 75219,
    budget: 10000,
    img: null,
    reqSkills: [ 'Python', 'MongoDB', 'Angular', 'HTML', 'Bootstrap', 'Sass' ],
    seLed: true,
    startDate: new Date('July 1, 2018 03:24:00'),
    duration: 5,
    compPerc: 0,
    teamMembers: [],
    teamApplicants: [],
    projectStage: 'pending',
    teamSize: 2
  },
  {
    name: 'Inventory System',
    desc: "Client is looking for 3 strong developers to build a web application for tracking their inventory. The application will be a complete inventory management tool that allows the Client manage all aspects related to inventory. Close contact with the Client will be needed to ensure all deliverables are met.",
    locationZip: 75219,
    budget: 10000,
    img: null,
    reqSkills: [ 'React', 'MongoDB', 'HTML', 'CSS','Node', 'Bootstrap' ],
    seLed: true,
    startDate: new Date('Janurary 25, 2018 03:24:00'),
    duration: 5,
    compPerc: 0,
    teamMembers: [ 'jcwarner@gmail.com', 'baber9@gmail.com' ],
    teamApplicants: [],
    projectStage: 'completed',
    teamSize: 3
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
