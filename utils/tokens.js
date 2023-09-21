import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

let JWT_SECRET = process.env.JWT_SECRET || "";

//GetToken
export const getToken = (data, exp) =>
  new Promise((accept, reject) => {
    jwt.sign(data, JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        accept(token);
      }
    });
  });

//Verifytoken
export const verifyToken = (token) =>
  new Promise((accept, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        // console.log("Data", decoded.email);
        accept(decoded);
      }
    });
  });
