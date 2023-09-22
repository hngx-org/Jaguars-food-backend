import { Router } from "express";
const adminRouter = Router();
import { createAdmin, createInvite } from "../controllers/admin-controller.js";
import { verifyAccessToken } from "../utils/tokens.js";
import isAdmin from "../middlewares/isAdmin.js";

adminRouter.post("/create", createAdmin);
adminRouter.post("/invite", verifyAccessToken, isAdmin, createInvite);

export default adminRouter;
