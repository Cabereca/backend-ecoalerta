/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import userRoutes from './routes/userRoutes';
import employeeRoutes from './routes/employeeRoutes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/employee', employeeRoutes);

export default routes;
