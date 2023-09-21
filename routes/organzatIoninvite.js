import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

//importing isAdmin to check if organization is an  Admin 
import isAdmin from "../middlewares/isAdmin"
import {getToken ,verifyToken} from "../utils/tokens"


const router = express.Router();
dotenv.config();

// API endpoint for sending an invitation
router.post(`/organizations/invite`, isAdmin, (req, res) => {
  // Parse request body and extract necessary details
  const { email } = req.body;

  const secretKey = process.env.SECRET_KEY
  // Generate a unique invitation token
  const invitationToken = generateInvitationToken(email, secretKey);

  // Sending invitation email
  sendInvitationEmail(email, invitationToken);

  // Returning  a success response
  res.json({ message: 'Invitation sent successfully' });
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

// Helper function to send the invitation email

function sendInvitationEmail(email, invitationToken) {
  // Implement y logic to send the invitation email using a library like Nodemailer or 
  //third-party service
}

function generateInvitationToken(email, secretKey){
  // Assuming you have required dependencies like `jsonwebtoken` and set the JWT_SECRET variable
const userData = {
  email: email,
};

getToken(userData)
  .then((token) => {
    //console.log("Generated token:", token);
    // Use the token as needed
  })
  .catch((error) => {
    //console.error("Error generating token:", error);
  });
  
  return getToken(userData);
};






export default router;