import { Router } from "express";
const router = Router();
import { createAdmin } from "../controllers/admin-controller.js";

// SIGN UP ROUTE
router.post("/user/signup", createAdmin);

// LOGIN ROUTE
router.post("/login");

export default router;
