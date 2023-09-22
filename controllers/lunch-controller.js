import asyncHandler from "express-async-handler";
import { Lunches } from "../models/lunches.model.js";

//SEND A LUNCH
const createLunch = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const { receivers, quantity, note } = req.body;
    const lunch = await Lunches.create({
      senderId: userId,
      quantity,
      note,
    });
    await lunch.setReceivers(receivers);
    return res.status(200).json({ message: "Lunch created successfully." });
  } catch (error) {
    throw new Error("Internal Server Error");
  }
});

//GET A LUNCH
const getLunch = asyncHandler(async (req, res) => {
  try {
    const lunchId = req.params.lunchId;
    const lunch = await Lunches.findByPk(lunchId);
    if (!lunch) {
      return res.status(400).json({ error: "Lunch not found" });
    }
    res.status(200).json({ lunch });
  } catch (error) {
    throw new Error("Internal Server Error");
  }
});

//GET ALL LUNCHES
const getAllLunches = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;

    const userLunches = await Lunches.findAll({
      where: {
        receiverId: userId,
      },
    });

    return res.status(200).json({
      message: "Lunches retrieved successfully",
      statusCode: 200,
      data: userLunches,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export { createLunch, getLunch, getAllLunches };
