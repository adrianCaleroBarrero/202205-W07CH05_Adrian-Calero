import { Router } from 'express';
import { RobotController } from '../controllers/robot.controller.js';
import { RobotModel } from '../models/robot.model.js';

export const robotController = new RobotController(RobotModel);
export const robotRouter = Router();

robotRouter.get('/', robotController.getAllController);
robotRouter.get('/:id', robotController.getController);
robotRouter.post('/', robotController.postController);
robotRouter.patch('/:id', robotController.patchController);
robotRouter.delete('/:id', robotController.deleteController);
