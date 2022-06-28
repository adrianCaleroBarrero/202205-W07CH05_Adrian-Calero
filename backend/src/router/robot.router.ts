import { Router } from 'express';
import { RobotController } from '../controllers/robot.controller.js';
import { loginRequired } from '../middleware/login-required.js';
import { userRequired } from '../middleware/user-required.js';
import { RobotModel } from '../models/robot.model.js';

export const robotController = new RobotController(RobotModel);
export const robotRouter = Router();

robotRouter.get('/', loginRequired, robotController.getAllController);
robotRouter.get('/:id', loginRequired, robotController.getController);
robotRouter.post('/', loginRequired, robotController.postController);
robotRouter.patch(
    '/:id',
    loginRequired,
    userRequired,
    robotController.patchController
);
robotRouter.delete(
    '/:id',
    loginRequired,
    userRequired,
    robotController.deleteController
);
