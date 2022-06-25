import express from 'express';
import morgan from 'morgan';

import { robotRouter } from './router/robots.js';

export const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/robots', robotRouter);
