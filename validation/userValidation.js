const Joi = require('joi');

const updateProfileSchema = Joi.object({
  name: Joi.string().max(64).optional().allow(''),
  avatarUrl: Joi.string().uri().optional().allow(''),
  bio: Joi.string().max(280).optional().allow(''),
});

const updateRoleSchema = Joi.object({
  role: Joi.string().valid('user', 'admin').required(),
});

module.exports = { updateProfileSchema, updateRoleSchema };
