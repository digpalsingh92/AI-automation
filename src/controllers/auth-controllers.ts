import asyncHandler from "express-async-handler";
import { userLogin, userRegistration } from "../services/auth-service.js";
import type { Request, Response } from "express";
import { sendSuccess } from "../common/api-response.js";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const newUser = await userRegistration({ username, email, password });

    sendSuccess(res, newUser, "User registered successfully", 201);
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await userLogin({ username, password });
    sendSuccess(res, user, "User logged in successfully", 200);
})