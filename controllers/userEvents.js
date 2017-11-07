const
    UserEvent = require('../models/UserEvent.js')

module.exports = {

    // list all events for a user

    index: (req, res)=>{
        UserEvent.find({user: req.params.id}).populate('user').exec((err, userEvents)=>{
            if (err) return res.json({success: false, message: "Search failed", err})
            res.json(userEvents)
        })
    },

    // show one event

    show: (req, res)=>{
        UserEvent.findById(req.params.id).populate('user').exec((err, userEvent)=>{
            if (err) return res.json({success: false, message: 'Search failed', err})
            res.json(userEvent)
        })
    },

    // create an event

    create: (req, res)=>{
        var newUserEvent = new UserEvent(req.body)
        newUserEvent.user = req.params.id
        newUserEvent.save((err, userEvent)=>{
            if (err) return res.json({success: false, message: "Failed to create event"})
            res.json({success: true, message: "Event created", userEvent})
        })
    },
    // edit an event

    update: (req, res)=>{
        UserEvent.findById(req.params.id, (err, userEvent)=>{
            Object.assign(userEvent, req.body)
            userEvent.save((err, updatedEvent)=>{
                if (err) return res.json({success: false, message: "failed to update"})
                res.json({success:true, message: "Event updated", updatedEvent})
            })
        })
    },

    // delete an event

    destroy: (req, res)=>{
        UserEvent.findByIdAndRemove(req.params.id, (err, deletedEvent)=>{
            if (err) return res.json({success: false, message: "Failed to delete"})
            res.json({success: true, message: "Event deleted"})
        })
    }
}
