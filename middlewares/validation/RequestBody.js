const Joi = require('joi');

// Define the schema for the request body
const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Specify email validation rules
    .required(),
  password: Joi.string()
    .min(6) // Minimum password length
    .required(),
});

// Validation function
function validateLoginRequestBody(req, res, next) {
  // console.log(req.body);
  if (!req.body) {
    return res.status(400).json({ error: "Empty request body can't be processed!" })
  }
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required!" })
  }
try {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
} catch (error) {
  next(error);
}
}

module.exports = { validateLoginRequestBody }
