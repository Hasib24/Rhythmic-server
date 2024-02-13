const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    default : ""
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  coursesIds: {
    type: [String],
    default: [],
  },
  profileImageURL: {
    type: String,
    default: null,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  }
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
