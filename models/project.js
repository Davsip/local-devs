const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    locationZip: { type: String, required: true },
    budget: { type: Number, required: true },
    img: { type: String, required: false },
    reqSkills: [ String ], // Array of required skills
    seLed: { type: Boolean, required: true },
    startDate: { type: Date, required: true },
    compDate: { type: Date, required: true },
    compPerc: { type: Number, default: 0 },
    teamMembers: [ String ] // Array of user ID's 
  }, { _id: false });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;