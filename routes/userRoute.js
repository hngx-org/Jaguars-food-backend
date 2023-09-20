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


router.route("/user")
// Get the user profile
.get("/profile", getUserProfile)
// Add bank account
.post('/bank', addUserBank);

// Get all users
router.get('/users', getAllUsers);

router.get('/api/search/:nameoremail', searchUser);

