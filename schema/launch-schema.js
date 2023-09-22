const Joi = require("joi");

const RequiredString = Joi.string().required();
const UnrequiredString = Joi.string().allow("");

const RequiredNumber = Joi.number().required();

const CreateLunch = Joi.object({
  receivers: RequiredNumber,
  quantity: RequiredString,
  note: RequiredString,
});

module.exports = { CreateLunch };
