import Joi from "joi";

const RequiredString = Joi.string().required();
const UnrequiredString = Joi.string().allow("");

const RequiredNumber = Joi.number().required();

const EditUserProfile = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
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

export { CreateWithdrawal, AddUserBank, EditUserProfile };
