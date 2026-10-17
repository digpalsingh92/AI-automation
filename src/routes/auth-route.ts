import { registerUser, loginUser, logoutUser } from "../controllers/auth-controllers.js";
import express from "express";
import { validateRequest } from "../middlewares/validate-request.js";
import { registerInputValidation, loginInputValidation } from "../validations/auth-validations.js";

const authRouter = express.Router();

authRouter.post("/register", validateRequest(registerInputValidation), registerUser);
authRouter.post("/login", validateRequest(loginInputValidation), loginUser);
authRouter.get('/logout', logoutUser);
// authRouter.get("/profile", );

export { authRouter };