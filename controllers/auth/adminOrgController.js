const asyncHandler = require("express-async-handler");
const db = require("../../models");
const { hashPassword } = require("../../utils/utils");
const { getToken, verifyToken } = require("../../utils/tokens");
const { APP_URL } = require("../../utils/constants");
const transporter = require("../../config/mailConfig");
const {
  generateInvitationToken,
  sendInvitationEmail,
} = require("../../utils/utils");
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
    currency_code,
  } = req.body;
  const checkOrg = await db.organization.findOne({
    where: { name: organization_name },
  });
  if (checkOrg) {
    res.status(400);
    throw new Error("Organization already exists.");
  }
  const checkUser = await db.user.findOne({ where: { email } });
  if (checkUser) {
    res.status(400);
    throw new Error("User already exists. Try login");
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
  return res.status(200).json({ message: "Account created", data });
});

const createInvite = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const orgId = req.user.orgId;
  const organization = await db.organization.findOne({
    where: { id: orgId },
  });
  const orgName = organization.dataValues.name;
  if (req.user.isAdmin) {
    // Generate a unique invitation token
    const invitationToken = await generateInvitationToken(email, orgId);
    // console.log({ orgId });
    // console.log(invitationToken);

    // Send the invitation email
    sendInvitationEmail({ email, orgName }, invitationToken);
    res.status(200).json({ message: "Invitation sent successfully" });
  } else {
    res.status(403);
    throw new Error("Only admins can invite");
  }
});

const update0rgWalletBalance = asyncHandler(async (req, res) => {
  try {
    const { orgId } = req.user;
    const { amount } = req.body;
    if (!amount) {
      res.status(400);
      throw new Error("please enter all fields");
    }
    const findBalance = await db.organizationLunchWallet.findOne({
      where: {
        org_id: orgId,
      },
    });
    if (!findBalance) {
      res.status(404);
      throw new Error("org wallet not found");
    }
    findBalance.balance = amount;
    await findBalance.save();
    return res.status(200).json({
      message: "successfully updated",
      statusCode: 200,
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
      throw new Error("please enter all fields");
    }
    const findOrg = await db.organization.findOne({
      where: {
        id: orgId,
      },
    });
    if (!findOrg) {
      res.status(404);
      throw new Error("org not found");
    }
    findOrg.lunch_price = lunch_price;
    await findOrg.save();
    return res.status(200).json({
      message: "successfully updated",
      statusCode: 200,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createInvite,
  createAdmin,
  update0rgFoodPrice,
  update0rgWalletBalance,
};
