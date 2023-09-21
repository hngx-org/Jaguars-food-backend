import express from "express";
import { createOrganization } from "../controllers/organization-controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();


router.put('/create', authMiddleware,createOrganization);


export default router;