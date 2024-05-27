const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.SMPT_HOST,
  port: 587,
  auth: {
    user: process.env.SMPT_USERNAME,
    pass: process.env.SMPT_PASSWORD
  },
});

module.exports = transporter;
