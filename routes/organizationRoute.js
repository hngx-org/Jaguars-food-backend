import express from 'express';
import {
	staffSignUp,   
} from '../controllers/auth/index.js'

const router = express.Router();
//USER SIGN UP ROUTE
router.route('/staff/signup').post(staffSignUp);


export default router;