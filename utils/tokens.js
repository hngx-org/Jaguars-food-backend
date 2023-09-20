const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
let { JWT_SECRET } = process.env;
let exp = 1000 * 60 * 60;

const getToken = (data, exp) =>
  new Promise(function (accept, reject) {
    jwt.sign(data, JWT_SECRET, { expiresIn: exp }, (err, token) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        accept(token);
      }
    });
  });

module.exports = getToken;

const verifyToken = (token) =>
  new Promise(function (accept, reject) {
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err) {
        reject(err);
      } else {
        // console.log("DAta", decoded.email);
        accept(decoded);
      }
    });
  });

module.exports = verifyToken;
