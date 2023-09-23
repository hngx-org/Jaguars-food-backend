const { Router } = require("express");
const {
  createLunch,
  getLunch,
  redeemUserLunch,
  getAllLunches,
} = require("../controllers/lunch-controller.js");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateSchema } = require("../middlewares/input-validator.js");
const { CreateLunch, RedeemUserLunch } = require("../schema/launch-schema.js");

const router = Router();

// Send a Lunch
router.post("/send", authMiddleware, validateSchema(CreateLunch), createLunch);

// Get a Lunch
router.get("/:id", authMiddleware, getLunch);

// Get all Lunches
router.get("/", authMiddleware, getAllLunches);

// Redeem a lunch
router.put(
  "/redeem/:id",
  authMiddleware,
  validateSchema(RedeemUserLunch),
  redeemUserLunch
);
//no need for this endpoint again

module.exports = router;
