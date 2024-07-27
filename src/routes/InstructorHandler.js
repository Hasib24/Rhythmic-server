const express = require("express");
const { verify } = require("jsonwebtoken");
const Course = require("../models/Course");
const router = express.Router();

router.post("/add-class", verify, async(req, res)=>{
    const classData = req.body
    const newCourse = new Course(classData)
    newCourse.save()
    res.send('Class saved success')
})

router.get("/my-classes", verify, async(req, res)=>{
    const instractorEmail = req.query.userEmail;
    
    if(instractorEmail){
        Course.find({instractorEmail: instractorEmail})
        .then(result =>res.send(result))
        .catch(error => console.log('my class find error', error))
    }
})

router.get("/aclass", async(req, res)=>{
    Course.findById(req.query.id)
    .then(result => res.send(result))
    .catch(error => console.log('Class find error by id', error))
})



module.exports = router

// router.get("/", async(req, res)=>{
//     res.send("ok")
// })