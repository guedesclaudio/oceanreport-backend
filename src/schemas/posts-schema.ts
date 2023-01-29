import Joi from "joi";

export const createPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required()
});

export const deletePostSchema = Joi.object({
    postId: Joi.number().required().min(0),
});