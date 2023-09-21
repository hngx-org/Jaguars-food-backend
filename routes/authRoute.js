import express from "express";
import {createAdminSignUp} from "../controllers/auth/auth-controller"
const router = express.Router();

router.post('/user/signup', createAdminSignUp)

export default router