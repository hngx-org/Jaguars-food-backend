const Joi = require('joi');

// Define the schema for the request body
const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
  first_name: Joi.string()
    .max(50)
    .required(),
  last_name: Joi.string()
    .max(50)
    .required(),
  phone_number: Joi.string()
  .pattern(/^\d{10,11}$/) // Accepts phone numbers with 10 or 11 digits adjust the regex as needed
    .required(),
  organization_name: Joi.string()
    .max(100)
    .required(),
  lunch_price: Joi.number()
    .positive()
    .required(),
  currency: Joi.string()
    .valid('USD', 'EUR', 'GBP', 'JPY', 'CAD', 'NGN') // Add other valid currencies as needed
    .required(),
  currency_code: Joi.string()
    .length(3) // Assumes a 3-letter currency code; adjust as needed
    .required(),
});

// Validation function
function validateAdminRequestBody(req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validateAdminRequestBody;
