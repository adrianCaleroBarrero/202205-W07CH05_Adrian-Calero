/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import mongoose, { Model } from 'mongoose';

export class RobotController<iRobot> {
    constructor(public model: Model<iRobot>) {}

    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('content-type', 'application/json');
        resp.end(JSON.stringify(await this.model.find()));
    };

    getController = async (req: Request, resp: Response) => {
        const result = await this.model.findById(req.params.id);
        resp.setHeader('content-type', 'application/json');
        if (result) {
            resp.end(JSON.stringify(result));
        } else {
            resp.status(404);
            resp.end(JSON.stringify({}));
        }
    };

    postController = async (req: Request, resp: Response) => {
        const newItem = await this.model.create(req.body);
        resp.setHeader('content-type', 'application/json');
        resp.status(201);
        resp.end(JSON.stringify(newItem));
    };

    patchController = async (req: Request, resp: Response) => {
        const modifyItem = await this.model.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        resp.setHeader('content-type', 'application/json');
        resp.end(JSON.stringify(modifyItem));
    };

    deleteController = async (req: Request, resp: Response) => {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return resp
                .status(404)
                .json({ msg: `No task with id :${req.params.id}` });
        const deleteItem = await this.model.findByIdAndDelete(req.params.id);
        resp.end(JSON.stringify(deleteItem));
    };
}
