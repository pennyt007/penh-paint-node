import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export default function validateData(
  validationFunction: (data: any) => Joi.ValidationResult
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validationFunction(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    next();
  };
}
