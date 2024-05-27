const mongoose = require('mongoose');

const eventSchema =  new mongoose.Schema({
    eventName: {
        type: String,
        required: [true, "Event Name is required"]
    },
    description: {
        type: String,
        required: [true, "Event Description is required"]
    },
    participantCount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: [true, "Event date is required"],
        validate: {
            validator: (date) => {
                const eventDate = new Date(date);
                const currentDate =  new Date();
                return currentDate < eventDate ;
            },
            message: 'Date cannot have passed !'
        },
    },
    time: {
        type: String,
        required: [true, "Event Time  is required"],
        validate: {
            validator: (time) => {
                return /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i.test(time);
            },
            message: '{VALUE} is not a valid time format! Time should be in hh:mm AM/PM format.'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Event", eventSchema);