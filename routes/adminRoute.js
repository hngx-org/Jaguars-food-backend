import { Router } from "express";
const router = Router();
import { createAdmin, createInvite } from "../controllers/admin-controller.js";

router.put("/create", createAdmin);
router.post("/invite", createInvite);

export default router;
