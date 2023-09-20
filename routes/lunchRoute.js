import { Router } from "express";
import {
  createLunch,
  getLunch,
  getAllLunches,
  redeemUserLunch,
} from "../controllers/lunch-controller";

const router = Router();


// Send a Lunch
router.post('/send', createLunch);

// Get a Lunch
router.get('/:id', getLunch);

// Get all Lunches
router.get('/all', getAllLunches);

// Redeem a lunch
router.put('/redeem/:id', redeemUserLunch);

module.exports = router;
