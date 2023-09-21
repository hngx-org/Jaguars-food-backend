import asyncHandler from 'express-async-handler';
import { User } from '../models/user.model';
import { Lunches } from '../models/lunches.model';
import { Withdrawals } from '../models/withdrawals.model';

//SEND A LUNCH
const createLunch = asyncHandler(async (req, res) => {});

//GET A LUNCH
const getLunch = asyncHandler(async (req, res) => {});

//GET ALL LUNCHES
const getAllLunches = asyncHandler(async (req, res) => {});

//REDEEM A LUNCH
const redeemUserLunch = asyncHandler(async (req, res) => {
  try {
    // decrypt id from token using middleware
    const { id } = req.user;
    const { lunch_id, amount } = req.body;

    // validating if the lunch id exists
    const lunchID = await Lunches.findOne({ where: { id: lunch_id } });

    if (!lunchID) {
      res.status(404);
      throw new Error('Lunch not found');
    }

    // Fetch the current user
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const curBal = user.lunch_credit_balance;

    // if current  balance is less than the amount
    if (curBal < amount) {
      res.status(400);
      throw new Error('Insufficient balance');
    }

    // update user balance
    await User.update({ lunch_credit_balance: curBal - amount }, { where: { id: id } });

    // create a withdrawal
    const withdrawal = await Withdrawals.create({
      id: lunchID,
      user_id: id,
      status: 'completed',
      amount: amount,
    });

    // update lunch status
    await Lunches.update({ redeemed: true }, { where: { id: lunch_id } });

    res.status(200).json({ status: 'success', message: 'Lunch redeemed successfully', data: withdrawal });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Something went wrong', data: err });
  }
});

export { createLunch, getLunch, getAllLunches, redeemUserLunch };
