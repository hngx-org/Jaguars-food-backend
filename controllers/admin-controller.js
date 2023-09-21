const asyncHandler = require('express-async-handler');

//Admin or organization

const createAdmin = asyncHandler(async (req, res) => {});

const createInvite = asyncHandler(async (req, res) => {});

module.exports = {
	createInvite,
	createAdmin,
};
