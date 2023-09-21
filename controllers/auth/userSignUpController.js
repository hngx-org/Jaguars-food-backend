import asyncHandler from "express-async-handler";
import bcrypt from 'bcrypt'
import { verifyToken } from "../../utils/tokens.js";
import { User } from "../models/user.model.js";


const userSignUp = asyncHandler(async(req,res) =>{
  const sentEmail = req.body.Email
  const sentPassword = req.body.Password
  const sentFirstName = req.body.firstName
  const sentLastName = req.body.lastName
  const sentPhone_number = req.body.phone_number
  const otp_token = req.body.otp_token

  if (!sentEmail || !sentPassword || !sentFirstName || !sentLastName || !sentPhone_number) {
      res.status(400).json({ error: "All section is required" });
      return;
    }
    const decodedToken = verifyToken(otp_token)
    if(decodedToken !== sentEmail){
      res.status(400)
      throw new Error("Invalid Token")
    }
    try {
      const hashedPassword = await generateHashedPassword(sentPassword, 10)
      const newUser = await User.findOne({ sentEmail });
      if ( newUser) {
        res.status(409).json({ error: "Admin already exists" });
      } else {
        const signUp = await User.create({ 
          email:sentEmail ,
          password_hash:hashedPassword,
          first_name:sentFirstName,
          last_name:sentLastName,
          phonenumber:sentPhone_number});
        res.status(201).json({ message: "Signup Succefull", signUp });
      }
    } catch (error) {
      res.status(500)
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
  userSignUp,
  adminSignUp,
  userLogin,
  generateHashedPassword,
};