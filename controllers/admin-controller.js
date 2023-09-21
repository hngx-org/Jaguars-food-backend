//Admin or organization
import asyncHandler from 'express-async-handler';
import express from 'express';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { getToken, verifyToken } from '../utils/tokens.js';
import transporter from '../config/mailconfig.js';
const router = express.Router();
dotenv.config();

const createAdmin = asyncHandler(async (req, res) => {
    //
});

const createInvite = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const secretKey = process.env.JWT_SECRET;
    // Generate a unique invitation token
    generateInvitationToken(email, secretKey)
        .then((invitationToken) => {
            // Verify the invitation token
            verifyToken(invitationToken, secretKey)
                .then(() => {
                    // Sending invitation email
                    sendInvitationEmail(email, invitationToken);

                    // Returning a success response
                    res.json('Invitation sent successfully');
                })
                .catch((error) => {
                    console.error('Error verifying invitation token:', error);
                    res.status(500).json('Failed to generate invitation token. Please try again.');
                });
        })
        .catch((error) => {
            console.error('Error generating invitation token:', error);
            res.status(500).json('Failed to generate invitation token. Please try again.');
        });
});

// Helper function to generate a unique invitation token
//function generateInvitationToken(email, secretKey) {

//  const dateStamp = Date.now();
//  const hashedData = `${email}${dateStamp}`;
//  const token = crypto.createHmac('sha256', secretKey).update(hashedData).digest('hex');
//  return token;
//}
// const secretKey = crypto.randomBytes(32).toString('hex');// generate secret key. Save secret key in .env file and delete this line of code.

// Helper function to save invitation details to a database
//function saveInvitationToDatabase(email, invitationToken) {
// Implement  logic to save the invitation details to a database
//}

function generateInvitationToken(email, secretKey) {
    const userData = {
        email: email,
    };

    return new Promise((resolve, reject) => {
        getToken(userData)
            .then((token) => {
                resolve(token);
            })
            .catch((error) => {
                console.error('Error generating token:', error);
                reject(error);
            });
    });
}

// function to send the invitation email
function sendInvitationEmail(email, generateInvitationToken) {
    const mailOptions = {
        from: process.env.MAIL_FROM_ADDRESS,
        to: email,
        subject: 'Invitation to join Jaguar Food App',
        html: `<p>You have been invited to join Jaguar Food App. Please click on the link below to create your account.</p> 
				<p><a href="https://jaguars-food-backend.vercel.app/invite/${generateInvitationToken}">Create account</a></p>`,
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
