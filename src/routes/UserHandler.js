const express = require("express");
const User = require("../models/User");
const generateToken = require("../middlewares/generateToken");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/google-reg", generateToken, async (req, res) => {
    const NewUser = new User({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        // profileImageURL: req.body.profileImageURL
        // password: req.body.password
    })

    User.findOne({ userEmail: req.body.userEmail }).select({ password: 0, _id: 0, __v: 0, paymentIds: 0 })
        .then(result => {
            if (result.length == 0) {
                NewUser.save().then(result => {
                    let userObj = result.toObject();
                    // Remove the password and _id fields
                    delete userObj.password;
                    delete userObj._id;
                    delete userObj.__v;
                    delete userObj.paymentIds;
                    // Send the modified object
                    res.send(userObj);
                })
            } else {
                res.send(result)
            }
        })
})

router.post("/email-reg", generateToken, async (req, res) => {

    const NewUser = new User({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        // profileImageURL: req.body.profileImageURL
        password: req.body.password
    })

    User.findOne({ userEmail: req.body.userEmail }).select({ password: 0, _id: 0, __v: 0, paymentIds: 0 })
        .then(result => {
            if (!result) {
                NewUser.save().then(result => {
                    let userObj = result.toObject();
                    // Remove the password and _id fields
                    delete userObj.password;
                    delete userObj._id;
                    delete userObj.__v;
                    delete userObj.paymentIds;
                    // Send the modified object
                    res.send(userObj);
                })
            } else {
                res.send(result)
            }
        })

})

router.get("/google-login", generateToken, async (req, res) => {
    let userEmail = req.query.userEmail;
    let newUser = req.query.newUser;


    User.findOne({ userEmail }).select({ password: 0, _id: 0, __v: 0, paymentIds: 0 })
        .then(result => {

            if (result.length == 0) {
                res.status(401).send({ error: true, message: 'UnAothorized access' })
            } else {
                res.send(result)
            }
        })
})

router.get("/email-login", generateToken, async (req, res) => {
    let userEmail = req.query.userEmail;
    let newUser = req.query.newUser;


    User.findOne({ userEmail }).select({ password: 0, _id: 0, __v: 0, paymentIds: 0 })
        .then(result => {

            if (result.length == 0) {
                res.status(401).send({ error: true, message: 'UnAothorized access' })
            } else {
                res.send(result)
            }
        })
})


//check user login 
router.get("/check", verifyToken, generateToken, async (req, res) => {

    User.findOne({ userEmail: req.query.userEmail }).select({ password: 0, _id: 0, __v: 0, paymentIds: 0 })
        .then(result => {
            res.send(result)
        })
})


module.exports = router