const express = require("express");
const router = express.Router();

router.get("/", async(req, res)=>{
    res.send("ok")
})


//      //to show approved class to the client side to all client and student
//     app.get('/allapprovedclasses', async(req, res)=>{
//       const query = {approveStatus : 'approved' }
//       const result = await classesCollection.find(query).toArray()
//       res.send(result)
//     })

module.exports = router