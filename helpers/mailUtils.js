const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const {formatDate} = require('@helpers/util');

const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.EMAIL_API_KEY; 
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

function getEmailTemplate(name, eventName, date, time) {
   const template = fs.readFileSync(path.join(__dirname, '../view/template/emailTemplate.html'), 'utf8');
   return template
      .replace('[Participant Name]', name)
      .replace('[Event Name]', eventName)
      .replace('[Event Date]', formatDate(date))
      .replace('[Event Time]', time)

}
const sendMail = (mailInfo) => {
   const { to, name, eventName, date, time } = mailInfo;
   const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
   sendSmtpEmail.to = [{ email: to }];
   sendSmtpEmail.sender = { email: '75868c002@smtp-brevo.com', name: 'Airtribe' };
   sendSmtpEmail.subject = `Registration Confirmation for ${eventName}`
   sendSmtpEmail.textContent = `Registration Confirmation for ${eventName}`;
   sendSmtpEmail.htmlContent = getEmailTemplate(name, eventName, date, time);
   apiInstance.sendTransacEmail(sendSmtpEmail)
      .then(data => {
         return true;
      })
      .catch(error => {
         return false
      });
}
module.exports = { sendMail };
