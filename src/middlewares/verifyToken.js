const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = (req, res) => {
  const authorizatnHeader = req.headers.authorizatn;

  if (!authorizatnHeader) {
    return res.status(401).send({ error: true, message: 'UnAothorized access' })
  }

  const token = authorizatnHeader.split(" ")[1]
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).send({ error: true, message: 'UnAothorized token' })
    }
    req.decoded = decoded;
    User.findOne({userEmail : decoded.userEmail})
    .then((result)=>{
      res.send(result)
    })
  })
}

module.exports = verifyToken;