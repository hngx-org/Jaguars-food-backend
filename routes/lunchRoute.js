import { Router } from "express";
import {
  createLunch,
  getLunch,
  getAllLunches,
} from "../controllers/lunch-controller.js";

const router = Router();

// Send a Lunch
router.post("/send", createLunch);

// Get a Lunch
router.get("/:id", getLunch);

// Get all Lunches
router.get("/all", getAllLunches);

// Redeem a lunch
//no need for this endpoint again
//router.put('/redeem/:id', redeemUserLunch);

export default router;
