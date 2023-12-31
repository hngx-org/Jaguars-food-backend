const { Router } = require("express");
const {
  createLunch,
  getLunch,
  getAllLunches,
} = require("../controllers/lunch-controller.js");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

// Send a Lunch
router.post("/send", authMiddleware, createLunch);

// Get a Lunch
router.get("/:id", authMiddleware, getLunch);

// Get all Lunches
router.get("/", authMiddleware, getAllLunches);

module.exports = router;
