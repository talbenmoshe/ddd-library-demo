import Joi from 'joi';

export interface IMemberLoginDto {
  email: string;
  password: string;
}

export interface IMemberSignupDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

export const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional()
});
