import asyncHandler from 'express-async-handler';
import Lunch from '../models/lunches.model';

//SEND A LUNCH
const createLunch = asyncHandler(async (req, res) => {});

//GET A LUNCH
const getLunch = asyncHandler(async (req, res) => {
  const { id: lunchId } = req.params;

  if (lunchId) {
    const lunch = await Lunch.findOne({ where: { id: lunchId } });
    if (!lunch) {
      res.status(404);
      throw new Error(`No Lunch exit for ${id}`);
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

//GET ALL LUNCHES
const getAllLunches = asyncHandler(async (req, res) => {});

export { createLunch, getLunch, getAllLunches };
