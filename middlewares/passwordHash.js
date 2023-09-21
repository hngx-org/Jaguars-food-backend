import bcrypt from "bcrypt";

// hash user password
const hashPassword = async (req, res, next) => {
  try {
    if (req.body.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashedPassword;
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Password hashing failed" });
  }
};

// compare the password in req.body with a hashed password
const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (isMatch) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
