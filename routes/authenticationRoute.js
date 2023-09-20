import {Router} from 'express';
const router = Router();

// SIGN UP ROUTE
router.post('/user/signup');

// LOGIN ROUTE
router.post('/login');

module.exports = router;