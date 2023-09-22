const asyncHandler = require("express-async-handler");
const joi = require("joi");
const db = require("../../models");
const { hashPassword, verifyPassword } = require("../../utils/utils");
const { getToken, verifyToken } = require("../../utils/tokens");

const staffSignUp = asyncHandler(async (req, res) => {
  try {
    const schema = joi.object({
      email: joi.string().email({ minDomainSegments: 2 }).required(),
      password: joi.string().required(),
      first_name: joi.string().required(),
      last_name: joi.string().required(),
      phone_number: joi.string().required(),
      otp_token: joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      throw new Error(error);
    }
    const sentEmail = req.body.email;
    const sentPassword = req.body.password;
    const sentFirstName = req.body.first_name;
    const sentLastName = req.body.last_name;
    const sentPhone_number = req.body.phone_number;
    const otp_token = req.body.otp_token;
    const jwtToken = await db.organizationInvites.findOne({
      where: { email: sentEmail },
    });

    if (!jwtToken.dataValues.token) {
      return res.status(403).json({
        message: "Impersonation warning!",
        error: "Unauthorized Access",
      });
    }
    const decodedToken = await verifyToken(jwtToken.dataValues.token);

    if (decodedToken?.otp?.toString() !== otp_token) {
      return res.status(400).json({ error: "Invalid token" });
    }

    const hashedPassword = hashPassword(sentPassword);
    const duplicate = await db.user.findOne({ where: { email: sentEmail } });
    if (duplicate) {
      return res.status(409).json({ error: "Staff already Exist" });
    }

    const signUp = await db.user.create({
      email: sentEmail,
      passwordHash: hashedPassword,
      firstName: sentFirstName,
      lastName: sentLastName,
      phoneNumber: sentPhone_number,
      orgId: decodedToken?.orgId,
    });

    const { email, id, firstName, lastName, phoneNumber, orgId } = signUp;
    const data = { email, id, firstName, lastName, phoneNumber, orgId };
    res.status(201).json({ message: "Signup Successful", data });
  } catch (error) {
    res.status(500);
    throw new Error("Server Error");
  }
});

// const signUp = asyncHandler(async (req, res) => {
//   const { email, password, first_name, last_name, phone_number } = req.body;
//   const checkUser = await db.user.findOne({ where: { email } });
//   if (req.user.email !== email) {
//     res.status(403);
//     throw new Error("Unauthorized");
//   } else if (checkUser) {
//     res.status(400);
//     throw new Error("User already exists. Try login");
//   }
//   const newUser = await db.user.create({
//     email,
//     firstName: first_name,
//     lastName: last_name,
//     phoneNumber: phone_number,
//     orgId: req.user.orgId,
//     passwordHash: hashPassword(password),
//   });
//   // console.log(newUser);
//   const { firstName, lastName, phoneNumber, isAdmin, orgId } = newUser;
//   const data = { firstName, lastName, phoneNumber, isAdmin, orgId };
//   return res.send({ message: "Account created", data });
// });

const Login = asyncHandler(async (req, res) => {
  const schema = joi.object({
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    password: joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    throw new Error(error);
  }
  const { email: r_email, password } = req.body;

  const checkUser = await db.user.findOne({ where: { email: r_email } });
  if (!checkUser) {
    res.status(400);
    throw new Error("User does not exist");
  }
  const validPassword = verifyPassword(password, checkUser.passwordHash);
  if (!validPassword) {
    res.status(400);
    throw new Error("Invalid password");
  }
  const {
    id,
    orgId,
    firstName,
    lastName,
    profilePicture,
    email,
    phoneNumber,
    isAdmin,
    launchCreditBalance,
    refreshToken,
    bankNumber,
    bankCode,
    bankName,
    bankRegion,
    currency,
    currencyCode,
  } = checkUser;
  const user = {
    id,
    orgId,
    firstName,
    lastName,
    profilePicture,
    email,
    phoneNumber,
    isAdmin,
    launchCreditBalance,
    refreshToken,
    bankNumber,
    bankCode,
    bankName,
    bankRegion,
    currency,
    currencyCode,
  };
  const token = await getToken(user);
  return res.json({ token });
});

module.exports = { Login, staffSignUp };
