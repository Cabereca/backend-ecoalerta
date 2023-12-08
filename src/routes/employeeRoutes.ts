/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import employeeController from '../controllers/employeeController';

const router = Router();

router.get('/:id', employeeController.show);
router.post('/', employeeController.store);
router.put('/:id', employeeController.update);
router.delete('/:id', employeeController.destroy);

export default router;
