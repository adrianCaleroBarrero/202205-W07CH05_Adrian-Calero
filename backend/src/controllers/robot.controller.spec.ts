import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { RobotController } from './robot.controller';

describe('Given a instanciated controller mongoose', () => {
    let mongoose: RobotController<{}>;
    let req: Partial<Request>;
    let resp: Partial<Response>;
    let next: NextFunction;
    let mockModel = {
        find: jest.fn(),
        findById: jest.fn(),
        create: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    };
    beforeEach(() => {
        mongoose = new RobotController(
            mockModel as unknown as mongoose.Model<{}>
        );
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
        };

        next = jest.fn();
    });

    describe('When the method getAllController is called', () => {
        test('Then find() to be called', async () => {
            mockModel.find.mockResolvedValue({});
            await mongoose.getAllController(req as Request, resp as Response);
            expect(mockModel.find).toHaveBeenCalled();
        });
    });

    describe('When the method getController is called', () => {
        test('Then findById() to be called', async () => {
            mockModel.findById.mockResolvedValue({});
            await mongoose.getController(req as Request, resp as Response);
            expect(mockModel.findById).toHaveBeenCalled();
        });

        test('Then findById() to be called', async () => {
            mockModel.findById.mockResolvedValue(null);
            await mongoose.getController(req as Request, resp as Response);
            expect(mockModel.findById).toHaveBeenCalled();
        });
    });

    describe('When the method postController is called', () => {
        test('Then create() to be called', async () => {
            mockModel.create.mockResolvedValue({});
            await mongoose.postController(
                req as Request,
                resp as Response,
                next as NextFunction
            );
            expect(mockModel.create).toHaveBeenCalled();
        });
    });

    describe('When the method patchController is called', () => {
        test('Then findByIdAndUpdate() to be called', async () => {
            mockModel.findByIdAndUpdate.mockResolvedValue({});
            await mongoose.patchController(req as Request, resp as Response);
            expect(mockModel.findByIdAndUpdate).toHaveBeenCalled();
        });
    });

    describe('When the method deleteController is called', () => {
        test('Then findByIdAndDelete() to be called', async () => {
            mockModel.findByIdAndDelete = jest
                .fn()
                .mockResolvedValue({ status: 202 });
            await mongoose.deleteController(req as Request, resp as Response);
            expect(resp.status).toHaveBeenCalledWith(202);
        });
    });
});
