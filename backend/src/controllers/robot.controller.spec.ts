import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { iRobot, RobotModel } from '../models/robot.model';
import { User } from '../models/user.model';
import { RobotController } from './robot.controller';

jest.mock('../models/robot.model');

describe('Given a instanciated controller mongoose', () => {
    let controller: RobotController<iRobot>;
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
        controller = new RobotController(RobotModel) as any;
    });

    describe('When the method getAllController is called', () => {
        test('Then find() to be called', async () => {
            RobotModel.find = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue({ robot: 'test' }),
            });

            await controller.getAllController(req as Request, resp as Response);
            expect(RobotModel.find).toHaveBeenCalled();
            expect(resp.send).toHaveBeenCalledWith(
                JSON.stringify({ robot: 'test' })
            );
        });
    });

    describe('When the method getController is called', () => {
        test('Then findById() to be called', async () => {
            (req = {
                params: {
                    id: '62b5d4943bc55ff0124f6c1d',
                },
            }),
                (RobotModel.findById = jest.fn().mockReturnValue({
                    populate: jest.fn().mockResolvedValue({ robots: 0 }),
                }));
            await controller.getController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.send).toHaveBeenCalled();
        });

        test('Then findById() to be called with status 404', async () => {
            req = {
                params: {
                    id: '62b5d4943bc55ff0124f6c1d',
                },
            };
            RobotModel.findById = jest.fn().mockReturnValue({
                populate: jest.fn().mockResolvedValue(null),
            });
            await controller.getController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.status).toHaveBeenCalledWith(404);
        });
        test('Then findById() to be called with invalid id', async () => {
            req = {
                params: {
                    id: '62b5d4943bc55f',
                },
            };
            RobotModel.findById = jest
                .fn()
                .mockReturnValue({ populate: jest.fn() });

            await controller.getController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });

    describe('When the method postController is called', () => {
        test('Then create() to be called', async () => {
            req = {
                body: { id: '62b5d4943bc55ff0124f6c1d' },
            };
            const mockResult = {
                robots: '62b5d4943bc55ff0124f6c1d',
                save: jest.fn(),
            };
            RobotModel.create = jest.fn().mockResolvedValue({});
            User.findById = jest.fn().mockResolvedValue(mockResult);

            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(resp.status).toHaveBeenCalled();
        });
        test('Then create() to be called with error: Need param owner with her id', async () => {
            RobotModel.create = jest.fn().mockResolvedValue({});
            User.findById = jest.fn().mockReturnValue(undefined);
            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
        test('Then create() to be called with error: Put her params', async () => {
            RobotModel.create = jest.fn().mockReturnValue(undefined);
            User.findById = jest.fn().mockReturnValue({});
            await controller.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(next).toHaveBeenCalled();
        });
    });

    describe('When the method patchController is called', () => {
        test('Then findByIdAndUpdate() to be called', async () => {
            RobotModel.findByIdAndUpdate = jest.fn().mockResolvedValue({});
            await controller.patchController(req as Request, resp as Response);
            expect(RobotModel.findByIdAndUpdate).toHaveBeenCalled();
        });
    });

    describe('When the method deleteController is called', () => {
        test('Then findByIdAndDelete() to be called', async () => {
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(1);
            RobotModel.findByIdAndDelete = jest.fn().mockResolvedValue({});
            await controller.deleteController(req as Request, resp as Response);
            expect(resp.send).toHaveBeenCalled();
        });
        test('Then findByIdAndDelete() to be called with invalid id', async () => {
            mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(false);
            resp.status = jest
                .fn()
                .mockReturnValue({ json: jest.fn().mockReturnValue({}) });
            await controller.deleteController(req as Request, resp as Response);
            expect(resp.status).toHaveBeenCalledWith(404);
        });
    });
});
