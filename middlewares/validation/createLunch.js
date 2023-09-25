const Joi = require('joi');

// Define the Joi schema for the request body
const createLunchSchema = Joi.object({
  receivers: Joi.array()
    .items(Joi.string()) // An array of strings for receiver IDs
    .min(1) // At least one receiver must be specified
    .required(),
  quantity: Joi.number()
    .integer()
    .positive()
    .required(),
  note: Joi.string()
    .max(255) // Adjust the maximum length as needed
    .optional(), // Note is optional
});

// Validation middleware
function validateCreateLunchRequest(req, res, next) {
  const { error } = createLunchSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validateCreateLunchRequest;
