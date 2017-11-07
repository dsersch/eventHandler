const
    express = require('express'),
    userEventsRouter = new express.Router(),
    userEventsCtrl = require('../controllers/userEvents.js')

userEventsRouter.route('/:id')
    .get(userEventsCtrl.show)
    .patch(userEventsCtrl.update)
    .delete(userEventsCtrl.destroy)

module.exports = userEventsRouter