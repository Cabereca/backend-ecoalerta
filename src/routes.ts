/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import userRoutes from './routes/userRoutes';
import employeeRoutes from './routes/employeeRoutes';
import { login } from './controllers/loginController';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/employee', employeeRoutes);
routes.post('/login', login);

export default routes;
