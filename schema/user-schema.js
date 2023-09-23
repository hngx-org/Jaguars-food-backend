const Joi = require("joi");

const RequiredString = Joi.string().required();
const UnrequiredString = Joi.string().allow("");

const RequiredNumber = Joi.number().required();

const StaffSignUp = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  otp_token: RequiredString, // 6-digit token sent to inbox
  first_name: RequiredString,
  last_name: RequiredString,
  phone_number: RequiredString,
});

const UserSignUp = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  first_name: RequiredString,
  last_name: RequiredString,
  phone_number: RequiredString,
});

const EditUserProfile = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const AddUserBank = Joi.object({
  bankName: RequiredString,
  accountNumber: Joi.number().required(),
  accountName: RequiredString,
});

const CreateWithdrawal = Joi.object({
  amount: RequiredNumber,
  bankName: RequiredString,
  accountNumber: RequiredNumber,
  accountName: RequiredString,
  lunchId: RequiredNumber,
});

const Login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const CreateInvite = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  CreateWithdrawal,
  AddUserBank,
  EditUserProfile,
  Login,
  StaffSignUp,
  CreateInvite,
  UserSignUp,
};
