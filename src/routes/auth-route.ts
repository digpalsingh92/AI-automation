import { registerUser, loginUser, logoutUser, getProfile } from "../controllers/auth-controllers.js";
import express from "express";
import { validateRequest } from "../middlewares/validate-request.js";
import { registerInputValidation, loginInputValidation } from "../validations/auth-validations.js";
import { authenticatedUser } from "../middlewares/auth-middleware.js";

const authRouter = express.Router();

authRouter.post("/register", validateRequest(registerInputValidation), registerUser);
authRouter.post("/login", validateRequest(loginInputValidation), loginUser);
authRouter.post('/logout', logoutUser);
authRouter.get("/profile", authenticatedUser, getProfile);

export { authRouter };