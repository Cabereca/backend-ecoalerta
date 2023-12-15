/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response } from 'express';
import employeeService from '../services/employeeService';

const show = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = await employeeService.findEmployeeById(id);
  return res.json(employee);
};

const store = async (req: Request, res: Response) => {
  const employee = await employeeService.createEmployee(req.body);
  return res.status(201).json(employee);
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const employee = await employeeService.updateEmployee(id, req.body);
  return res.json(employee);
};

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;
  await employeeService.deleteEmployee(id);
  return res.status(204).send();
};

export default {
  show,
  store,
  update,
  destroy
};
