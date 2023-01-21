import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required().min(6)
});

export const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(6)
});
