const
    jwt = require('jsonwebtoken'),
    User = require('./models/User.js')

// create tokens

function signToken(user){
    const userData = user.toObject()
    delete userData.password
    return jwt.sign(userData, process.env.JWT_SECRET)
}

// function for verifying tokens

function verifyToken(req, res, next){
    const token = req.get('token') || req.body.token || req.query.token
    if (!token) return res.json({success: false, message: "No Token Provided."})
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedData)=>{
        if (err) return res.json({success: false, message: "Invalid Token."})
        User.findById(decodedData._id, (err, user)=>{
            if (!user) return res.json({success: false, message: "Invalid Token."})
            req.user = user
            next()
        })
    })
}

module.exports = {
    signToken,
    verifyToken
}