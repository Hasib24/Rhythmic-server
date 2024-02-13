const express = require("express");
const User = require("../models/User");
const generateToken = require("../middlewares/generateToken");
const router = express.Router();

router.post("/signup", async(req, res)=>{
    let userEmail = req.body.userEmail;



     User.find({ userEmail })
    .then(result =>{

        //user dose not exist
        const NewUser = new User({
            userName : req.body.userName,
            userEmail : req.body.userEmail,
            profileImageURL : req.body.profileImageURL
        })

        if (result?.length == 0) {

            NewUser.save().then(result => {
                console.log(`Bearer ${generateToken(result._id)}`)
                res.setHeader('Authorization', `Bearer ${generateToken(result._id)}`)
                res.send(result)
            })
        } else {
            console.log(`Bearer ${generateToken(result._id)}`)
            res.setHeader('Authorization', `Bearer ${generateToken(result[0]._id)}`)
            res.send(result)

        }
         
    })
    
})

//check user login 
router.get("/check", async(req, res)=>{
    console.log(req.query);
})

module.exports = router