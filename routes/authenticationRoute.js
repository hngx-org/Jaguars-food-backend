const express = require('express');
const {
	createAdmin,
	createInvite,
} = require('../controllers/auth/adminOrgController');
const { Login, signUp } = require('../controllers/auth/userAuthController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

//ADMIN SIGN UP ROUTE
router.post('/user/signup', createAdmin);
router.post('/organization/invite', authMiddleware, createInvite);
router.post('/organization/staff/signup', authMiddleware, signUp);
// router.post('/organization/staff/signup', authMiddleware, createInvite);
router.post('/login', Login);

// ADMIN LOGIN ROUTE
// router.route('/login').post(logInAdmin);

module.exports = router;
