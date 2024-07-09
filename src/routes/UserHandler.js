const express = require("express");
const User = require("../models/User");
const generateToken = require("../middlewares/generateToken");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/signup", async (req, res) => {
    let userEmail = req.body.userEmail;

    User.find({ userEmail })
        .then(result => {

            //user dose not exist
            const NewUser = new User({
                userName: req.body.userName,
                userEmail: req.body.userEmail,
                // profileImageURL: req.body.profileImageURL
                password: req.body.password
            })

            if (result?.length == 0) {

                NewUser.save().then(result => {
                    // console.log(`Bearer ${generateToken(result._id)}`)
                    res.setHeader('Authorization', `Bearer ${generateToken(result.userEmail)}`)
                    res.send(result)
                })
            } else {
                // console.log(`Bearer ${generateToken(result._id)}`)
                res.setHeader('Authorization', `Bearer ${generateToken(result[0].userEmail)}`)
                res.send(result)

            }

        })

})

router.get("/signin", generateToken, async (req, res) => {
    let userEmail = req.query.userEmail;
    User.find({ userEmail })
        .then(result => {
            if (result.length == 0) {
                res.status(401).send({ error: true, message: 'UnAothorized access' })
            } else {
                res.send(result);
            }
        })
})



//check user login 
router.get("/check", verifyToken)


//user list
router.get("/list", verifyToken, async (req, res) => {
    const userList = User.find({})
    res.send(userList)
})

module.exports = router