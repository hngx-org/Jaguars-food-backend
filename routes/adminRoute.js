import { Router } from "express";
const router = Router();
import { createAdmin,createInvite } from "../controllers/admin-controller";

router.post('/organization/create', createAdmin);
router.post('/organization/invite', createInvite);

export default router;