import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import validateFields from "../../utils/validateUserFields.js";
import { User } from "../../models/user.model.js";
import { json } from "sequelize";
// import { getToken } from "../../utils/tokens.js";

const createAdminSignUp = asyncHandler(async (req, res) => {
  const { email, password, first_name, last_name, phone_number } = req.body;
  // Validate user input
  const validationErrors = validateFields({
    email,
    password,
    first_name,
    last_name,
    phone_number,
  });

  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }
  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "user with this email already exist" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      email,
      password_hash: hashedPassword,
      first_name,
      last_name,
      phone_number,
      isAdmin: true,
    });

    // Generate a JWT token
    // const token = getToken(); we dont need a return a token for sign up
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error) {
    res.status(500);
    throw new Error("There is a problem with the server");
  }
});

export { createAdminSignUp };
