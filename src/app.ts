import express, { type Request, type Response } from 'express'
import cors from 'cors'
import { notFoundHandler } from './common/not-found.js';
import { errorHandler } from './common/error-handler.js';
import cookieParser from "cookie-parser"

import { authRouter } from './routes/auth-route.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser())

// Routes
app.use('/api/v1/auth', authRouter);

//Not found Error Handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

app.get('/health', (req: Request, res: Response) => {
    res.send("OK");
})

export default app;