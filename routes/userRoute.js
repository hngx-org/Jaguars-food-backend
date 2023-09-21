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
import validateSchema from "../middlewares/input-validator.js";
import {
  AddUserBank,
  CreateWithdrawal,
  EditUserProfile,
} from "../schema/user-schema.js";

// Get the user profile
router.get("/user/profile", getUserProfile);

// Edit the user profile
router.put("/user/profile", validateSchema(EditUserProfile), editUserProfile);

// Add bank account
router.post("/user/bank", validateSchema(AddUserBank), addUserBank);

// Get all users
router.get("/users", getAllUsers);

// Get user by name or email
router.get("/search/:nameoremail", searchUser);

// Create withdrawal request
router.post(
  "/user/withdrawal",
  validateSchema(CreateWithdrawal),
  createWithdrawal
);

export default router;
