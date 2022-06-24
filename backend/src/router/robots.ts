import { Router } from 'express';
import { MongooseController } from '../controllers/mongoose.controller';
import { RobotModel } from '../models/robot.model';
export const robotController = new MongooseController(RobotModel);
export const robotRouter = Router();

robotRouter.get('/', robotController.getAllController);
robotRouter.get('/:id', robotController.getController);
robotRouter.post('/', robotController.postController);
robotRouter.patch('/:id', robotController.patchController);
robotRouter.delete('/:id', robotController.deleteController);
