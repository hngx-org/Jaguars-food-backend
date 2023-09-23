const express = require("express");
const {
  createAdmin,
  createInvite,
  searchOrg,
  update0rgFoodPrice,
  update0rgWalletBalance,
  orgWalletBalance,
} = require("../controllers/auth/adminOrgController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const {
  Login,
  staffSignUp,
} = require("../controllers/auth/userAuthController");

const {validateAdminRequestBody, validateLoginRequestBody, validateStaffSignUpRequest} = require("../middlewares/validation/")

const authRouter = express.Router();
const orgRouter = express.Router();
// const orgRouter = express.Router();

//ADMIN SIGN UP ROUTE
authRouter.post("/user/signup", validateAdminRequestBody, createAdmin);
authRouter.get("/organization/:name", searchOrg);
authRouter.post("/staff/signup", validateStaffSignUpRequest,  staffSignUp);
authRouter.post("/login", validateLoginRequestBody, Login);

// ORG ACTIVITIES
orgRouter.post("/invite", authMiddleware, isAdmin, createInvite);
orgRouter.patch(
  "/wallet/update",
  authMiddleware,
  isAdmin,
  update0rgWalletBalance
);

orgRouter.patch("/lunch/update", authMiddleware, isAdmin, update0rgFoodPrice);

// TODO: Get org account balance
orgRouter.get(
  "/organization/wallet",
  authMiddleware,
  isAdmin,
  orgWalletBalance
);

module.exports = { orgRouter, authRouter };
