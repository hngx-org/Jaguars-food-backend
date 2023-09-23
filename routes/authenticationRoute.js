const express = require("express");
const {
  createAdmin,
  createInvite,
  searchOrg,
} = require("../controllers/auth/adminOrgController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const {
  createAdminSignUp,
} = require("../controllers/auth/adminSignUpController");
const { validateSchema } = require("../middlewares/input-validator");
const { CreateAdminSignUp } = require("../schema/admin-schema");
const { Login, StaffSignUp, CreateInvite } = require("../schema/user-schema");

const router = express.Router();

//ADMIN SIGN UP ROUTE
router.post("/user/signup", createAdmin);
router.post("/organization/invite", authMiddleware, isAdmin, createInvite);
router.get("/organization/:name", searchOrg);
router.post("/organization/staff/signup", staffSignUp);
// router.post('/organization/staff/signup', authMiddleware, createInvite);

router.post("/login", validateSchema(Login), login);

// ADMIN LOGIN ROUTE
// router.route('/login').post(logInAdmin);

module.exports = router;
