import jwt from "jsonwebtoken";

let JWT_SECRET = process.env.JWT_SECRET || "JAGUARJAGUARJAGUAR";

//generateAccessToken
export const generateAccessToken = (data) => {
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
};

//verifyAccessToken
export const verifyAccessToken = (req, res, next) => {
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
        req.user = user;
        next();
      }
    });
  });
};
