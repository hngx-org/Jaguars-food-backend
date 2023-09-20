import {Router} from "express";
import { createWithdrawal } from "../controllers/users-controller.js";

const router = Router();

// Withdrawal Request
router.post('/request', createWithdrawal)


export default router;