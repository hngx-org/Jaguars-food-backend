import express from "express";
import crypto from "crypto";
// import { OrganizationInvites } from "../models/Organization-invite-model";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
router.use(express.json())

// Authentication middleware to ensure only admin users can access the endpoint
function adminAuthMiddleware(req, res, next) {
  // Implement admin authentication logic here, e.g., check if the user is admin 
  // If the user is not an admin, return an error response
  // If the user is an admin, call the next middleware
  //proceed to the invitation logic
}

// API endpoint for sending an invitation
router.post(`/organizations/invite`, adminAuthMiddleware, (req, res) => {
  // Parse request body and extract necessary details
  const { email } = req.body;

  // Generate a unique invitation token
  const invitationToken = generateInvitationToken();

  // Saving invitation details to a database 
  saveInvitationToDatabase(email, invitationToken);

  // Sending invitation email
  sendInvitationEmail(email, invitationToken);

  // Returning  a success response
  res.json({ message: 'Invitation sent successfully' });
});
// router.post('/token', (req,res)=>{
//   const body=req.body
//   const email= OrganizationInvites.create(body)
//   res.status(200).json({data:email})
//  })

// Helper function to generate a unique invitation token
function generateInvitationToken(email, secretKey) {
  // Implement logic to generate a unique invitation token
  // This token can be used to identify and verify the invitation when accepting it
  const timestamp = Date.now();
  const dataToHash = `${email}${timestamp}`;
  const token = crypto.createHmac('sha256', secretKey).update(dataToHash).digest('hex');
  return token;
}



console.log(generateInvitationToken(email, secretKey))

// Helper function to save invitation details to a database
function saveInvitationToDatabase(email, invitationToken) {
  // Implement  logic to save the invitation details to a database
}

// Helper function to send the invitation email
//FAVOUR CODES HERE 
function sendInvitationEmail(email, invitationToken) {
  // Implement y logic to send the invitation email using a library like Nodemailer or 
  //third-party service
}


export default router;