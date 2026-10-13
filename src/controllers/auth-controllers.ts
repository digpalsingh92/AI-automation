import asyncHandler from "express-async-handler";
import { userRegistration } from "../services/auth-service.js";
import type { Request, Response } from "express";
import { sendSuccess } from "../common/api-response.js";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const newUser = await userRegistration({ username, email, password });

    sendSuccess(res, newUser, "User registered successfully", 201);
});