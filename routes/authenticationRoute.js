const express = require("express");
const {
  createAdmin,
  createInvite,
} = require("../controllers/auth/adminOrgController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const {
  Login,
  staffSignUp,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth/userAuthController");

const router = express.Router();

//ADMIN SIGN UP ROUTE
router.post("/user/signup", createAdmin);
router.post("/organization/invite", authMiddleware, isAdmin, createInvite);
router.post("/organization/staff/signup", staffSignUp);
// router.post('/organization/staff/signup', authMiddleware, createInvite);
router.post("/login", Login);
router.post("/forgot-password", forgotPassword);
router.post("/resend-otp", forgotPassword);
router.post("/reset-password", resetPassword);

// ADMIN LOGIN ROUTE
// router.route('/login').post(logInAdmin);

module.exports = router;
