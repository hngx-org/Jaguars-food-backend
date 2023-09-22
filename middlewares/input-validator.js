const Joi = require("joi");

exports.validateSchema = (schema) => {
  return async (req, res, next) => {
    try {
      const data = await schema.validateAsync(req.body, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
      });
      req.body = data;
      next();
    } catch (error) {
      const errors = error.details.map(({ message, path }) => {
        return { message, path: path[0] };
      });
      res.status(422).json({ status: "error", errors });
      console.log(errors);
    }
  };
};
