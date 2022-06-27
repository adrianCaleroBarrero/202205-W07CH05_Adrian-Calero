import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function mongooseConnect() {
    return mongoose.connect(process.env.URL_MONGO as string);
}

export interface RelationField {
    type: mongoose.Types.ObjectId;
    ref: string;
}
