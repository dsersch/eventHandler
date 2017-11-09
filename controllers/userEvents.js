const
    UserEvent = require('../models/UserEvent.js')

module.exports = {

    // list all events for a user

    index: (req, res)=>{
        UserEvent.find({user: req.params.id}).populate('user').populate('attending').exec((err, userEvents)=>{
            if (err) return res.json({success: false, message: "Search failed", err})
            res.json(userEvents)
        })
    },

    // show one event

    show: (req, res)=>{
        UserEvent.findById(req.params.id).populate('user').populate('attending').exec((err, userEvent)=>{
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

    // attending event

    attending: (req, res)=>{
        var flag = false
        UserEvent.findById(req.params.id, (err, userEvent)=>{
            if (err) return res.json({success: true, message: "Failed to find Event", err})
            userEvent.attending.forEach((el)=>{
                if (req.body.id == el) {
                    flag = true
                }
            })
            if (flag) {
                res.json({success: false, message: "already attending", attendingUpdated: userEvent})
            } else {
                userEvent.attending.push(req.body.id)
                userEvent.save((err, attendingUpdated)=>{
                    if (err) return res.json({success: false, message: "Failed to save attending update", err})
                    res.json({success: true, message: "Attendance updated", attendingUpdated})
                })
            }
        })
    },

    // change of heart, not going...

    notGoing: (req, res)=>{
        UserEvent.findById(req.params.id, (err, userEvent)=>{
            if (err) res.json({success: false, message: "Failed to find event", err})
            var index = userEvent.attending.findIndex((attendingUserId)=>{
                return attendingUserId == req.body.id
            })
            userEvent.attending.splice(index, 1)
            userEvent.save((err, event)=>{
                if (err) return res.json({success: false, message: "Failed to save event", err})
                res.json({success: true, message: "Removed from attending", event})
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
