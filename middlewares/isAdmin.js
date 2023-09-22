const asyncHandler = require('express-async-handler');
const { user } = require('../models');

const isAdmin = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.user;

		const getUser = await user.findOne({ id });
		// console.log(getUser);

    if (!getUser || !getUser.isAdmin) {
      res.status(403);
      throw new Error("You lack admin priviledges");
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = isAdmin;
