/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import userRoutes from './routes/userRoutes';
import { login } from './controllers/loginController';

const routes = Router();

routes.use('/users', userRoutes);
routes.post('/login', login);

export default routes;
