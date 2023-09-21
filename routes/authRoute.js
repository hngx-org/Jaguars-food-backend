const express = require('express');
const { userSignUp } = require('../controllers/auth/auth-controller');

const router = express.Router();

// router.post('/user/signup', userSignUp)

module.exports = router;
