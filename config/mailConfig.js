const nodemailer = require('nodemailer');
const {
	MAIL_USERNAME,
	MAIL_HOST,
	MAIL_PASSWORD,
	MAIL_FROM_ADDRESS,
} = require('../utils//constants');

// Configure nodemailer
const transporter = nodemailer.createTransport({
	host: MAIL_HOST,
	port: 2525,
	auth: {
		user: MAIL_USERNAME,
		pass: MAIL_PASSWORD,
	},
});

module.exports = transporter;
