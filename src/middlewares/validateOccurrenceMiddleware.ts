import { type NextFunction, type Request, type Response } from 'express';
import { validateOccurrence } from '../utils/validadeOccurrence';

export const validateOccurrenceMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
  try {
    console.log("body", req.body)
    // const result = validateOccurrence(req.body);
    // if (!result.success) {
    //     const formattedError = result.error.format();
    //     console.log("deu ruim ", formattedError)
    //     return res.status(400).send(formattedError);
    // }
    next();
  } catch(error) {
    console.log(error)
  }
};
