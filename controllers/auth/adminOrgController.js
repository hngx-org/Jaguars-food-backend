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

  await db.organizationLunchWallet.create({
    org_id: newOrg.id,
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

const update0rgWalletBalance = asyncHandler(async (req, res) => {
  try {
    const { orgId } = req.user;
    const { amount } = req.body;
    if (!amount || typeof amount !== 'number') {
      res.status(400);
      throw new Error('Please fill in valid amounts');
    }
    const orgWallet = await db.organizationLunchWallet.findOne({
      where: { org_id: orgId },
    });
    orgWallet.balance += amount;
    await orgWallet.save();
    return res.status(200).json({
      message: 'successfully updated',
      new_balance: orgWallet.balance,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const update0rgFoodPrice = asyncHandler(async (req, res) => {
  try {
    const { orgId } = req.user;
    const { lunch_price } = req.body;
    if (!lunch_price) {
      res.status(400);
      throw new Error('Please fill in valid amounts');
    }
    const findOrg = await db.organization.findOne({
      where: {
        id: orgId,
      },
    });
    if (!findOrg) {
      res.status(404);
      throw new Error('org not found');
    }
    findOrg.lunch_price = lunch_price;
    await findOrg.save();
    return res.status(200).json({
      message: 'successfully updated',
      new_lunch_price: findOrg.lunch_price,
    });
  } catch (error) {
    throw new Error(error);
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

const orgWalletBalance = asyncHandler(async (req, res) => {
  const { orgId } = req.user;
  try {
    const org = await db.organizationLunchWallet.findOne({
      where: {
        org_id: orgId,
      },
    });
    // console.log(orgs);
    if (!org) {
      res.status(404);
      return res.json({
        error: `organization not found`,
      });
    } else {
      res.status(200).json({
        status: 'success',
        wallet_balance: org.balance,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ data: error });
  }
});

module.exports = {
  createInvite,
  createAdmin,
  searchOrg,
  update0rgFoodPrice,
  update0rgWalletBalance,
  orgWalletBalance,
};
