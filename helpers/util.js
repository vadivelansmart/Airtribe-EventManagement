const moment = require('moment');
const Event = require('@models/event');
const Participant = require('@models/participant')
const registrationValidator = (data) => {
    return Object.keys(data).length > 0 && data.password && data.password !== '';
}
const loginValidator = (data) => {
    return Object.keys(data).length > 0 && data.email && data.email !== '' && data.password && data.password !== '';
}
const eventValidator = async(eventId) => {
    const event = await Event.findById(eventId);
    return !(!event);
}
const participantValidator = async(eventId) => {
    const event = await Participant.findById(eventId);
    return !(!event);
}
const isNewRegisterValidator = async(eventId, userId) => {
    const event = await Participant.findOne({eventId: eventId, userId: userId});
    return !(!event);
}
const formatDate = (date) => {
    return  moment(date).format('DD/MM/YYYY');
}
module.exports = { registrationValidator, loginValidator, eventValidator, participantValidator,isNewRegisterValidator, formatDate }