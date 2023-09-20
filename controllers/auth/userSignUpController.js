import asyncHandler from "express-async-handler";
import bcrypt from 'bcrypt'


const userSignUp = asyncHandler(async(req,res) =>
{

})

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

export default userSignUp