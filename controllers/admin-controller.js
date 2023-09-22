//Admin or organization
import asyncHandler from 'express-async-handler';
import express from 'express';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { getToken } from '../utils/tokens.js';
import transporter from '../config/mailconfig.js';
import { OrganizationInvites } from '../models/Organization-invite-model.js';
const router = express.Router();
dotenv.config();

const createAdmin = asyncHandler(async (req, res) => {
    //
});

const createInvite = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ error: 'Email is required' });
    }

    // Generate a unique invitation token
    const invitationToken = await generateInvitationToken(email);

    // Send the invitation email
    sendInvitationEmail(email, invitationToken);
    res.json({ message: 'Invitation sent successfully', statusCode: 200 });
});

async function generateInvitationToken(email) {
    // Generate a random 6-digit number
    const generatedToken = crypto.randomInt(100000, 1000000);
    const jwt_token = await getToken(generatedToken);

    // Save the generated token to the database
    const token = await OrganizationInvites.findOne({ where: { email: email } });
    if (token) {
        await OrganizationInvites.update({ token: jwt_token }, { where: { email: email } });
    } else {
        await OrganizationInvites.create({ email: email, token: jwt_token });
    }

    return generatedToken;
}

// function to send the invitation email
function sendInvitationEmail(email, invitationToken) {
    console.log('Token:', invitationToken);
    const mailOptions = {
        from: process.env.MAIL_FROM_ADDRESS,
        to: email,
        subject: 'Invitation to join Jaguar Food App',
        html: `<p>You have been invited to join Jaguar Food App. Use the token below to create your account.</p>
				<p>Token: ${invitationToken}</p>
				`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export { createInvite, createAdmin };
