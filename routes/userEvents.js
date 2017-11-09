const
    express = require('express'),
    userEventsRouter = new express.Router(),
    userEventsCtrl = require('../controllers/userEvents.js')

userEventsRouter.route('/:id')
    .get(userEventsCtrl.show)
    .patch(userEventsCtrl.update)
    .delete(userEventsCtrl.destroy)
    .post(userEventsCtrl.attending)

userEventsRouter.post('/:id/unattend', userEventsCtrl.notGoing)

module.exports = userEventsRouter