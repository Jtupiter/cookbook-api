'use strict';

const sanity = require('sanity');
require('dotenv').config();

const required_vars = [
  'DB_URL'
];
sanity.check(required_vars);

exports = module.exports = {};

exports.DB_URL = process.env.DB_URL;
exports.PORT = process.env.PORT;
