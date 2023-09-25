const Joi = require('joi');

// Define the Joi schema for the request body
const redeemLunchSchema = Joi.object({
  lunchId: Joi.string() // Lunch ID is a string
    .required(),
});

// Validation middleware
function validateRedeemLunchRequest(req, res, next) {
  const { error } = redeemLunchSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validateRedeemLunchRequest;
