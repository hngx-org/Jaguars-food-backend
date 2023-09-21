const asyncHandler = require('express-async-handler');

//user is employee
//GET USER PROFILE
const getUserProfile = asyncHandler(async (req, res) => {
	const user = req.user;
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
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

//GET ALL USERS
const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

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
