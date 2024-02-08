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
  mobileNumber: {
    type: String,
    default : ""
  },
  password: {
    type: String,
    required: true,
  },
  bookmarkedStudents: {
    type: [String],
    default: [],
  },
  bannedStudents: {
    type: [String],
    default: [],
  },
  scheduledClasses: {
    type: [String],
    default: [],
  },
  enrolledStudents: {
    type: [String],
    default: [],
  },
  chatIds: {
    type: [String],
    default: [],
  },
  courseCategoriesIds: {
    type: [String],
    default: [],
  },
  skillsIds: {
    type: [String],
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
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
  },
  teacherPerformanceId: {
    type: String,
    default: null,
  },
  preferredForId: {
    type: String,
    default: null,
  },
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
