const Router = require("express").Router;

const adminRouter = Router();

import { createAdmin, createInvite } from "../controllers/admin-controller.js";
import { verifyAccessToken } from "../utils/tokens.js";
const isAdmin = require("../middlewares/isAdmin.js");

adminRouter.post("/create", createAdmin);
adminRouter.post("/invite", verifyAccessToken, isAdmin, createInvite);

module.exports = {
  adminRouter,
};
