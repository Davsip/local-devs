const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    // _id: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    locationZip: { type: String, required: true },
    budget: { type: String, required: true },
    img: { type: String, required: false },
    reqSkills: [], // Array of required skills
    seLed: { type: Boolean, required: true },
    startDate: { type: Date, required: true },
    duration: { type: String, required: true },
    compPerc: { type: Number, default: 0 },
    teamMembers: [], // Array of Accepted Team Member User ID's 
    teamApplicants: [], // Array of Applicant User ID's for Project
    projectStage: { type: String, default: 'pending'},
    teamSize: { type: Number }
  });


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;