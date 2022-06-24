import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

await mongoose.connect(process.env.URL_MONGO as string);
const robotSchema = new mongoose.Schema({
    id: String,
    name: String,
    img: String,
    velocity: Number,
    resistence: Number,
    date: String,
});

export const RobotModel = mongoose.model('Robot', robotSchema);
