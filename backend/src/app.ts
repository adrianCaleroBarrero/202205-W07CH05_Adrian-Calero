import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { robotRouter } from './router/robot.router.js';
import { userRouter } from './router/user.router.js';

export const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/robots', robotRouter);
app.use('/robot', robotRouter);
app.use('/user', userRouter);
app.use('/users', userRouter);

app.use((error: Error, req: Request, resp: Response, next: NextFunction) => {
    req;
    next;
    console.log(error.message);
    let status = 500;
    if (error.name === 'ValidationError') {
        status = 406;
    } else {
        //
    }
    resp.status(status);
    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };
    resp.send(JSON.stringify(result));
});
