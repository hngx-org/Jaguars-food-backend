import jwt from "jsonwebtoken"

let JWT_SECRET = process.env.JWT_SECRET || "JAGUARJAGUARJAGUAR";

//GetToken
export const getToken = (data) =>{
 return new Promise((accept, reject) => {
    jwt.sign(data, JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        accept(token);
      }
    });
  });
}
 

//Verifytoken
export const verifyToken = (token) =>{
  return new Promise((accept, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        // console.log("Data", decoded.email);
        accept(decoded);
      }
    });
  });
}
  
