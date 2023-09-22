import express from "express";
import { organisationSignUp } from "../controllers/auth/index.js";



const authRouter = express.Router();

authRouter.post("/user/signup", organisationSignUp);

export default authRouter;
