'use strict';

const join = require('path').join;
const Runner = require('../lib/runner');

const scripts = join(__dirname, 'sql');

exports.up = function(next) {
  Runner(function* (db) {
    yield db.base.up;
    yield db.base.functions;
    next();
  }, scripts);
};

exports.down = function(next) {
  Runner(function* (db) {
    yield db.base.down;
    next();
  }, scripts);
};
