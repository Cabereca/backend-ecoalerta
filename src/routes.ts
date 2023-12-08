import { Router } from 'express';
import employeeRoutes from './routes/employeeRoutes';

const routes = Router();

routes.use('/employee', employeeRoutes);

export default routes;
