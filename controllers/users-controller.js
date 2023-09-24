const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require("sequelize");
const joi = require("joi");

//GET USER PROFILE
const getUserProfile = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  const user = await db.user.findOne({ where: { id: user_id } });

  const {
    id,
    orgId,
    firstName,
    lastName,
    profilePicture,
    email,
    phoneNumber,
    launchCreditBalance,
    bankNumber,
    bankCode,
    bankName,
    bankRegion,
    currency,
    currencyCode,
    isAdmin,
  } = user;

  if (user) {
    res.json({
      id,
      orgId,
      firstName,
      lastName,
      profilePicture,
      email,
      isAdmin,
      phoneNumber,
      launchCreditBalance,
      bankNumber,
      bankCode,
      bankName,
      bankRegion,
      currency,
      currencyCode,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// TODO:: Check ctrls to be sure db was queried
//EDIT USER PROFILE
const editUserProfile = asyncHandler(async (req, res) => {
  if (req.user.id) {
    const user = await db.user.findByPk(req.user.id);
    if (req.body.firstName) {
      const { error } = joi.string().validate(req.body.firstName);
      if (error) throw new Error("firstName must be a string");
      user.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      const { error } = joi.string().validate(req.body.lastName);
      if (error) throw new Error("lastName must be a string");
      user.lastName = req.body.lastName;
    }
    // if (req.body.email) {
    //   const { error } = joi.string().email().validate(req.body.email);
    //   if (error) throw new Error(error);
    //   user.email = req.body.email;
    // }
    if (req.body.password) {
      const { error } = joi.string().validate(req.body.password);
      if (error) throw new Error(error);
      const hashedPassword = hashPassword(req.body.password);
      user.passwordHash = hashedPassword;
    }

    const updatedUser = await user.save();
    res.json({
      id: updatedUser.id,
      name: updatedUser.firstName + " " + updatedUser.lastName,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//ADD USER BANK ACCOUNT
const addUserBank = asyncHandler(async (req, res) => {
  const user = await db.user.findOne({ where: { email: req.user.email } });
  if (user) {
    const { error } = joi
      .object({
        bank_name: joi.string().required(),
        bank_number: joi.string().required(),
        bank_region: joi.string().required(),
        bank_code: joi.string().required(),
      })
      .validate(req.body);

    if (error) {
      throw new Error(error);
    }

    user.bankName = req.body.bank_name;
    user.bankNumber = req.body.bank_number;
    user.bankRegion = req.body.bank_region;
    user.bankCode = req.body.bank_code;

    await user.save();
    res.json({
      id: user.id,
      name: user.firstName + " " + user.lastName,
      email: user.email,
      bank_number: user.bankNumber,
      bank_name: user.bankName,
      bank_code: user.bankCode,
      bank_region: user.bankRegion,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//GET ALL USERS
/**
 * @desc Get all Users
 * @route GET /api
 * @access Public
 * @description Retrieve a list of all User or filter by 'name' query parameter.
 */
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    // Assuming you retrieve all users from the database
    const users = await db.user.findAll({ where: { orgId: req.user.orgId } });
    // Response data
    const responseData = {
      message: "Successfully gotten all users",
      statusCode: 200,
      data: users.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profile_picture,
        id: user.id,
        orgId: user.orgId,
      })),
    };
    res.status(200).json(responseData);
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    throw new Error(error);
  }
});

//GET(SEARCH) USER BY NAME OR MAIL
const searchUser = asyncHandler(async (req, res) => {
  const nameOrEmail = req.params.nameoremail;
  const users = await db.user.findAll({
    where: {
      org_id: req.user.orgId,
      [Op.or]: [
        { firstName: { [Op.like]: "%" + nameOrEmail + "%" } },
        { lastName: { [Op.like]: "%" + nameOrEmail + "%" } },
        { email: { [Op.like]: "%" + nameOrEmail + "%" } },
      ],
    },
  });
  res.json({
    users: users.map((user) => ({
      name: user.firstName + " " + user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      id: user.id,
    })),
  });
});

// TODO:: withdrawal shld withdraw from user's wallet not lunch
//CREATE WITHDRAWAL REQUEST
const createWithdrawal = asyncHandler(async (req, res) => {
  const user = req.user;

  if (user) {
    const withdrawal = {
      amount: req.body.amount,
      bankName: req.body.bankName,
      accountNumber: req.body.accountNumber,
      accountName: req.body.accountName,
    };
    const lunchId = req.body.lunchId;
    if (lunchId) {
      // Update the status of the lunch from 'redeemed: false' to 'redeemed: true'
      await Lunches.update(
        { redeemed: true },
        { where: { id: lunchId, redeemed: false } }
      );
    }
    user.withdrawals.push(withdrawal);
    const updatedUser = await db.user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      bank: updatedUser.bank,
      withdrawals: updatedUser.withdrawals,
    });
  } else {
    // If user is not found (unauthenticated), return a 404 response with an error message
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  getUserProfile,
  editUserProfile,
  getAllUsers,
  addUserBank,
  searchUser,
  createWithdrawal,
};
