const asyncHandler = require('express-async-handler');
const { user } = require('../models');

const isAdmin = asyncHandler(async (req, res, next) => {
	try {
		const { id } = req.user;

		const getUser = await user.findOne({ id });
		// console.log(getUser);

<<<<<<< HEAD
    if (!getUser.isAdmin) {
      res.status(403);
      throw new Error("You lack admin priviledges");
    }
    next();
  } catch (error) {
    throw new Error(error);
  }
=======
		if (!getUser.isAdmin) {
			res.status(403);
			throw new Error('You lack admin priviledges');
		}
		next();
	} catch (error) {
		throw new Error(error);
	}
>>>>>>> f0f9523e86bf450ba9cccafc13a4963871ce78fc
});

module.exports = isAdmin;
