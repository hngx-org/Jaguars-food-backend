import { Router } from "express";
const router = Router();
import {
  getUserProfile,
  editUserProfile,
  getAllUsers,
  addUserBank,
  searchUser,
  createWithdrawal,
} from "../controllers/users-controller.js";
import authMiddeleware from "../middlewares/authMiddleware.js";
import { verifyAccessToken } from "../utils/tokens.js";

// Get the user profile
router.get("/user/profile", verifyAccessToken, getUserProfile);

// Edit the user profile
router.put("/user/profile", verifyAccessToken, editUserProfile);

// Add bank account
router.patch("/user/bank", verifyAccessToken, authMiddeleware, addUserBank);

// Get all users
router.get("/users", getAllUsers);

// Get user by name or email
router.get("/search/:nameoremail", searchUser);

// Create withdrawal request
router.post("/user/withdrawal", verifyAccessToken, createWithdrawal);

export default router;
