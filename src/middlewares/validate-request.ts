import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodSchema } from "zod";
import { BadRequestError } from "../common/app-error.js";

export const validateRequest = (schema: ZodSchema) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return next(new BadRequestError("Validation failed", error.issues));
            }
            return next(new BadRequestError("Invalid request", error));
        }
    };
};