const express = require("express");
const router = express.Router();

router.get("/", async(req, res)=>{
    res.send("ok")
})


//     //Delete a class: instractor api calle by instractor only
//     app.delete('/deleteclass', verifyInstractor, async(req, res)=>{
     
//       const query = {_id : new ObjectId(req.query.id)}
//       const result = await classesCollection.deleteOne(query)
//       res.send(result);
//     })


//     // Update class by instractor 
//     app.get('/updateclass', verifyInstractor, async(req, res)=>{
//       const id = req.query.id
//       const quary = {_id : new ObjectId(id)}
//       const result = await classesCollection.findOne(quary)
//       res.send(result)
//     })


//     //add class api called from add class page of instractor dashboard
//     app.post('/addaclass', verifyInstractor, async(req, res)=>{
//       const classData = req.body;
//       const result = await classesCollection.insertOne(classData)
      
//       res.send(result)
//     })

//     // Called from instractor dashboard for myclasses data of instructor
//     app.get('/myclasses', verifyJWT, verifyInstractor, async(req, res)=>{
//       const email = req.query.email;
//       const result = await classesCollection.find({email : email}).toArray()
//       res.send(result)
//     })



module.exports = router