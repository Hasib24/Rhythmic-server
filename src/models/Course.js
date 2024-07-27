const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
    },
    photoUrl:{
        type: String,
        required: true,
    },
    instractorEmail: {
        type: String,
        required: true
    },
    approveStatus: {
        type: String,
        default: "Panding"
    },
    totalSeat: {
        type: Number,
        required: true
    },
    totalEnrolls: {
        type: Number,
        default: 0
    },
    feedback: {
        type: String,
        default: ""
    },
    price : {
        type: Number,
        required : true
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
});

const Course = mongoose.model('Course_collections', CourseSchema);

module.exports = Course;
