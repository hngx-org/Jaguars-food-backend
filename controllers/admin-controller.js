//Admin or organization
import asyncHandler from "express-async-handler";
import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";
import nodemailer from 'nodemailer';

const router = express.Router();
dotenv.config();

//importing isAdmin to check if organization is an Admin 
import isAdmin from "../middlewares/isAdmin"
import {generateAccessToken ,verifyAccessToken} from "../utils/tokens"



const createAdmin = asyncHandler(async(req,res) =>
{

})

const createInvite = asyncHandler(async(req,res) =>
{

})

// API endpoint for sending an invitation
router.post(`/api/organizations/invite`, isAdmin, (req, res) => { 
  const { email } = req.body;

  
  const secretKey = process.env.JWT_SECRET;
  // Generate a unique invitation token
  generateInvitationToken(email, secretKey)
    .then((invitationToken) => {
      // Verify the invitation token
      verifyAccessToken(req,res,next,invitationToken, secretKey)
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

//function to send the invitation email
function sendInvitationEmail(email, generateInvitationToken) {
// Implement y logic to send the invitation email using a library like Nodemailer or 
//third-party service
}


function generateInvitationToken(email, secretKey) {
  const userData = {
    email: email,
  };

  return new Promise((resolve, reject) => {
    generateAccessToken(userData)
      .then((token) => {
        
        resolve(token);
      })
      .catch((error) => {
        console.error("Error generating token:", error);
        reject(error);
      });
  });
}
function sendInvitationEmail(email, generateInvitationToken) {
    
   
  }


export{
    createInvite,
    createAdmin,

}