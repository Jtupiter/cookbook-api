'use strict';

const Joi = require('koa-joi-router').Joi;

exports = module.exports = {};

const GUID_REQUIRED = Joi.string().guid().required();
const STRING_REQUIRED = Joi.string().required();
const STRING_OPTIONAL = Joi.string().optional();

exports.GET_USER = Joi.object().keys({
  id: GUID_REQUIRED
});

exports.CREATE_USER = Joi.object().keys({
  username: STRING_REQUIRED,
  email: Joi.string().email().required(),
  password: STRING_REQUIRED,
  name: STRING_OPTIONAL
});

exports.GET_RECIPE = Joi.object().keys({
  id: GUID_REQUIRED
});

exports.CREATE_RECIPE = Joi.object().keys({
  user_id: GUID_REQUIRED,
  name: STRING_REQUIRED,
  description: STRING_OPTIONAL,
  private: Joi.boolean().optional()
});
