const express = require ("express");
const router = express.Router();
const {
  createAdmin,
  logInAdmin
} = require("../controllers/auth/userSignUpController");
//ADMIN SIGN UP ROUTE
router.route('/user/signup').post(createAdmin)
   

// ADMIN LOGIN ROUTE
router.route('/login').post(logInAdmin);

export default router;