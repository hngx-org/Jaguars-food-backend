import { Router } from 'express';
const router = Router();
import {
  getUserProfile,
  editUserProfile,
  getAllUsers,
  addUserBank,
  searchUser,
  createWithdrawal,
} from '../controllers/users-controller.js';
import authMiddeleware from '../middlewares/authMiddleware.js';

// Get the user profile
router.get('/user/profile', getUserProfile);

// Edit the user profile
router.put('/user/profile', editUserProfile);

// Add bank account
router.patch('/user/bank', authMiddeleware, addUserBank);

// Get all users
router.get('/users', getAllUsers);

// Get user by name or email
router.get('/search/:nameoremail', searchUser);

// Create withdrawal request
router.post('/user/withdrawal', createWithdrawal);

export default router;
