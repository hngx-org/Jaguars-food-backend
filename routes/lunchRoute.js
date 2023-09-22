const { Router } = require('express');
const {
	createLunch,
	getLunch,
	redeemUserLunch,
	getAllLunches
} = require('../controllers/lunch-controller.js');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

// Send a Lunch
router.post('/send', authMiddleware, createLunch);

// Get a Lunch
router.get('/:id', authMiddleware, getLunch);

// Get all Lunches
router.get('/all', getAllLunches);

// Redeem a lunch
router.put('/redeem/:id', redeemUserLunch);
//no need for this endpoint again

module.exports = router;
