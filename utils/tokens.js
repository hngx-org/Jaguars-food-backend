const jwt = require("jsonwebtoken");

let JWT_SECRET = process.env.JWT_SECRET || "JAGUARJAGUARJAGUAR";

//generateAccessToken
const generateAccessToken = (data) =>
  jwt.sign(data, JWT_SECRET, { expiresIn: "7d" });

//verifyAccessToken
 const verifyAccessToken = (req, res, next) => {
  return new Promise((accept, reject) => {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err) return res.sendStatus(403);
        reject(err);
      } else {
        accept(decoded);
        req.user = decoded;
        next();
      }
    });
  });
};

module.exports={
  generateAccessToken,
  verifyAccessToken
}