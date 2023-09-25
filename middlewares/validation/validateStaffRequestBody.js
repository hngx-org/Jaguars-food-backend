const Joi = require('joi');

// Define the Joi schema for the request body
const signUpSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().max(50).required(),
  last_name: Joi.string().max(50).required(),
  phone_number: Joi.string().pattern(/^\d{10,11}$/).required(),
  otp_token: Joi.string().required(),
});

// Validation middleware
function validateStaffSignUpRequest(req, res, next) {
  const { error } = signUpSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validateStaffSignUpRequest;
