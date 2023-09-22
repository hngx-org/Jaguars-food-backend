// import { getToken } from "../../utils/tokens.js";

const asyncHandler = require("express-async-handler");

const bcrypt = require("bcrypt");

const db = require("../../models/index.js"); // Update the path accordingly
const User = db.user; // Assuming the user model is exported as 'user' from user.model.js

const createAdminSignUp = asyncHandler(async (req, res) => {
  const { email, password, first_name, last_name, phoneNumber } = req.body;

  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.status(400);
      throw new Error("User with email already exists");
      // return res.status(400).json("user exist already");
      // throw new Error("User with email already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      email,
      passwordHash: hashedPassword,
      first_name,
      last_name,
      phoneNumber,
      isAdmin: true,
    });

    // Generate a JWT token
    // const token = getToken(); we dont need a return a token for sign up
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    console.error(error);
    res.status(500);
    throw new Error("There is a problem with the server xxx");
  }
});

module.exports = { createAdminSignUp };
