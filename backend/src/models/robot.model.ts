import mongoose from 'mongoose';
import { mongooseConnect, RelationField } from '../db/mongoose.js';

(async () => {
    await mongooseConnect();
})();

export interface iRobot {
    name: string;
    img: string;
    velocity: number;
    resistence: number;
    date: string;
    owner: Array<RelationField> | null;
}

const robotSchema = new mongoose.Schema({
    name: mongoose.SchemaTypes.String,
    img: mongoose.SchemaTypes.String,
    velocity: mongoose.SchemaTypes.Number,
    resistence: mongoose.SchemaTypes.Number,
    date: mongoose.SchemaTypes.String,
    owner: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
        },
    ],
});

export const RobotModel = mongoose.model('Robot', robotSchema);

