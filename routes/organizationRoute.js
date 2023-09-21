import express from 'express';
import {
	userSignUp,   
} from '../controllers/auth/index.js'

const router = express.Router();
//USER SIGN UP ROUTE
router.route('/staff/signup').post(userSignUp);


export default router;