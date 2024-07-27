const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/User");
const { verify } = require("jsonwebtoken");
const Course = require("../models/Course");

router.get("/", async (req, res) => {
  res.send("ok")
})

router.get("/user-list", verifyToken, async (req, res) => {
  User.find({}).then(result => res.send(result))
})

//update user role [ From Admin panal ]
router.patch('/update-user-role', verifyToken, async (req, res) => {
  const user = req.body
  const filter = { userEmail: user.userEmail }
  const options = { upsert: true }
  const updateDoc = {
    $set: {
      role: user.role
    }
  };
  const result = await User.updateOne(filter, updateDoc, options)
  res.send(result)
})

router.get("/manage-classes", verify, async(req, res)=>{
  Course.find({})
  .then(result => res.send(result))
  .catch(error => console.log('all class find error', error))
})

router.patch("/status-update", verify, async(req, res)=>{ 
  Course.findByIdAndUpdate( req.body.id, {approveStatus : req.body.approveStatus})
  .then(result =>{
    res.send('update success')
  })
  .catch(()=>console.log('update error'))
})

router.patch("/feedback-update", verify, async(req, res)=>{ 
  Course.findByIdAndUpdate( req.body.id, {feedback : req.body.feedback})
  .then(result =>{
    res.send(result)
  })
  .catch(()=>console.log('update error'))
})


module.exports = router;