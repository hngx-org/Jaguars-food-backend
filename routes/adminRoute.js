import { Router } from "express";
const router = Router();
import { createAdmin, createInvite } from "../controllers/admin-controller";

router.post("/create", createAdmin);
router.post("/invite", createInvite);

export default router;
