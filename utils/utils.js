const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { getToken } = require('../utils/tokens.js');
const db = require('../models/index');
const templates = require('../utils/emailTemplate.js');
const transporter = require('../config/mailConfig');

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const verifyPassword = (password, passwordHash) => {
  return bcrypt.compareSync(password, passwordHash);
};

async function generateInvitationToken(email, orgId) {
  // Generate a random 6-digit number
  const generatedToken = crypto.randomInt(100000, 1000000).toString();
  const jwt_token = await getToken({ otp: generatedToken, orgId });
  // Save the generated token to the database
  const token = await db.organizationInvites.findOne({
    where: { email: email },
  });
  if (token) {
    await db.organizationInvites.update(
      { token: jwt_token },
      { where: { email: email } }
    );
  } else {
    await db.organizationInvites.create({
      email: email,
      token: jwt_token,
      org_id: orgId,
    });
  }
  return generatedToken;
}

// function to send the invitation email
function sendInvitationEmail(data, invitationToken) {
  const subject = 'Free Lunch Invitation 😋🍽️';
  const mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS,
    to: data.email,
    subject: 'Free Lunch App Invitation',
    html: templates.getInvite(invitationToken, data.orgName, subject),
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent: ' + info.response);
        resolve(info);
      }
    });
  });
}

// function to send the invitation email
const sendPasswordResetOTPEmail = (data, invitationToken) => {
  const subject = 'Password Reset OTP';
  const mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS,
    to: data.email,
    subject,
    html: templates.getOtp(invitationToken, data.orgName, subject),
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        reject(error);
      } else {
        console.log('Email sent: ' + info.response);
        resolve(info);
      }
    });
  });
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateInvitationToken,
  sendInvitationEmail,
  sendPasswordResetOTPEmail,
};
