import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  name: Joi.string().max(64).optional().allow(''),
  avatarUrl: Joi.string().uri().optional().allow(''),
  bio: Joi.string().max(280).optional().allow(''),
});

export const updateRoleSchema = Joi.object({
  role: Joi.string().valid('user', 'admin').required(),
});
