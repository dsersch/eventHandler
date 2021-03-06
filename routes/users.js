const
    express = require('express'),
    usersRouter = new express.Router(),
    usersCtrl = require('../controllers/users.js'),
    userEventsCtrl = require('../controllers/userEvents.js')
    verifyToken = require('../serverAuth.js').verifyToken

usersRouter.route('/')
    .get(usersCtrl.index)
    .post(usersCtrl.create)

usersRouter.post('/search', usersCtrl.search)

usersRouter.post('/authenticate', usersCtrl.authenticate)

usersRouter.use(verifyToken)

usersRouter.route('/:id')
    .get(usersCtrl.show)
    .patch(usersCtrl.update)
    .delete(usersCtrl.destroy)

usersRouter.route('/:id/events')
    .get(userEventsCtrl.index)
    .post(userEventsCtrl.create)

usersRouter.post('/:id/follow', usersCtrl.follow)
usersRouter.post('/:id/unfollow', usersCtrl.unfollow)

module.exports = usersRouter