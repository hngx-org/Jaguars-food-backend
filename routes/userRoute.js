const { Router } = require('express');
const router = Router();
const {
	getUserProfile,
	editUserProfile,
	getAllUsers,
	addUserBank,
	searchUser,
	createWithdrawal,
	create_user,
	getUser_test
} = require('../controllers/users-controller.js');
const authMiddleware = require('../middlewares/authMiddleware');

// Get the user profile
router.get('/user/profile', authMiddleware, getUserProfile);

// Edit the user profile
router.put('/user/profile', editUserProfile);

// Add bank account
router.patch('/user/bank', authMiddleware, addUserBank);

// Get all users
router.post('/users_test', create_user)
router.get('/users_test/:email',getUser_test )


router.get('/users', getAllUsers);

// Get user by name or email
router.get('/search/:nameoremail', searchUser);

// Create withdrawal request
router.post('/user/withdrawal', createWithdrawal);

module.exports = router;
