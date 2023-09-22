const { Router } = require('express');
const {
	createLunch,
	getLunch,
	getAllLunches,
} = require('../controllers/lunch-controller.js');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

// Send a Lunch
router.post('/send', authMiddleware, createLunch);

// Get a Lunch
router.get('/:id', authMiddleware, getLunch);

// Get all Lunches
// router.get('/all', getAllLunches);

// Redeem a lunch
//no need for this endpoint again
//router.put('/redeem/:id', redeemUserLunch);

module.exports = router;
