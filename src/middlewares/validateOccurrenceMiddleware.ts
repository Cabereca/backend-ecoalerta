import { type NextFunction, type Request, type Response } from 'express';

export const validateOccurrenceMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    console.log("body", req.body)
    next();
  } catch(error) {
    console.log(error)
  }
};
