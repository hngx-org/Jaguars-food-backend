import nodemailer from "nodemailer";
import crypto from "crypto";

// // Create a transporter object that will be used to send emails
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       user: "my@gmail.com",
//       pass: "password"
//   }
// });

export async function generateOTP() {
  const randomBytes = crypto.randomBytes(32);
  // Convert the random buffer to a hexadecimal string
  const token = randomBytes.toString("hex");
  // Extract the first 6 characters (12 hexadecimal digits) of the token
  const shortToken = token.substring(0, 6);
  return shortToken;
}

//   // Helper function to save invitation details to a database
// function saveInvitationToDatabase(email, token) {
//     // Implement  logic to save the invitation details to a database
//     const sql = 'INSERT INTO invitation_tokens (token) VALUES (?)';

//     dbConnection.query(sql, [token], (err, results) => {
//     if (err) {
//       console.error('Error saving token to database:', err);
//     } else {
//       console.log('Token saved to database:', token);
//     }
//   });
// }

// Helper function to send the invitation email
//FAVOUR CODES HERE
// export async function sendInvitationEmail(email) {
//     // Implement y logic to send the invitation email using a library like Nodemailer or
//     //third-party service
//     if(!email || typeof email !== 'string') return console.log("Email is required")
//     const otp = generateOTP();
//     // saveInvitationToDatabase(email, otp)
//     const mailOptions = {
//     to: email,
//     subject: 'Your OTP Verification Code',
//     text: `Your OTP code is: ${otp}`,
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error);
//     } else {
//       console.log('Email sent:', info.response);
//     }
//   });
// }

// export async function verifyOTPFromDB(email, enteredOTP) {
//   try {
//     // Query the database to retrieve the stored OTP for the given email
//     const [rows, fields] = await dbConnection.execute(
//       'SELECT otp FROM otp_table WHERE email = ?',
//       [email]
//     );

//     if (rows.length === 0) {
//       return false; // Email not found or OTP expired
//     }

//     const storedOTP = rows[0].otp;

//     return storedOTP === enteredOTP;
//   } catch (error) {
//     console.error('Error verifying OTP from DB:', error);
//     return false;
//   }
// }
