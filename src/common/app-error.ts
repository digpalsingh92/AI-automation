export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: string;
    public readonly details?: unknown;
    public readonly isOperational: boolean;

    constructor(
        message: string,
        statusCode = 500,
        code = "INTERNAL_SERVER_ERROR",
        details?: unknown
    ) {
        super(message);

        this.name = "AppError";
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        this.isOperational = statusCode < 500;

        Error.captureStackTrace?.(this, AppError);
    }
}

export class BadRequestError extends AppError {
    constructor(message = "Bad Request", details?: unknown) {
        super(message, 400, "BAD_REQUEST", details);
        this.name = "BadRequestError";
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized", details?: unknown) {
        super(message, 401, "UNAUTHORIZED", details);
        this.name = "UnauthorizedError";
    }
}

export class ForbiddenError extends AppError {
    constructor(message = "Forbidden", details?: unknown) {
        super(message, 403, "FORBIDDEN", details);
        this.name = "ForbiddenError";
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Resource not found", details?: unknown) {
        super(message, 404, "NOT_FOUND", details);
        this.name = "NotFoundError";
    }
}

export class ConflictError extends AppError {
    constructor(message = "Conflict", details?: unknown) {
        super(message, 409, "CONFLICT", details);
        this.name = "ConflictError";
    }
}

export class InternalServerError extends AppError {
    constructor(message = "Internal server error", details?: unknown) {
        super(message, 500, "INTERNAL_SERVER_ERROR", details);
        this.name = "InternalServerError";
    }
}