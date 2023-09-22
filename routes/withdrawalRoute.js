import { Router } from "express";
import { createWithdrawal } from "../controllers/users-controller.js";
import { verifyAccessToken } from "../utils/tokens.js";

const router = Router();

// Withdrawal Request

router.post("/request", verifyAccessToken, createWithdrawal);

export default router;
