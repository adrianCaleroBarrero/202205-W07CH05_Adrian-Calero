import { Request, Response, NextFunction } from 'express';
import { ExtRequest } from '../interfaces/token';
import { RobotModel } from '../models/robot.model';

export const userRequired = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userID = (req as unknown as ExtRequest).tokenPayload.id;
    const findRobot = await RobotModel.findById(req.params.id);
    if (findRobot?.owner === userID) {
        next();
    } else {
        const error = new Error();
        error.name = 'UserAuthorizationError';
        next(error);
    }
};
