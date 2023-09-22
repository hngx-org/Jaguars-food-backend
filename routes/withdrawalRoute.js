const { Router } = require('express');
const { createWithdrawal } = require('../controllers/users-controller.js');

const router = Router();

// Withdrawal Request
router.post('/request', createWithdrawal);

module.exports = router;
