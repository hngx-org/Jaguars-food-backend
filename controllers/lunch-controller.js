const asyncHandler = require('express-async-handler');
const db = require('../models');

//SEND A LUNCH
// TODO:
const createLunch = asyncHandler(async (req, res) => {
  try {
    const { id, orgId } = req.user; // user not present
    const { receivers, quantity, note } = req.body;
    const lunch = await receivers.map(async (receiver) => {
      await db.lunches.create({
        senderId: id,
        receiverId: receiver,
        quantity,
        note,
        org_id: orgId,
      });
    });
    return res.json({ status: 'successful', message: 'Lunch(es) sent' });
  } catch (error) {
    throw new Error('Internal Server Error');
  }
});

//GET A LUNCH
const getLunch = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (id) {
    const lunch = await db.lunches.findOne({ where: { id } });
    if (!lunch) {
      res.status(404);
      throw new Error(`No Lunch exist for ${id}`);
    } else {
      const data = {
        receiverId: lunch.receiverId,
        senderId: lunch.senderId,
        quantity: lunch.quantity,
        redeemed: lunch.redeemed,
        note: lunch.note,
        created_at: lunch.created_at,
        id: lunch.id,
      };
      const msg = 'The Lunch is available';
      res.status(200).json({ message: msg, statusCode: 200, data });
    }
    res.status(400);
    throw new Error('Please provide an id');
  }
});

//REDEEM A LUNCH
const redeemUserLunch = asyncHandler(async (req, res) => {
  try {
    // decrypt id from token using middleware
    const { id } = req.user;
    const { lunch_id, amount } = req.body;
    // validating if the lunch id exists
    const lunchID = await db.lunches.findOne({ where: { id: lunch_id } });

    if (!lunchID) {
      res.status(404);
      throw new Error('Lunch not found');
    }
    // Fetch the current user
    const user = await db.user.findOne({ where: { id: id } });
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const curBal = user.lunchCreditBalance;

    // if current  balance is less than the amount
    if (curBal < amount) {
      res.status(400);
      throw new Error('Insufficient balance');
    }

    // update user balance for current user
    await user.update(
      { lunchCreditBalance: curBal - amount },
      { where: { id: id } }
    );

    // create a withdrawal table
    const withdrawal = await db.withdrawals.create({
      id: lunchID,
      user_id: id,
      status: 'completed',
      amount: amount,
    });

    // update lunch status
    await db.lunches.update({ redeemed: true }, { where: { id: lunch_id } });

    res.status(200).json({
      status: 'success',
      message: 'Lunch redeemed successfully',
      data: withdrawal,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
      data: err,
    });
  }
});

const getAllLunches = asyncHandler(async (req, res) => {
  const { id, firstName, lastName } = req.user;
  if (!id) {
    res.status(400);
    throw new Error('Please provide an id.');
  }
  try {
    const lunches = await db.lunches.findAll({ where: { receiverId: id } });
    return res.status(200).json({
      status: 'success',
      data: { count: lunches.length, lunches },
    });
    // console.log('I got here');
  } catch (error) {
    res.status(404);
    const user = `{id:${id}, username:${firstName} ${lastName}`;
    throw new Error(`No lunch found for ${user}}`);
  }
});

module.exports = {
  createLunch,
  getLunch,
  redeemUserLunch,
  getAllLunches,
};
