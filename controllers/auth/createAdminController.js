import asyncHandler from "express-async-handler";
import bcrypt from 'bcrypt'
import validateFields from '../../utils/validateUserFields.js';
import {User} from '../../models/user.model.js'
import {getToken} from '../../utils/tokens.js'

const orgSignUp = asyncHandler(async(req,res) =>
{
  const { email, password, first_name, last_name, phone_number, organization_name } = req.body;
   // Validate user input
  const validationErrors = validateFields({
    email,
    password,
    first_name,
    last_name,
    phone_number,
    organization_name
  });
  if (Object.keys(validationErrors).length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }
  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      phone_number,
      organization_name
    });

    // Generate a JWT token
    const token = getToken()
    res.status(201).json({ message: 'User created successfully' , token } );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
  
})


export default orgSignUp;