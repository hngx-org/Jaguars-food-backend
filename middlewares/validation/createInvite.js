const Joi = require('joi');

// Define the Joi schema for the request body
const createInviteSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
});

// Validation middleware
function validateCreateInviteRequest(req, res, next) {
  const { error } = createInviteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validateCreateInviteRequest;
