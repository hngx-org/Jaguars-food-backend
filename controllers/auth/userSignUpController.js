import asyncHandler from "express-async-handler";
import bcrypt from 'bcrypt'
import { verifyToken } from "../../utils/tokens.js";
import { User } from "../../models/user.model.js";
import { OrganizationInvites } from "../../models/Organization-invite-model.js";



const staffSignUp = asyncHandler(async(req,res) =>{
  const sentEmail = req.body.email
  const sentPassword = req.body.password
  const sentFirstName = req.body.first_name
  const sentLastName = req.body.last_name
  const sentPhone_number = req.body.phone_number
  const otp_token = req.body.otp_token

  if (!sentEmail || !sentPassword || !sentFirstName || !sentLastName || !sentPhone_number) {
      res.status(400).json({ error: "All section is required" });
      return;
    }
    const jwtToken = await OrganizationInvites.findOne({ where: { email: sentEmail } });
    console.log(jwtToken)
    console.log(jwtToken.dataValues.token)
    if(!jwtToken){
      return res.status(404).json({error:"invalid token"})
    }
    const decodedToken = verifyToken(jwtToken.dataValues.token)
    console.log(decodedToken.otp,otp_token)
    if(decodedToken.otp.toString() !== otp_token){
      return res.status(400).json({error:"invalid token"})
    }
    
    // if(decodedToken !== sentEmail){
    //   res.status(400)
    //   throw new Error("Invalid Token")
    // }
    try {
      const hashedPassword = await generateHashedPassword(sentPassword, 10)
      const newUser = await User.findOne({ where: { email: sentEmail } });
      if ( newUser) {
       return res.status(409).json({error:"Staff already Exist"});
      } else {
        const signUp = await User.create({ 
          email:sentEmail ,
          password_hash:hashedPassword,
          first_name:sentFirstName,
          last_name:sentLastName,
          phone_number:sentPhone_number});
        res.status(201).json({ message: "Signup Succefull", signUp });
      }
    } catch (error) {
      res.status(500)
      console.log(error)
      throw new Error("Server Error")
    }
  });

  
// const adminSignUp =  asyncHandler(async(req,res) =>
// {

// })

// const userLogin =  asyncHandler(async(req,res) =>
// {

// })


// Function to generate a hashed password
async function generateHashedPassword(userPassword, saltRounds) {
  try {
    const hashedPassword = await bcrypt.hash(userPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

// async function isMatch(userPassword, hashedPassword) {
//   try {
//     const match = await bcrypt.compare(userPassword, hashedPassword);
//     return match;
//   } catch (error) {
//     throw error;
//   }
// }

export {
  staffSignUp,
  generateHashedPassword,
};