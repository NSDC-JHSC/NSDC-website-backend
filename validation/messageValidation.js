const Joi = require('joi');

const messageSchema = Joi.object({
  name: Joi.string().max(64).required(),
  email: Joi.string().email().required(),
  message: Joi.string().max(600).required(),
});

module.exports = { messageSchema };
