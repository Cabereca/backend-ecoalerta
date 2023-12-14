/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import userRoutes from './routes/userRoutes';

const routes = Router();

routes.use('/users', userRoutes);

export default routes;
