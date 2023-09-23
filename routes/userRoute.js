const { Router } = require("express");
const router = Router();
const {
  getUserProfile,
  editUserProfile,
  getAllUsers,
  addUserBank,
  searchUser,
  createWithdrawal,
} = require("../controllers/users-controller.js");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateSchema } = require("../middlewares/input-validator.js");
const {
  EditUserProfile,
  AddUserBank,
  CreateWithdrawal,
} = require("../schema/user-schema.js");

// Get the user profile
router.get("/user/profile", authMiddleware, getUserProfile);

// Edit the user profile
router.put(
  "/user/profile",
  authMiddleware,
  validateSchema(EditUserProfile),
  editUserProfile
);

// Add bank account
router.post(
  "/user/bank",
  authMiddleware,
  validateSchema(AddUserBank),
  addUserBank
);

// Get all users
router.get("/users", authMiddleware, getAllUsers);

// Get user by name or email
router.get("/search/:nameoremail", authMiddleware, searchUser);

// Create withdrawal request
router.post("/user/withdrawal", authMiddleware, createWithdrawal);

module.exports = router;
