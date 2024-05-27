const express = require('express');
const participant = express.Router();
const { verifyToken } = require('@middleware/jwtMiddleware')
const { participantValidator } = require('@helpers/util');
const Participant = require('@models/participant')
const Event = require('@models/event');


participant.delete('/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params
        const isParticipantValid = await participantValidator(id);
        if (!isParticipantValid) {
            return res.status(400).json({ message: "Invalid Event Id" })
        }
        const deletedParticipant = await Participant.findByIdAndDelete(id);
        if (deletedParticipant === null) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        const eventId = deletedParticipant.eventId;
        const updateParticipantCount = await Event.findByIdAndUpdate(eventId, {$inc: {participantCount :-1}}, { new: true })
        return res.status(200).json({ message: `The registration has been successfully removed.`, event: updateParticipantCount});
    } catch (err) {
        res.status(400).json(err)
    }
})


module.exports = participant;