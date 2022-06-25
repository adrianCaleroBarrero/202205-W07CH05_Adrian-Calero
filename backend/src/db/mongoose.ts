import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function mongooseConnect() {
    return mongoose.connect(process.env.URL_MONGO as string);
}
