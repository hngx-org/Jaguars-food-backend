import express from "express";
import {orgSignUp} from "../controllers/auth/auth-controller.js"
const router = express.Router();

// SIGN UP ROUTE
router.post('/user/signup', orgSignUp);

// LOGIN ROUTE
router.post('/login');


export default router