import Joi from 'joi';

export const messageSchema = Joi.object({
  name: Joi.string().max(64).required(),
  email: Joi.string().email().required(),
  message: Joi.string().max(600).required(),
});
