import asyncHandler from "express-async-handler";
import { User } from "../../models/user.model.js";
import {
  comparePassword,
  hashPassword,
} from "../../middlewares/passwordHash.js";
import { customResponseHandler } from "../../utils/customResHandler.js";
import Joi from "joi";
import { generateAccessToken } from "../../utils/tokens.js";

export const loginUser = async (req, res) => {
  if (JSON.stringify(req.body) == "{}")
    return customResponseHandler(res, true, 400, {});

  const email = req.body.email;
  const password = req.body.password;

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    // first_name: Joi.a,
    // last_name: Joi.string(),
  });
  const isReqBodyParamsInvalid = schema.validate(req.body);

  if (isReqBodyParamsInvalid.error) {
    return customResponseHandler(
      res,
      true,
      400,
      {},
      isReqBodyParamsInvalid?.error?.message
    );
  }
  const user = await User.findOne({ where: { email: email } });
  //   if user is registered in the db and password is valid, send jwt token

  if (!user)
    return customResponseHandler(
      res,
      true,
      404,
      {},
      { message: `User with email ${email} not found in the db` }
    );

  const isPasswordValid = await comparePassword(
    req.body.password,
    user.dataValues.password_hash
  );

  return isPasswordValid
    ? customResponseHandler(res, false, 200, {
        token: generateAccessToken({ id: user?.dataValues?.id }),
      })
    : customResponseHandler(
        res,
        true,
        400,
        {},
        { message: "Incorrect Password" }
      );
};
