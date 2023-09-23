const asyncHandler = require('express-async-handler');
const db = require('../models');
const { Op } = require('sequelize');

//GET USER PROFILE
const getUserProfile = asyncHandler(async (req, res) => {
	const id = req.user.id;
	const user = await db.user.findOne({ where: { id } });
	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User not found');
	}
});

// TODO:: Check ctrls to be sure db was queried
//EDIT USER PROFILE
const editUserProfile = asyncHandler(async (req, res) => {
	const user = req.user;
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updatedUser = await db.user.save();
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
	const email = req.user.email;
	try {
		if (user) {
			const updatedUser = await db.user.findOne({ where: { email } })
			if (updatedUser) {
				updatedUser.bankName = req.body.bankName;
				updatedUser.bankNumber = req.body.bankNumber;
				updatedUser.bankCode = req.body.bankCode;
				updatedUser.save();
			}
			res.json({
				message: "Bank account added successfully",
				statusCode: 200,
				data: {
					email: updatedUser.email,
					bankName: updatedUser.bankName,
					bankNumber: updatedUser.bankNumber,
					bankCode: updatedUser.bankCode,
				}
			});
		} else {
			res.status(404);
			throw new Error('User not found');
		}
	} catch (error) {
		throw new Error(error);
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
		const users = await db.user.findAll({});
		// Response data
		const responseData = {
			message: 'Successfully gotten all users',
			statusCode: 200,
			data: users.map((user) => ({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				profilePicture:
					user.profile_picture || 'user-profile-picture-url', // Replace with the actual profile picture URL or a default value
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
	// console.log(nameOrEmail);
	const users = await db.user.findAll({
		where: {
			[Op.or]: [
				{ firstName: { [Op.like]: '%' + nameOrEmail + '%' } },
				{ lastName: { [Op.like]: '%' + nameOrEmail + '%' } },
				{ email: { [Op.like]: '%' + nameOrEmail + '%' } },
			],
		},
	});
	res.json(users);
});

// TODO
//CREATE WITHDRAWAL REQUEST
const createWithdrawal = asyncHandler(async (req, res) => {
	const user = req.user;

	if (user) {
		const withdrawal = {
			amount: req.body.amount,
			bank_name: req.body.bank_name,
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
