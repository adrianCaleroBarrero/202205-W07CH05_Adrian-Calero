import { Request, Response, NextFunction } from 'express';
import { iUser, User } from '../models/user.model';
import { UserController } from './user.controller';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

jest.mock('../models/user.model');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('Given the user controller', () => {
    let controller: UserController<iUser>;
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            params: {
                id: '1',
            },
            body: {},
        };

        resp = {
            setHeader: jest.fn(),
            send: jest.fn(),
            status: jest.fn(),
            json: jest.fn(),
        };

        next = jest.fn();
        controller = new UserController(User) as any;
    });
    describe('When i use the method getAllController', () => {
        test('Then it should send a response', async () => {
            User.find = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue({ robot: 'test' }),
            });

            await controller.getAllController(req as Request, resp as Response);
            expect(User.find).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(
                JSON.stringify({ robot: 'test' })
            );
        });
    });

    describe('When i use the method getController', () => {
        test('Then it should send a response', async () => {
            (req = {
                params: {
                    id: '62b5d4943bc55ff0124f6c1d',
                },
            }),
                (User.findById = jest.fn().mockReturnValue({
                    populate: jest.fn().mockResolvedValue({ robots: 0 }),
                }));
            await controller.getController(req as Request, resp as Response);
            expect(resp.send).toHaveBeenCalled();
        });
        test('Then it should send a status 404', async () => {
            (req = {
                params: {
                    id: '62b5d4943bc55ff012',
                },
            }),
                (User.findById = jest.fn().mockReturnValue({
                    populate: jest.fn().mockResolvedValue(undefined),
                }));
            await controller.getController(req as Request, resp as Response);
            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });

    describe('When i use the method postController', () => {
        test('Then it should send a status 201', async () => {
            bcrypt.hash = jest.fn();
            User.create = jest.fn().mockReturnValue({});

            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(User.create).toHaveBeenCalled();
            expect(resp.status).toHaveBeenCalledWith(201);
        });
        test('Then it should send a error', async () => {
            bcrypt.hash = jest.fn().mockResolvedValue(undefined);
            User.create = jest.fn().mockResolvedValue(undefined);

            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );

            expect(next).toHaveBeenCalled();
        });
    });
    describe('When i use the method loginController', () => {
        test('Then it should send a status 201', async () => {
            User.findOne = jest.fn().mockResolvedValue({ name: 'test' });
            bcrypt.compare = jest.fn().mockResolvedValue(true);
            jwt.sign = jest.fn().mockReturnValue({});

            await controller.loginController(
                req as Request,
                resp as Response,
                next as NextFunction
            );

            expect(resp.status).toHaveBeenCalledWith(201);
        });
        test('Then it should catch a error', async () => {
            User.findOne = jest.fn().mockResolvedValue({ name: 'test' });
            bcrypt.compare = jest.fn().mockResolvedValue(false);

            await controller.loginController(
                req as Request,
                resp as Response,
                next as NextFunction
            );

            expect(next).toHaveBeenCalled();
        });
    });
    describe('When i use the method patchController', () => {
        test('Then it should send the mopdify item', async () => {
            User.findByIdAndUpdate = jest.fn().mockResolvedValue({});
            await controller.patchController(req as Request, resp as Response);
            expect(resp.send).toHaveBeenCalled();
        });
    });

    describe('When i use the method deleteController', () => {
        test('Then it should send the delete item', async () => {
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(1);
            User.findByIdAndDelete = jest.fn().mockResolvedValue({});
            await controller.deleteController(req as Request, resp as Response);
            expect(resp.send).toHaveBeenCalled();
        });
        test('Then it should send status 404', async () => {
            mongoose.Types.ObjectId.isValid = jest
                .fn()
                .mockReturnValue(undefined);
            resp.status = jest.fn().mockReturnValue({ json: jest.fn() });
            await controller.deleteController(req as Request, resp as Response);
            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });
});
