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
    id: String,
    name: String,
    img: String,
    velocity: Number,
    resistence: Number,
    date: String,
});

export const RobotModel = mongoose.model('Robot', robotSchema);
