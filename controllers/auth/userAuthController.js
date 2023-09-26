const joi = require("joi");
const asyncHandler = require("express-async-handler");
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
      password: joi.string().min(6).required(),
      first_name: joi.string().required(),
      last_name: joi.string().required(),
      phone_number: joi.string(),
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
      phone: sentPhone_number,
      orgId: decodedToken?.orgId,
    });

    const { email, id, firstName, lastName, phone, orgId } = signUp;
    const data = { email, id, firstName, lastName, phone, orgId };
    res.status(201).json({ message: "Signup Successful", data });
  } catch (error) {
    res.status(500);
    throw new Error("Server Error");
  }
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
    const jwt_token = await getToken({ generatedToken, email }, "10m");

    user.refreshToken = jwt_token;
    await user.save();

    const org = await db.organization.findOne({
      where: { id: user.org_id },
    });

    await sendPasswordResetOTPEmail(
      {
        email,
        orgName: org.name,
      },
      generatedToken
    );

    return res.json({ message: "OTP sent to user email" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  try {
    const schema = joi.object({
      email: joi.string().email({ minDomainSegments: 2 }).required(),
      otp: joi.number().required(),
      password: joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw new Error(error);
    }
    const { email, otp, password } = req.body;

    const user = await db.user.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        message: `User with email ${email} not found.`,
        error: "404 Not found",
      });
    }
    let decodedToken;
    try {
      decodedToken = await verifyToken(user.refreshToken);
    } catch {
      res.status(400);
      res.json({ status: "error", message: "invalid/expired token" });
    }
    // console.log(user.refreshToken);

    if (decodedToken?.generatedToken === otp.toString()) {
      user.refreshToken = "";
      const hashedPassword = hashPassword(password);
      user.passwordHash = hashedPassword;
      await user.save();
      res.status(201);
      return res.json({ status: "success", message: "Kindly login" });
    } else {
      res.status(400);
      throw new Error("Invalid OTP");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
});

const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await db.user.findOne({ where: { email } });
  if (!checkUser) {
    res.status(400);
    throw new Error("User does not exist");
  }
  const validPassword = verifyPassword(password, checkUser.passwordHash);
  if (!validPassword) {
    res.status(400);
    throw new Error("Invalid password");
  } else {
    const {
      id,
      orgId,
      firstName,
      lastName,
      profilePic,
      email,
      phone,
      isAdmin,
      lunchCreditBalance,
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
      profilePic,
      email,
      phone,
      isAdmin,
      lunchCreditBalance,
      refreshToken,
      bankNumber,
      bankCode,
      bankName,
      bankRegion,
      currency,
      currencyCode,
    };
    const token = await getToken(user);
    return res.status(200).json({ token });
  }
});

module.exports = { Login, staffSignUp, forgotPassword, resetPassword };
