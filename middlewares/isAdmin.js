const asyncHandler = require('express-async-handler');
const { User } = require('../models/user.model');

const isAdmin = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.user;

		const getUser = await User.findOne({ id });

		if (!getUser.isAdmin) throw new Error('You lack admin priviledges');
		next();
	} catch (error) {
		throw new Error(error);
	}
});

module.exports = isAdmin;
