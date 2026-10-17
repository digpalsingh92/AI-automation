import app from "./app.js";
import { logger } from "./utils/logger.js";

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
    logger.info(`Server is successfully running  http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});