import mongoose from 'mongoose';
import { mongooseConnect, RelationField } from '../db/mongoose.js';

await mongooseConnect();

export interface iRobot {
    name: string;
    img: string;
    owner: RelationField;
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
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

export const RobotModel = mongoose.model('robot', robotSchema);
