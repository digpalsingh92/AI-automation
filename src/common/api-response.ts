import type { Response } from "express";

interface SuccessResponse<T> {
    success: true;
    message?: string;
    data: T;
}

export function sendSuccess<T>(
    res: Response,
    data: T,
    message?: string,
    statusCode = 200
): Response<SuccessResponse<T>> {
    const body: SuccessResponse<T> = {
        success: true,
        ...(message ? { message } : {}),
        data,
    };

    return res.status(statusCode).json(body);
}