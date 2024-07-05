const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const UserSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: ''
    },
    role:{
      type : String,
      default : "Student"
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
    isActive: {
      type: Boolean,
      default: true,
    },
    // profileImageURL: {
    //   type: String,
    //   default: null,
    // },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  });

  const User = mongoose.model('User collections', UserSchema);

  module.exports = User;
  