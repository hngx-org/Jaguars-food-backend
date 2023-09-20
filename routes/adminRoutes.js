import { Router } from "express";
import { createAdmin, createInvite } from "../controllers/admin-controller";
const router = Router();

router.post('/admin/new', createAdmin);
router.post('/admin/invite', createInvite);

export default router;