const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true,
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

  approvedClassIds: {
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
  isSuperAdmin: {
    type: Boolean,
    default: false,
  }
});

const Admin = mongoose.model('Admin_collections', adminSchema);

module.exports = Admin;
