import express from "express";
import { createAdminSignUp, userSignUp } from "../controllers/auth/index.js";
const router = express.Router();

router.post("/user/signup", createAdminSignUp);
// router.post("/staff/signup", userSignUp); staff signup should be in  organization route not auth route because of the path format includes organization

export default router;
