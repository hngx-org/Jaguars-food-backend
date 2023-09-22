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
const { verifyAccessToken } = require("../utils/tokens.js");

// Get the user profile
router.get("/user/profile", authMiddleware, getUserProfile);

// Edit the user profile
router.put("/user/profile", verifyAccessToken, editUserProfile);

// Add bank account
router.patch("/user/bank", verifyAccessToken, authMiddleware, addUserBank);

// Get all users
router.get("/users", getAllUsers);

// Get user by name or email
router.get("/search/:nameoremail", searchUser);

// Create withdrawal request
router.post("/user/withdrawal", verifyAccessToken, createWithdrawal);

module.exports = router;
