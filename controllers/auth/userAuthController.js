const asyncHandler = require('express-async-handler');
const db = require('../../models');
const { hashPassword, verifyPassword } = require('../../utils/utils');
const { getToken, verifyToken } = require('../../utils/tokens');

const signUp = asyncHandler(async (req, res) => {
	const { email, password, first_name, last_name, phone_number } = req.body;
	const checkUser = await db.user.findOne({ where: { email } });
	if (req.user.email !== email) {
		res.status(403);
		throw new Error('Unauthorized');
	} else if (checkUser) {
		res.status(400);
		throw new Error('User already exists. Try login');
	}
	const newUser = db.user.create({
		email,
		firstName: first_name,
		lastName: last_name,
		phoneNumber: phone_number,
		orgId: req.user.orgId,
		passwordHash: hashPassword(password),
	});

	const { firstName, lastName, phoneNumber, isAdmin, orgId } = newUser;
	const data = {
		email,
		password,
		firstName,
		lastName,
		phoneNumber,
		isAdmin,
		orgId,
	};
	return res.send({ message: 'Account created', data });
});

const Login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const checkUser = await db.user.findOne({ where: { email } });
	if (!checkUser) {
		res.status(400);
		throw new Error('User does not exist');
	}
	const validPassword = verifyPassword(password, checkUser.passwordHash);
	if (!validPassword) {
		res.status(400);
		throw new Error('Invalid password');
	} else {
		const {
			id,
			orgId,
			firstName,
			lastName,
			profilePicture,
			email,
			phoneNumber,
			isAdmin,
			launchCreditBalance,
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
			profilePicture,
			email,
			phoneNumber,
			isAdmin,
			launchCreditBalance,
			refreshToken,
			bankNumber,
			bankCode,
			bankName,
			bankRegion,
			currency,
			currencyCode,
		};
		const token = await getToken(user);
		return res.json({ token });
	}
});

module.exports = { Login, signUp };
