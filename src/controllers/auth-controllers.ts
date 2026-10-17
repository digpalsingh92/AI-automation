import asyncHandler from "express-async-handler";
import { userLogin, userRegistration, usersProfile } from "../services/auth-service.js";
import type { Request, Response } from "express";
import { sendSuccess } from "../common/api-response.js";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const newUser = await userRegistration({ username, email, password });

    res.cookie('token', newUser.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3600000,
        path: '/'
    });

    sendSuccess(res, newUser, "User registered successfully", 201);
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await userLogin({ username, password });
    res.cookie('token', user.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 3600000,
        path: '/'
    });
    sendSuccess(res, user, "User logged in successfully", 200);
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,      // Must match how it was set
        sameSite: 'strict', // Must match how it was set
        path: '/'          // Default is usually '/', but explicit is safer
    });

    sendSuccess(res, {}, "User logged out successfully", 200);
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.body;
    const user = await usersProfile(username); //pass username to check for User
    sendSuccess(res, user, "User profile fetched successfully", 200);
});