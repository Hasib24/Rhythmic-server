const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const verifyToken = require("../middlewares/verifyToken");
const User = require("../models/User");


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

//     // send feedback by admin
//     app.patch('/feedback', async(req, res)=>{
//       const feedbackData = req.body;
//       // console.log(feedbackData);
//       const query = { _id : new ObjectId(feedbackData.id) }
//       const updateDoc = {
//         $set: {
//           feedback : feedbackData.feedback
//         }
//       }
//       const options = { upsert: true };
//       const result = await classesCollection.updateOne(query, updateDoc, options)
//       res.send(result)
//     })

//     //update status: approved or denyed called from admin dashboard
//     app.patch('/statusupdate', verifyAdmin, async(req, res)=>{
//       const statusData = req.body
//       const query = { _id : new ObjectId(statusData.id) }
//       const updateDoc = {
//         $set: {
//           approveStatus : statusData.approveStatus
//         }
//       }
//       const options = { upsert: true };
//       const result = await classesCollection.updateOne(query, updateDoc, options)
//       res.send(result)

//     })


//     //Delete a class: instractor api calle by instractor only
//     app.delete('/deleteclass', verifyInstractor, async(req, res)=>{

//       const query = {_id : new ObjectId(req.query.id)}
//       const result = await classesCollection.deleteOne(query)
//       res.send(result);
//     })


//     //Called from admin penel to manage users
//     app.get('/users', verifyJWT, verifyAdmin, async (req, res)=>{
//       const result = await usersCollection.find().toArray()
//       res.send(result)
//     })

//     //Callde by an admin to load all classes data
//     app.get('/allclasses', verifyJWT, verifyAdmin, async(req, res)=>{
//       const result = await classesCollection.find().toArray()
//       res.send(result)
//     })


module.exports = router;