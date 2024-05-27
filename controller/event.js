const express = require('express');
const { verifyToken } = require('@middleware/jwtMiddleware')
const { eventValidator, isNewRegisterValidator } = require('@helpers/util');
const {sendMail} =  require('@helpers/mailUtils')
const Event = require('@models/event');
const Participant = require('@models/participant')
const event = express.Router();


event.post('/', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(401).json({ message: "User cannot create Events please contact Admin" });
        }
        const event = new Event(req.body);
        const saveEvent = await event.save(event);
        if (saveEvent === null) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        return res.status(200).json({ message: "Event Successfully Registered" });
    } catch (err) {
        res.status(400).json(err);
    }
})

event.put('/:id', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(401).json({ message: "user cannot update Events details please contact admin" });
        }
        const { id } = req.params
        const isEventValid = await eventValidator(id);
        if (!isEventValid) {
            return res.status(400).json({ message: "Invalid Event Id" })
        }
        const updateEvent = await Event.findByIdAndUpdate(id, req.body)
        if (updateEvent === null) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        return res.status(200).json({ message: "Event Successfully updated" });
    } catch (err) {
        res.status(400).json(err)
    }
})
event.delete('/:id', verifyToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(401).json({ message: "user cannot delet Events details please contact admin" });
        }
        const { id } = req.params
        const isEventValid = await eventValidator(id);
        if (!isEventValid) {
            return res.status(400).json({ message: "Invalid Event Id" })
        }
        const deleteEvent = await Event.findByIdAndDelete(id)
        if (deleteEvent === null) {
            return res.status(400).json({ message: "Invalid Event Id" });
        }
        return res.status(200).json({ message: "Event Successfully deleted" });
    } catch (err) {
        res.status(400).json(err)
    }
})

event.post('/:id/register', verifyToken, async (req, res) => {
    try {
        const { id } = req.params
        const {user }= req;
        const isEventValid = await eventValidator(id);
        if (!isEventValid) {
            return res.status(400).json({ message: "Invalid Event Id" })
        }
        const isNewRegister = await isNewRegisterValidator(id, user.id)
        if(isNewRegister) {
            return res.status(400).json({ message: "You have Already registered for this Event."});
        }
        const participant = new Participant({
            userId: req.user.id,
            eventId: id
        });
        const registerEvent = await participant.save(participant);
        if (registerEvent === null) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        const updateEvent = await Event.findByIdAndUpdate(id, {$inc: {participantCount :1}}, { new: true })
       const mailInfo = {
        to : user.email,
        name: user.fullName,
        eventName: updateEvent.eventName,
        date: updateEvent.date,
        time: updateEvent.time
       }
        const isMailSent = await sendMail(mailInfo);
        console.log(isMailSent)
        return res.status(200).json({ message: `Congrulation you have Successfully Registered for the Event.`, event: updateEvent});
    } catch (err) {
        res.status(400).json(err)
    }
})



module.exports = event;