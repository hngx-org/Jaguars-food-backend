const asyncHandler = require('express-async-handler');
const db = require('../../models');
const { hashPassword } = require('../../utils/utils');
const { getToken, verifyToken } = require('../../utils/tokens');
const { APP_URL } = require('../../utils/constants');

//Admin or organization

const createAdmin = asyncHandler(async (req, res) => {
	const {
		email,
		password,
		first_name,
		last_name,
		phone_number,
		organization_name,
		lunch_price,
		currency,
	} = req.body;
	const checkOrg = await db.organization.findOne({
		where: { name: organization_name },
	});
	if (checkOrg) {
		res.status(400);
		throw new Error('Organization already exists.');
	}
	const checkUser = await db.user.findOne({ where: { email } });
	if (checkUser) {
		res.status(400);
		throw new Error('User already exists. Try login');
	}
	const newOrg = await db.organization.create({
		name: organization_name,
		lunch_price,
	});

	// console.log(newOrg);

	const newUser = db.user.create({
		email,
		firstName: first_name,
		lastName: last_name,
		phoneNumber: phone_number,
		isAdmin: true,
		orgId: newOrg.id,
		passwordHash: hashPassword(password),
		currency,
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

const createInvite = asyncHandler(async (req, res) => {
	const { email } = req.body;
	const orgId = req.user.orgId;
	if (req.user.isAdmin) {
		const newInvite = await getToken({ email, orgId });
		const url = APP_URL + 'api/organization/signup?token=';
		const invite_url = {
			invite_url: `${url}${newInvite}`,
			orgId,
		};
		return res.send(invite_url);
	} else {
		res.status(403);
		throw new Error('Only admins can invite');
	}
});

module.exports = {
	createInvite,
	createAdmin,
};
