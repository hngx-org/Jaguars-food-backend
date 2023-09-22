const asyncHandler = require('express-async-handler');
const { verifyToken } = require('../utils/tokens');

const authMiddleware = asyncHandler(async (req, res, next) => {
	try {
		// console.log(req.query);
		if (req.query.token) {
			const token = req.query.token;
			const data = await verifyToken(token);
			req.user = data;
			next();
		} else if (req.body.token) {
			const token = req.body.token;
			const data = await verifyToken(token);
			req.user = data;
			next();
		} else if (
			req.headers.authorization &&
			req.headers.authorization.startsWith('Bearer')
		) {
			const token = req.headers.authorization.split(' ')[1];

			if (!token) throw new Error('Unauthorized');

			const data = await verifyToken(token);
			req.user = data;
			next();
		} else {
			throw new Error('Unauthorized! no token in header');
		}
	} catch (error) {
		throw new Error(error);
	}
});
module.exports = authMiddleware;
