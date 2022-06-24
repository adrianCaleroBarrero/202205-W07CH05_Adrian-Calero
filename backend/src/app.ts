import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import path from 'path'

import { robotRouter } from './router/robots.js';

export const app = express();

// Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/robots', robotRouter);

app.use((error: Error, req: Request, resp: Response, next: NextFunction) => {
    req;
    next;
    let status = 500;
    if (error.name === 'ValidationError') {
        status = 406;
    }
    resp.status(status);
    const result = { status: status, error: error.message };
    resp.end(JSON.stringify(result));
});
