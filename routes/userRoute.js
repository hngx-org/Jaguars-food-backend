const { Router } = require('express');
const router = Router();
const {
	getUserProfile,
	editUserProfile,
	getAllUsers,
	addUserBank,
	searchUser,
	createWithdrawal,
	redeemLunch,
} = require('../controllers/users-controller.js');
const authMiddleware = require('../middlewares/authMiddleware');

// Get the user profile
router.get('/user/profile', authMiddleware, getUserProfile);

// Edit the user profile
router.put('/user/profile', authMiddleware, editUserProfile);

// Add bank account
router.patch('/user/bank', authMiddleware, addUserBank);

// Get all users
router.get('/users', authMiddleware, getAllUsers);

// Get user by name or email
router.get('/search/:nameoremail', authMiddleware, searchUser);

// Create withdrawal request
router.post('/user/withdrawal', authMiddleware, createWithdrawal);

router.post('/user/redeem', authMiddleware, redeemLunch);

module.exports = router;
