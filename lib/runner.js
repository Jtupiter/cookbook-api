'use strict';

const massive = require('massive');
const co = require('co');
const config = require('../config');

/*
 * callback: generator function
 * scripts: directory string of sql scripts || undefined
 */

module.exports = function(callback, scripts) {
  massive.connect({
    connectionString: config.DB_URL,
    scripts: scripts
  }, function(err, db) {
    if (err) throw err;
    co(callback(db));
  });
};
