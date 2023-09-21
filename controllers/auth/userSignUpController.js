import asyncHandler from "express-async-handler";
import bcrypt from 'bcrypt'


const userSignUp = asyncHandler(async(req,res) =>{
  const sentEmail = req.body.Email
  const sentPassword = req.body.Password
  const sentFirstName = req.body.firstName
  const sentLastName = req.body.lastName
  const sentPhone_number = req.body.phone_number

  //Let create SQL statement to insert the User to theDatabase table Users
  const SQL = "INSERT INTO users (email,password,firstname,lastname,phonenumber) VALUES (?,?,?,?,?)"
  const Values = [sentEmail,sentPassword,sentFirstName,sentLastName,sentPhone_number]

   // Query to execute the sql statement stated above
    db.query(SQL, Values, (err, results) => {
      if (err) {
          res.send(err)
      }
      else {
          console.log('User inserted successfully!');
          res.send({ message: 'User added!' })
      }
  })
  if (!sentEmail || !sentPassword || !sentFirstName || !sentLastName || !sentPhone_number) {
      res.status(400).json({ error: "All section is required" });
      return;
    }
    try {
      const existingAdminUser = await User.findOne({ sentEmail,sentPassword,sentFirstName,sentLastName,sentPhone_number});
  
      if (existingAdminUser) {
        res.status(409).json({ error: "Admin already exists" });
      } else {
        const signUp = await User.create({ sentEmail,sentPassword,sentFirstName,sentLastName,sentPhone_number });
        res.status(201).json({ message: "Signup Succefull", signUp });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  
const adminSignUp =  asyncHandler(async(req,res) =>
{

})

const userLogin =  asyncHandler(async(req,res) =>
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

export {
  userSignUp,
  adminSignUp,
  userLogin,
  generateHashedPassword,
};