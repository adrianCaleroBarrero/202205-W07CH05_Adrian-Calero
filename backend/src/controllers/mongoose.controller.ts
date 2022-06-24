/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';

export class MongooseController<T> {
    constructor(public model: Model<T>) {}

    async getAllController(req: Request, resp: Response) {
        resp.setHeader('content-type', 'application/json');
        resp.end(JSON.stringify(await this.model.find()));
    }

    async getController(req: Request, resp: Response) {
        const result = await this.model.findById(req.params.id);
        resp.setHeader('content-type', 'application/json');
        if (result) {
            resp.end(JSON.stringify(result));
        } else {
            resp.status(404);
            resp.end(JSON.stringify({}));
        }
    }

    async postController(req: Request, resp: Response, next: NextFunction) {
        try {
            const newItem = await this.model.create(req.body);
            resp.setHeader('content-type', 'application/json');
            resp.status(201);
            resp.end(JSON.stringify(newItem));
        } catch (error) {
            next(error);
        }
    }

    async patchController(req: Request, resp: Response) {
        const modifyItem = await this.model.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        resp.setHeader('content-type', 'application/json');
        resp.end(JSON.stringify(modifyItem));
    }

    async deleteController(req: Request, resp: Response) {
        const deleteItem = await this.model.findByIdAndDelete(req.params.id);
        resp.end(JSON.stringify(deleteItem));
    }
}
