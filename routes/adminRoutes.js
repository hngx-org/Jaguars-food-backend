import { Router } from "express";
import { createAdmin, createInvite } from "../controllers/admin-controller";
const router = Router();

router.post('/organization/create', createAdmin);
router.post('/organization/invite', createInvite);

export default router;