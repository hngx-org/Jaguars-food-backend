const Joi = require("joi");

const RequiredString = Joi.string().required();
const UnrequiredString = Joi.string().allow("");

const RequiredNumber = Joi.number().required();

const PasswordSchema = Joi.string().required().min(6);

const CreateAdminSignUp = Joi.object({
  email: Joi.string().email().required(),
  password: PasswordSchema,
  first_name: RequiredString,
  last_name: RequiredString,
  phoneNumber: RequiredString,
  organization_name: RequiredString,
  lunch_price: RequiredString,
  currency: RequiredString,
  currency_code: RequiredString,
});

const CreateInviteOrg = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = { CreateAdminSignUp };
