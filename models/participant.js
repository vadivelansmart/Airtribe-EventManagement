const mongoose = require('mongoose');
const participantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    eventId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Event'
    },
    registeredAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Participant", participantSchema)