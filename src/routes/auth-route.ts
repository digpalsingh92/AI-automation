import { registerUser } from "../controllers/auth-controllers.js";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", registerUser);

export { authRouter };