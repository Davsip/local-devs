const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true },
    email: { type: String },
    given_name: { type: String },
    family_name: { type: String },
    picture: { type: String },
    gender: { type: String },
    nickname: { type: String },
    user_id: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    zip: { type: String },
    phone: { type: String },
    experience_level: { type: String },
    technologies: [ String ],
    experience_desc: { type: String },
    bio_desc: { type: String },
    isProfileCompleted: { type: Boolean, default: false }
  }, { _id: false });

const User = mongoose.model('User', userSchema);

module.exports = User;