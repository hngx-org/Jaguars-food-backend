const Joi = require("joi");

exports.validateSchema = (schema) => {
  return async (req, res, next) => {
    try {
      const data = req.body; // Assuming the data to validate is in the request body

      const { error } = schema.validate(data);

      if (error) {
        const errorMessages = error.details.map(({ message, path }) => ({
          message,
          path,
        }));

        return res.status(400).json({ errors: errorMessages });
      }

      next(); // Move to the next middleware or route handler
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
