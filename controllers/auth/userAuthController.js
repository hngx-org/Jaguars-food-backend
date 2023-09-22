const asyncHandler = require('express-async-handler');
const db = require('../../models');
const { hashPassword, verifyPassword } = require('../../utils/utils');
const { getToken, verifyToken } = require('../../utils/tokens');

const staffSignUp = asyncHandler(async (req, res) => {
	const sentEmail = req.body.email;
	const sentPassword = req.body.password;
	const sentFirstName = req.body.first_name;
	const sentLastName = req.body.last_name;
	const sentPhone_number = req.body.phone_number;
	const otp_token = req.body.otp_token;

	if (
		!sentEmail ||
		!sentPassword ||
		!sentFirstName ||
		!sentLastName ||
		!sentPhone_number
	) {
		res.status(400).json({ error: 'All section is required' });
		return;
	}
	const jwtToken = await db.organizationInvites.findOne({
		where: { email: sentEmail },
	});
	if (!jwtToken) {
		return res
			.status(403)
			.json({
				message: 'Impersonation warning!',
				error: 'Unauthorized Access',
			});
	}

	const data = await verifyToken(jwtToken.dataValues.token);
	const { orgId } = data;

	const decodedToken = await verifyToken(jwtToken.dataValues.token);
	// console.log(decodedToken.otp, otp_token);
	if (decodedToken?.otp?.toString() !== otp_token) {
		return res.status(400).json({ error: 'Invalid token' });
	}

	try {
		const hashedPassword = hashPassword(sentPassword);
		const newUser = await db.user.findOne({ where: { email: sentEmail } });
		if (newUser) {
			return res.status(409).json({ error: 'Staff already Exist' });
		} else {
			const signUp = await db.user.create({
				email: sentEmail,
				passwordHash: hashedPassword,
				firstName: sentFirstName,
				lastName: sentLastName,
				phoneNumber: sentPhone_number,
				orgId,
			});

			res.status(201).json({ message: 'Signup Successful', signUp });
		}
	} catch (error) {
		res.status(500);
		// console.log(error);
		throw new Error('Server Error');
	}
});

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
	const newUser = await db.user.create({
		email,
		firstName: first_name,
		lastName: last_name,
		phoneNumber: phone_number,
		orgId: req.user.orgId,
		passwordHash: hashPassword(password),
	});
	// console.log(newUser);
	const { firstName, lastName, phoneNumber, isAdmin, orgId } = newUser;
	const data = { firstName, lastName, phoneNumber, isAdmin, orgId };
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

module.exports = { Login, signUp, staffSignUp };
