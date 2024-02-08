const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const StudentSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    following: {
      type: String,
      default: "2323"
    },
    follower: {
      type: String,
      default: "5329"
    },
    mobile: {
      type : String,
      default : null
    },
    password: {
      type: String,
      default: ''
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    wishListedCourses: {
      type: [String],
      default: [],
    },
    purchasedCourses: {
      type: [String],
      default: [],
    },
    paymentIds: {
      type: [String],
      default: [],
    },
    paidInFull: {
      type: Boolean,
      default: false,
    },
    completed_course_certificate_id:{
      type: [String],
      default: [],
    },
    chatIds: {
      type: [String],
      default: [],
    },
    skillsIds: {
      type: [String],
      default: [],
    },
    full_name: {
      type: String,
      default : ""
    },
    secondary_email: {
      type: String,
      default : ""
    },
    description: {
      type: String,
      default : ""
    },
    location: {
      type: String,
      default : ""
    },
    description: {
      type: String,
      default : ""
    },
    job_title: { //
      type: String,
      default : ""
    },
    portfolio_website: {
      type: String,
      default: ""
    },
    documents : {
      type: [String],
      default: [],
    },
    projects: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String],
      default: [],
    },
    dateOfBirth : {
      type : Date,
      default : null
    },
    help_ticket_raised:{
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
    badgesIds: {
      type: [String],
      default: [],
    },
  });

  const Student = mongoose.model('Student', StudentSchema);

  module.exports = Student;
  