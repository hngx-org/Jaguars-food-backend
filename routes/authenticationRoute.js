const express = require("express");
const {
  // createAdmin, two people created the same controller i decided to go with the more correct one
  createInvite,
} = require("../controllers/auth/adminOrgController");

const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const {
  Login,
  staffSignUp,
} = require("../controllers/auth/userAuthController");
const {
  createAdminSignUp,
} = require("../controllers/auth/adminSignUpController");
const { validateSchema } = require("../middlewares/input-validator");
const { CreateAdminSignUp } = require("../schema/admin-schema");

const router = express.Router();

//ADMIN SIGN UP ROUTE
router.post(
  "/user/signup",
  validateSchema(CreateAdminSignUp),
  createAdminSignUp
);

router.post("/organization/invite", authMiddleware, isAdmin, createInvite);
router.post("/organization/staff/signup", staffSignUp);
// router.post('/organization/staff/signup', authMiddleware, createInvite);
router.post("/login", Login);

// ADMIN LOGIN ROUTE
// router.route('/login').post(logInAdmin);

module.exports = router;
