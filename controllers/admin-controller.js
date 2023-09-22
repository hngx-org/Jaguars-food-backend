//Admin or organization
import asyncHandler from "express-async-handler";
import express from "express";
import randomatic from "randomatic";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

//importing isAdmin to check if organization is an Admin
import { generateAccessToken, verifyAccessToken } from "../utils/tokens.js";

const createAdmin = asyncHandler(async (req, res) => {});

const createInvite = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const secretKey = process.env.JWT_SECRET;
  // Generate a unique invitation token
  sendInvitationEmail(email, invitationToken);
});

// API endpoint for sending an invitation
// router.post(`/api/organizations/invite`, isAdmin);

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

//function to send the invitation email
function sendInvitationEmail(email, generateInvitationToken) {
  const randomCharacters = randomatic("0a", 8);

  return `${req.hostname}/${randomCharacters}`
  // Implement y logic to send the invitation email using a library like Nodemailer or
  //third-party service
}

function generateInvitationToken(email, secretKey) {
  const userData = {
    email: email,
  };

  return generateAccessToken(userData);
}
// function sendInvitationEmail(email, generateInvitationToken) {}

export { createInvite, createAdmin };
