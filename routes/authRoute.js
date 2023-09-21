import express from "express";
import {createAdminSignUp, userSignUp} from "../controllers/auth/auth-controller"
const router = express.Router();

router.post('/user/signup', createAdminSignUp)
router.post('/staff/signup', userSignUp)


export default router