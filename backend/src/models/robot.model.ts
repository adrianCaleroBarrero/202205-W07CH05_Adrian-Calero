import mongoose from 'mongoose';
import { mongooseConnect } from '../db/mongoose.js';

await mongooseConnect();

export interface iRobot {
    name: string;
    img: string;
    velocity: number;
    resistence: number;
    date: string;
}

const robotSchema = new mongoose.Schema({
    name: mongoose.SchemaTypes.String,
    img: mongoose.SchemaTypes.String,
    velocity: mongoose.SchemaTypes.Number,
    resistence: mongoose.SchemaTypes.Number,
    date: mongoose.SchemaTypes.String,
});

export const RobotModel = mongoose.model('robot', robotSchema);
