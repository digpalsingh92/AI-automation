import morgan from "morgan";
import { logger } from "../utils/logger.js";

// Direct Morgan HTTP logs through our Winston stream
const stream = {
    write: (message: string) => logger.http(message.trim()),
};

// Skip HTTP logging if you are in production mode to save performance
const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};

// Build the middleware
export const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
);
