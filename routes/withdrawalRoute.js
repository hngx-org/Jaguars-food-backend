const { Router } = require('express');
const { createWithdrawal } = require('../controllers/users-controller.js');
const authMiddleware = require('../middlewares/authMiddleware');
const router = Router();

// Withdrawal Request
router.post('/request', authMiddleware, createWithdrawal);

module.exports = router;
