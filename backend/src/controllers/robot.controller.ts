/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import mongoose, { Model } from 'mongoose';
import { User } from '../models/user.model.js';

export class RobotController<iRobot> {
    constructor(public model: Model<iRobot>) {}

    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('content-type', 'application/json');
        resp.send(JSON.stringify(await this.model.find()));
    };

    getController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            const result = await this.model.findById(req.params.id);
            if (req.params.id.length !== 24) {
                throw new Error('Invalid ID');
            }
            resp.setHeader('content-type', 'application/json');
            if (result) {
                resp.send(JSON.stringify(result));
            } else {
                resp.status(404);
                resp.send(JSON.stringify({}));
            }
        } catch (error) {
            next(error);
        }
    };

    postController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        try {
            const newItem = await this.model.create(req.body);
            const user = await User.findById(req.body.owner);
            if (!user) {
                throw new Error('Need param owner with her id');
            }

            if (
                !req.body.name &&
                !req.body.date &&
                !req.body.velocity &&
                !req.body.resistance
            ) {
                throw new Error('Put her params');
            }
            user.robots = [...(user.robots as Array<iRobot>), newItem.id];
            user.save();
            resp.setHeader('content-type', 'application/json');
            resp.status(201);
            resp.send(JSON.stringify(newItem));
        } catch (error) {
            next(error);
        }
    };

    patchController = async (req: Request, resp: Response) => {
        const modifyItem = await this.model.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        resp.setHeader('content-type', 'application/json');
        resp.send(JSON.stringify(modifyItem));
    };

    deleteController = async (req: Request, resp: Response) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return resp
                .status(404)
                .json({ msg: `No task with id :${req.params.id}` });
        const deleteItem = await this.model.findByIdAndDelete(req.params.id);
        resp.send(JSON.stringify(deleteItem));
    };
}
