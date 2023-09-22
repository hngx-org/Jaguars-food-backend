<<<<<<< HEAD
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
=======
const { Router } = require('express');
const router = Router();
const {
	getUserProfile,
	editUserProfile,
	getAllUsers,
	addUserBank,
	searchUser,
	createWithdrawal,
} = require('../controllers/users-controller.js');
const authMiddleware = require('../middlewares/authMiddleware');

// Get the user profile
router.get('/user/profile', authMiddleware, getUserProfile);
>>>>>>> 29968b7a69867c2a41e0b0d52b2fffdc00355f45

// Edit the user profile
router.put("/user/profile", validateSchema(EditUserProfile), editUserProfile);

// Add bank account
<<<<<<< HEAD
router.post("/user/bank", validateSchema(AddUserBank), addUserBank);
=======
router.patch('/user/bank', authMiddleware, addUserBank);
>>>>>>> 29968b7a69867c2a41e0b0d52b2fffdc00355f45

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

module.exports = router;
