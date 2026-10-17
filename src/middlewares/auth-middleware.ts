
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import {
    InternalServerError,
    UnauthorizedError
} from "../common/app-error.js";

import { config } from "../config/environment.js";

const { JsonWebTokenError } = jwt;

interface TokenPayload extends jwt.JwtPayload {
    userId?: string;
    sub?: string;
}

export const authenticatedUser = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {

    const token: unknown = req.cookies?.token;

    if (typeof token !== "string" || !token) {
        throw new UnauthorizedError(
            "Please login to Access this Resource"
        );
    }

    const secret = config.JWT_SECRET;

    if (!secret) {
        throw new InternalServerError(
            "JWT_SECRET is not configured"
        );
    }

    let decodedToken: jwt.JwtPayload | string;

    try {
        decodedToken = jwt.verify(token, secret, {
            algorithms: ["HS256"]
        });
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            throw new UnauthorizedError("Invalid or expired token");
        }

        throw error;
    }

    if (typeof decodedToken === "string") {
        throw new UnauthorizedError("Invalid token payload");
    }

    const payload = decodedToken as TokenPayload;
    const userId = payload.userId || payload.sub;

    if (!userId || typeof userId !== "string") {
        throw new UnauthorizedError("Invalid token payload");
    }

    req.user = {
        id: userId
    };

    next();
};
