const express = require('express');
const fs = require('fs');
const path = require('path');
const transporter = require('@helpers/smptUtils');
require('dotenv').config();


function getEmailTemplate(name, eventName, date, time) {
  const template = fs.readFileSync(path.join(__dirname, '../view/template/emailTemplate.html'), 'utf8');
  return template
    .replace('[Participant Name]', name)
    .replace('[Event Name]', eventName)
    .replace('[Event Date]', date)
    .replace('[Event Time]', time)

}

const sendMail =  (mailInfo) => {

  const { to, name, eventName, date, time } = mailInfo;
  const mailOptions = {
    from: 'smtp.freesmtpservers.com',
    to: to,
    subject: `Registration Confirmation for ${eventName}`,
    html: getEmailTemplate(name, eventName, date, time)
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
    console.log(error);
      return error;
    }
    return true;
  });
};

module.exports = {sendMail};
