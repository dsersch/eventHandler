const
    User = require('../models/User.js'),
    signToken = require('../serverAuth.js').signToken


module.exports = {
    // list all users
    index: (req, res) => {
        User.find({}, (err, users) => {
            res.json(users)
        })
    },

    // get one user
    show: (req, res) => {
        console.log('Current User: ')
        console.log(req.user)
        User.findById(req.params.id, (err, user) => {
            res.json(user)
        })
    },

    // create a new user
    create: (req, res) => {
        User.create(req.body, (err, user) => {
            if(err) return res.json({success: false, code: err.code})
            const token = signToken(user)
            res.json({success: true, message: "User created. Token attached.", token})
        })
    },

    // update an existing user
    update: (req, res) => {
        User.findById(req.params.id, (err, user) => {
            Object.assign(user, req.body)
            user.save((err, updatedUser) => {
                res.json({success: true, message: "User updated.", user})
            })
        })
    },

    // delete an existing user
    destroy: (req, res) => {
        User.findByIdAndRemove(req.params.id, (err, user) => {
            res.json({success: true, message: "User deleted.", user})
        })
    },

    // login route
    authenticate: (req, res) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if (!user || !user.validPassword(req.body.password)) {
                return res.json({success: false, message: "Invalid Credentials."})
            } 

            const token = signToken(user)
            res.json({success: true, message: "Token attached", token})
        })
    }
}