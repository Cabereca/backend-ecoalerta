/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const routes = Router();

routes.get('/', userController.findAllUsers);
routes.get('/:email', authMiddleware, userController.findUser);
routes.post('/', userController.createUser);
routes.put('/:email', authMiddleware, userController.updateUser);
routes.delete('/:email', authMiddleware, userController.deleteUser);

export default routes;
