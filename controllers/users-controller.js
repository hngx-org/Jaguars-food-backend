const asyncHandler = require('express-async-handler');
const { lunches, user } = require('../models');
const { hashPassword, verifyPassword } = require('../utils/utils');
const db = require('../models');

//user is employee
//GET USER PROFILE
const getUserProfile = asyncHandler(async (req, res) => {
	const user = req.user;
	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

//EDIT USER PROFILE
const editUserProfile = asyncHandler(async (req, res) => {
	const user = req.user;
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updatedUser = await user.save();
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

//ADD USER BANK ACCOUNT
const addUserBank = asyncHandler(async (req, res) => {
	const user = req.user;
	if (user) {
		user.bank = {
			bankName: req.body.bankName,
			accountNumber: req.body.accountNumber,
			accountName: req.body.accountName,
		};
		const updatedUser = await user.save();
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			bank: updatedUser.bank,
		});
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});
/**
 * @desc Get all Users
 * @route GET /api
 * @access Public
 * @description Retrieve a list of all User or filter by 'name' query parameter.
 */
const getAllUsers = asyncHandler(async (req, res) => {
	try {
	  // Assuming you retrieve all users from the database
	  const users = await db.user.find({});
	  // Response data
	  const responseData = {
		message: 'Successfully gotten all users',
		statusCode: 200,
		data: users.map((user) => ({
	      firstName: user.name,
		  email: user.email,
		  profilePicture: user.profile_picture || 'user-profile-picture-url', // Replace with the actual profile picture URL or a default value
		  _id: user._id, // Assuming "_id" is the user identifier in your model
		})),
	  };
	  res.status(200).json(responseData);
	} catch (error) {
	  // Handle errors and send an error response
	  console.error(error);
	  throw new Error(error)
	}

})
//GET(SEARCH) USER BY NAME OR MAIL
const searchUser = asyncHandler(async (req, res) => {
	const nameOrEmail = req.params.nameoremail;
	const users = await User.find({
		$or: [
			{ name: { $regex: nameOrEmail, $options: 'i' } },
			{ email: { $regex: nameOrEmail, $options: 'i' } },
		],
	});
	res.json(users);
});

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
		const updatedUser = await user.save();
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
		throw new Error('User not found');
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
