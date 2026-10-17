import winston from "winston";

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
};

winston.addColors(colors);

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`
    )
);

// Fallback to "development" if NODE_ENV is unset
const isDevelopment = (process.env.NODE_ENV || "development") === "development";

export const logger = winston.createLogger({
    level: isDevelopment ? "debug" : "http",
    transports: [
        new winston.transports.Console({
            format: logFormat,
        }),
    ],
});
