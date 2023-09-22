const express = require('express');
const {
	createAdmin,
	createInvite,
	update0rgWalletBalance,
	update0rgFoodPrice,
} = require('../controllers/auth/adminOrgController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const {
	Login,
	staffSignUp,
} = require('../controllers/auth/userAuthController');

const router = express.Router();

router.post('/user/signup', createAdmin); //ADMIN SIGN UP ROUTE

router.post('/organization/staff/signup', staffSignUp);

router.post('/login', Login);

// ADMIN ACTIVITIES
router.patch('organization/wallet/update', authMiddleware, isAdmin, update0rgWalletBalance)

router.patch('organization/lunch/update', authMiddleware, isAdmin, update0rgFoodPrice)

router.post('/organization/invite', authMiddleware, isAdmin, createInvite);

module.exports = router;
