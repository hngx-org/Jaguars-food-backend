import express from "express";
import {userSignUp} from "../controllers/auth/auth-controller"
const router = express.Router();

router.post('/user/signup', userSignUp)

export default router