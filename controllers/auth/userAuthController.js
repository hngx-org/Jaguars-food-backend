const asyncHandler = require("express-async-handler");
const joi = require("joi");
const crypto = require("crypto");
const db = require("../../models");
const {
  hashPassword,
  verifyPassword,
  sendPasswordResetOTPEmail,
} = require("../../utils/utils");
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

    if (!jwtToken) {
      return res.status(403).json({
        message: "Impersonation warning!",
        error: "Unauthorized Access",
      });
    }
    console.log(3);
    const decodedToken = await verifyToken(jwtToken.dataValues.token);
    console.log(4);

    if (decodedToken?.otp?.toString() !== otp_token) {
      return res.status(400).json({ error: "Invalid token" });
    }
    console.log(5);

    const hashedPassword = hashPassword(sentPassword);
    console.log(6);
    const duplicate = await db.user.findOne({ where: { email: sentEmail } });
    console.log(7);
    if (duplicate) {
      return res.status(409).json({ error: "Staff already Exist" });
    }
    console.log(8);

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

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { error } = joi
      .string()
      .email({ minDomainSegments: 2 })
      .required()
      .validate(req.body.email);

    if (error) {
      res.status(400);
      throw new Error(error);
    }

    const { email } = req.body;

    const user = await db.user.findOne({ where: { email } });
    if (!user) {
      res.status(404);
      throw new Error("User does not exist");
    }
    // generate token
    const generatedToken = crypto.randomInt(100000, 1000000).toString();
    const jwt_token = await getToken({ otpToken: generatedToken, email });

    const org = await db.organization.findOne({
      where: { id: user.dataValues.org_id },
    });

    const adminUser = await db.user.findOne({
      where: { org_id: user.dataValues.org_id, isAdmin: true },
    });

    await sendPasswordResetOTPEmail(
      {
        email,
        orgName: org.dataValues.name,
        orgEmail: adminUser.dataValues.email,
      },
      jwt_token
    );

    return res.json({ message: "OTP sent to user email" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  try {
    if (!req?.query) {
      const schema = joi.object({
        email: joi.string().email({ minDomainSegments: 2 }).required(),
        otp_token: joi.string().required(),
        password: joi.string().required(),
      });

      const { error } = schema.validate(req.body);

      if (error) {
        throw new Error(error);
      }
      const { email, otp_token, password } = req.body;

      if (!user) {
        return res.status(404).json({
          message: `User with email ${email} not found`,
          error: "404 Not found",
        });
      }

      const decoded = await verifyToken(otp_token);

      if (user.dataValues.email !== decoded.email) {
        return res.status(400).json({ error: "Invalid token" });
      }

      const hashedPassword = hashPassword(password);

      await db.user.update(
        { passwordHash: hashedPassword },
        { where: { email: email } }
      );

      return res.json({ message: "password updated successfully" });
    }
    if (req?.query?.token) {
      // yet to be implemented
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
});

module.exports = { Login, staffSignUp, forgotPassword, resetPassword };
