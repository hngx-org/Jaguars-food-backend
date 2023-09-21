import express from "express";
const router = express.Router();

import isAdmin from '../middlewares/isAdmin.js'
  
  // API endpoint for sending an invitation
  // router.post('/organizations/invite', isAdmin, (req, res) => {
  //   // Parse request body and extract necessary details
  //   const { email } = req.body;
   
  //   // Generate a unique invitation token
  //   const invitationToken = generateInvitationToken();
  
  //   // Saving invitation details to a database 
  //   saveInvitationToDatabase(email, invitationToken);
  
  //   // Sending invitation email
  //   sendInvitationEmail(email, invitationToken);
  
  //   // Returning  a success response
  //   res.json({ message: 'Invitation sent successfully' });
  // });


export default router