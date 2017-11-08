const
    User = require('../models/User.js'),
    signToken = require('../serverAuth.js').signToken


module.exports = {
    // list all users
    index: (req, res) => {
        User.find({}).populate('followers').populate('following').exec((err, users) => {
            res.json(users)
        })
    },

    // get one user
    show: (req, res) => {
        console.log('Current User: ')
        console.log(req.user)
        User.findById(req.params.id).populate('followers').populate('following').exec((err, user) => {
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
        console.log(req.body)
        User.findById(req.params.id, (err, user) => {
            Object.assign(user, req.body)
            user.save((err, updatedUser) => {
                const token = signToken(updatedUser)
                res.json({success: true, message: "User updated.", token})
            })
        })
    },

    // delete an existing user
    destroy: (req, res) => {
        User.findByIdAndRemove(req.params.id, (err, user) => {
            res.json({success: true, message: "User deleted.", user})
        })
    },

    // text search by users name

    search: (req, res)=>{
        console.log(req.body)
        User.find({$text: {$search: req.body.search}}).limit(20).exec((err, docs)=>{
            if (err) return res.json({success: false, message: "Search failed", err})
            res.json({success: true, message: "Search successful", docs})
        })
    },

    // add another user to current users following category

    follow: (req, res)=>{
        User.findById(req.params.id, (err, followingUser)=>{
            if (err) return res.json({success: false, message: "Could not find first user"})
            User.findById(req.body.id, (err, followedUser)=>{
                if (err) return res.json({success: false, message: "Could not find second user"})
                followingUser.following.push(req.body.id)
                followedUser.followers.push(req.params.id)
                followingUser.save((err, updatedFollowingUser)=>{
                    if (err) return res.json({success: false, message: "Failed to save following user", err})
                    followedUser.save((err, updatedFollowedUser)=>{
                        if (err) return res.json({success: false, message: "Failed to save followed user", err})
                        res.json({success: true, message: "Both Users updated and saved", updatedFollowingUser, updatedFollowedUser})
                    })
                })
            })  
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