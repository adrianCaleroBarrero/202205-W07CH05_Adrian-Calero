import mongoose from 'mongoose';
import { mongooseConnect, RelationField } from '../db/mongoose.js';

(async () => {
    await mongooseConnect();
})();

export interface iUser {
    name: string;
    email: string;
    passwd: string;
    robots: Array<RelationField>;
}

const userSchema = new mongoose.Schema({
    name: { type: mongoose.SchemaTypes.String, required: true },
    email: mongoose.SchemaTypes.String,
    passwd: { type: mongoose.SchemaTypes.String, required: true },
    robots: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Robot',
        },
    ],
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject.__v;
        delete returnedObject.passwd;
    },
});

export const User = mongoose.model('User', userSchema);
