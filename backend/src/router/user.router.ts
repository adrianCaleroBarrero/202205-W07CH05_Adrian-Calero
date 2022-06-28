import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { User } from '../models/user.model.js';
import { loginRequired } from '../middleware/login-required.js';

export const userController = new UserController(User);
export const userRouter = Router();

userRouter.get('/', userController.getAllController);
userRouter.get('/:id', userController.getController);
userRouter.post('/', userController.postController);
userRouter.post('/login', userController.loginController);
userRouter.patch('/:id', loginRequired, userController.patchController);
userRouter.delete('/:id', loginRequired, userController.deleteController);
