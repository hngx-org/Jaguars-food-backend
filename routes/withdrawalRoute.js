import {Router} from "express";
import { createWithdrawal } from "../controllers/users-controller";

const router = Router();

// Withdrawal Request
router.post('/request', createWithdrawal)


module.exports = router;