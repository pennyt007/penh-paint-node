import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

interface User {
  email: string;
  password: string;
  user_role_type_id: number;
}

export function validateUser(user: User) {
  const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
  };


  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity(complexityOptions),
    user_role_type_id: Joi.number().required(),
    staff_id: Joi.number().required()
    })

  return schema.validate(user);
};

export function validateEmailPassword(user: User) {

  const complexityOptions = {
    min: 8,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
  };

  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: passwordComplexity(complexityOptions),
  });

  return schema.validate(user);
};