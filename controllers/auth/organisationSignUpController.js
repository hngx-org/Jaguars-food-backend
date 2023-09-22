import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import { hashPassword } from "../../middlewares/passwordHash.js";
import { customResponseHandler } from "../../utils/customResHandler.js";
import Joi from "joi";

const organisationSignUp = asyncHandler(async (req, res, next) => {
  if (!req.body) customResponseHandler(res, true, 400);
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

  const email = req.body.email;
  const password_hash = hashPassword(req.body.password);
  const first_name = req.body.first_lame;
  const last_name = req.body.last_name;
  const phone_number = req.body.phone_number;

  console.log(await User.findOne({ email }), "vvv");
  const checkIfUserExist = await User.findOne({ where: { email } });

  // console.log(checkIfUserExist, email, "checkIfUserExist");

  // // return;
  if (checkIfUserExist) {
    return customResponseHandler(res, true, 400, {}, "Email Already Exists!");
  }

  //Let create SQL statement to insert the User to theDatabase table Users

  const Values = {
    email,
    password_hash,
    first_name,
    last_name,
    phone_number,
    launch_credit_balance: 0,
    isAdmin: true,
    refresh_token: "hello_world",
  };

  // return;
  const newOrgUser = await User.create({ ...Values });

  console.log("Jane's auto-generated ID:", newOrgUser);
  if (newOrgUser) {
    customResponseHandler(res, false, 201, { ...newOrgUser?.dataValues });
  }
  return;

  const SQL =
    "INSERT INTO users (email,password,firstname,lastname,phonenumber) VALUES (?,?,?,?,?)"; // // Query to execute the sql statement stated above
  // db.query(SQL, Values, (err, results) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     console.log("User inserted successfully!");
  //     res.send({ message: "User added!" });
  //   }
  // });
  // if (
  //   !sentEmail ||
  //   !sentPassword ||
  //   !sentFirstName ||
  //   !sentLastName ||
  //   !sentPhone_number
  // ) {
  //   res.status(400).json({ error: "All section is required" });
  //   return;
  // }
  // try {
  //   const existingAdminUser = await User.findOne({
  //     sentEmail,
  //     sentPassword,
  //     sentFirstName,
  //     sentLastName,
  //     sentPhone_number,
  //   });

  //   if (existingAdminUser) {
  //     res.status(409).json({ error: "Admin already exists" });
  //   } else {
  //     const signUp = await User.create({
  //       sentEmail,
  //       sentPassword,
  //       sentFirstName,
  //       sentLastName,
  //       sentPhone_number,
  //     });
  //     res.status(201).json({ message: "Signup Succefull", signUp });
  //   }
  // } catch (error) {
  //   res.status(500).json({ message: "Server error" });
  // }
});

const organizationSignup = asyncHandler(async (req, res) => {});

const userLogin = asyncHandler(async (req, res) => {});

export {
  organisationSignUp,
  organizationSignup,
  userLogin,
  // generateHashedPassword,
};
