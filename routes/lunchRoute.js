import { Router } from "express";
import {
  createLunch,
  getLunch,
  getAllLunches,
} from "../controllers/lunch-controller.js";
import { verifyAccessToken } from "../utils/tokens.js";

const router = Router();

// Send a Lunch
router.post("/send", verifyAccessToken, createLunch);

// Get a Lunch
router.get('/all/:id',verifyAccessToken, getLunch);

// Get all Lunches
router.get("/all", verifyAccessToken, getAllLunches);

// Redeem a lunch
//no need for this endpoint again
//router.put('/redeem/:id', redeemUserLunch);

export default router;
