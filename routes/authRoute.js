import express from "express";
import { organisationSignUp } from "../controllers/auth/index.js";
import { loginUser } from "../controllers/auth/loginController.js";

const authRouter = express.Router();

authRouter.post("/user/signup", organisationSignUp);
authRouter.post("/login", loginUser);

export default authRouter;
