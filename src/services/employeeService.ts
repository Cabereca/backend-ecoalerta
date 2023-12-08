/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { PrismaClient } from '@prisma/client';
import {
  BadRequestError,
  InternalServerError,
  NotFoundError
} from '../helpers/api-errors';
import {
  type ICreateEmployee,
  type IUpdateEmployee
} from '../dtos/EmployeeDTO';

const prisma = new PrismaClient();

const findEmployeeById = async (id: string) => {
  if (!id) {
    throw new BadRequestError('Id is required');
  }
  const employee = await prisma.employee.findUnique({
    where: {
      id
    }
  });
  if (!employee) {
    throw new NotFoundError('Employee not found');
  }
  return employee;
};

const findEmployeeByEmail = async (email: string) => {
  if (!email) {
    throw new BadRequestError('Email is required');
  }
  const employee = await prisma.employee.findUnique({
    where: {
      email
    }
  });
  if (!employee) {
    throw new NotFoundError('Employee not found');
  }
  return employee;
};

const findEmployeeByRegistrationNumber = async (registrationNumber: string) => {
  if (!registrationNumber) {
    throw new BadRequestError('Registration number is required');
  }
  const employee = await prisma.employee.findUnique({
    where: {
      registrationNumber
    }
  });
  if (!employee) {
    throw new NotFoundError('Employee not found');
  }
  return employee;
};

const createEmployee = async (data: ICreateEmployee) => {
  if (!data) {
    throw new BadRequestError('Data is required');
  }
  const employee = await prisma.employee.create({
    data
  });
  if (!employee) {
    throw new InternalServerError('Employee not created');
  }
  return employee;
};

const updateEmployee = async (id: string, data: IUpdateEmployee) => {
  if (!id) {
    throw new BadRequestError('Id is required');
  }
  if (!data) {
    throw new BadRequestError('Data is required');
  }
  const employee = await prisma.employee.update({
    where: {
      id
    },
    data
  });
  if (!employee) {
    throw new InternalServerError('Employee not updated');
  }
  return employee;
};

const deleteEmployee = async (id: string) => {
  if (!id) {
    throw new BadRequestError('Id is required');
  }
  const employee = await prisma.employee.delete({
    where: {
      id
    }
  });
  if (!employee) {
    throw new InternalServerError('Employee not deleted');
  }
};

export default {
  findEmployeeById,
  findEmployeeByEmail,
  findEmployeeByRegistrationNumber,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
