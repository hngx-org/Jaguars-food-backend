import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";

const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.user;

    const getUser = await User.findOne({ id });

    if (!getUser || !getUser.isAdmin) {
      res.status(403);
      throw new Error("You lack admin priviledges");
    }
  } catch (error) {
    throw new Error(error);
  }
});

export default isAdmin;
