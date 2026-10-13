import type {
    ErrorRequestHandler,
} from "express";

import { AppError } from "../common/app-error.js";

export const errorHandler: ErrorRequestHandler = (
    err,
    _req,
    res,
    _next
) => {
    let statusCode = 500;
    let code = "INTERNAL_SERVER_ERROR";
    let message = "Something went wrong";
    let details: unknown;

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        code = err.code;
        message =
            statusCode >= 500
                ? "Internal server error"
                : err.message;

        details =
            statusCode < 500 ? err.details : undefined;
    }

    // Log the original error on the server.
    // Replace console.error with your structured logger in production.
    console.error({
        error: err,
        statusCode,
        code,
    });

    return res.status(statusCode).json({
        success: false,
        error: {
            code,
            message,
            ...(details !== undefined ? { details } : {}),
        },
    });
};