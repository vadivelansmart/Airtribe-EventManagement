require('dotenv').config();
require('module-alias/register');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('@controller/user')
const eventRoutes = require('@controller/event')
const participantRoutes = require('@controller/participant')
const path = require('path');
const app = express();
app.use(express.json())
app.use('/', userRoutes);
app.use('/event', eventRoutes);
app.use('/participant', participantRoutes);

try {
    mongoose.connect(process.env.MONGO_URL)
} catch (err) {
    console.log(err)
}

app.listen(3000, () => {
    console.log("App is up and running");
})