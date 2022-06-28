/* eslint-disable no-unused-vars */
import { NextFunction, Request, response, Response } from 'express';
import mongoose, { HydratedDocument, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export class UserController<iUser> {
    constructor(public model: Model<iUser>) {}

    getAllController = async (req: Request, resp: Response) => {
        req;
        resp.setHeader('content-type', 'application/json');
        resp.end(
            JSON.stringify(
                await this.model.find().populate('robots', { owner: 0 })
            )
        );
    };

    getController = async (req: Request, resp: Response) => {
        const result = await this.model
            .findById(req.params.id)
            .populate('robots', { owner: 0 });
        resp.setHeader('content-type', 'application/json');
        if (result) {
            resp.end(JSON.stringify(result));
        } else {
            resp.status(404);
            resp.end(JSON.stringify({}));
        }
    };

    postController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        let newItem: HydratedDocument<any>;
        try {
            req.params.id = await bcrypt.hash(req.body.passwd, 10);
            newItem = await this.model.create(req.body);
        } catch (error) {
            next(error);
            return;
        }
        resp.setHeader('content-type', 'application/json');
        resp.status(201);
        resp.end(JSON.stringify(newItem));
    };

    loginController = async (
        req: Request,
        resp: Response,
        next: NextFunction
    ) => {
        const findUser: any = await this.model.findOne({ name: req.body.name });
        if (
            !findUser ||
            !(await bcrypt.compare(findUser.password, req.body.password))
        ) {
            const error = new Error('Invalid user or password');
            error.name = 'UserAuthorizationError';
            next(error);
            return;
        }
        const tokenPayload = {
            id: findUser.id,
            name: findUser.name,
        };
        const token = jwt.sign(tokenPayload, process.env.SECRET as string);
        resp.setHeader('content-type', 'application/json');
        resp.status(201);
        response.send(JSON.stringify({ token, id: findUser.id }));
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
