const jwt = require('jsonwebtoken');

const generateToken = (req, res, next) =>{
    let userEmail = req.query.userEmail;
    if(!userEmail){
        console.log(userEmail);
        return res.status(401).send({ error: true, message: 'UnAothorized access' })
    }

    const accessToken = jwt.sign({userEmail}, process.env.JWT_ACCESS_TOKEN_SECRET, {expiresIn : '24h'})
    // const refreshToken = jwt.sign({_id}, process.env.JWT_REFRESH_TOKEN_SECRET, {expiresIn : '168h'})
    res.setHeader('Authorization', `Bearer ${accessToken}`)
    next()
    
}

module.exports = generateToken;