const express = require('express');
const {
	createAdmin,
	createInvite,
	searchOrg,
} = require('../controllers/auth/adminOrgController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const {
	Login,
	staffSignUp,
} = require('../controllers/auth/userAuthController');

const router = express.Router();

//ADMIN SIGN UP ROUTE
router.post('/user/signup', createAdmin);
router.post('/organization/invite', authMiddleware, isAdmin, createInvite);
router.get('/organization/:name', searchOrg);
router.post('/organization/staff/signup', staffSignUp);
// router.post('/organization/staff/signup', authMiddleware, createInvite);
router.post('/login', Login);

module.exports = router;
