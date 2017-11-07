const
    mongoose = require('mongoose'),
    UserEventSchema = new mongoose.Schema({
        title: {type: String, required: true},
        body: {type: String, required: true},
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    }, {timestamps: true})

module.exports = mongoose.model("UserEvent", UserEventSchema)