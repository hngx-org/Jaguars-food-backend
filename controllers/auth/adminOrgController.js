const asyncHandler = require('express-async-handler');
const db = require('../../models');
const { hashPassword } = require('../../utils/utils');
const {
	generateInvitationToken,
	sendInvitationEmail,
} = require('../../utils/utils');
//Admin or organization

// Courtesy @26thavenue
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
		currency_code,
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
		currency_code,
	});

	// console.log(newOrg);

	const newUser = await db.user.create({
		email,
		firstName: first_name,
		lastName: last_name,
		phoneNumber: phone_number,
		isAdmin: true,
		orgId: newOrg.id,
		passwordHash: hashPassword(password),
		currency,
		currency_code,
	});
	const { firstName, lastName, phoneNumber, isAdmin, orgId } = newUser;
	// console.log(newUser);
	const data = { firstName, lastName, phoneNumber, isAdmin, orgId };
	return res.send({ message: 'Account created', data });
});

const createInvite = asyncHandler(async (req, res) => {
	const { email } = req.body;
	const orgId = req.user.orgId;
	const organization = await db.organization.findOne({
		where: { id: orgId },
	});
	const orgName = organization?.dataValues?.name;
	if (req.user.isAdmin) {
		// Generate a unique invitation token
		const invitationToken = await generateInvitationToken(email, orgId);
		// console.log({ orgId });
		// console.log(invitationToken);

		// Send the invitation email
		sendInvitationEmail({ email, orgName }, invitationToken);
		res.json({ message: 'Invitation sent successfully', statusCode: 200 });
	} else {
		res.status(403);
		throw new Error('Only admins can invite');
	}
});

const searchOrg = asyncHandler(async (req, res) => {
	const name = req.params.name;
	const orgs = await db.organization.findAll({
		where: {
			name: name,
		},
	});
	// console.log(orgs);
	if (orgs.length > 0) {
		res.status(409);
		return res.json({ error: `${name} is taken !!!` });
	} else {
		res.send();
	}
});

module.exports = {
	createInvite,
	createAdmin,
	searchOrg,
};
