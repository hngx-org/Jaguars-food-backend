import { Router } from "express";
const router = Router();
import {
  getUserProfile,
  getAllUsers,
  addUserBank,
  searchUser,
} from "../controllers/users-controller.js";


// Get the user profile
router.get("/user/profile", getUserProfile)
// Add bank account
router.post('/user/bank', addUserBank);

// Get all users
router.get('/users', getAllUsers);

router.get('/search/:nameoremail', searchUser);

export default router;

