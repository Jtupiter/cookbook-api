'use strict';

const crypto = require('crypto');
const schemas = require('../schemas');

let routes = [
  {
    method: 'get',
    path: '/user/:id',
    handler: getUser,
    validate: {
      params: schemas.GET_USER
    }
  },
  {
    method: 'post',
    path: '/user',
    handler: createUser,
    validate: {
      body: schemas.CREATE_USER,
      type: 'json'
    }
  }
];

function* getUser() {
  let user = yield this.users.getUser(this.params.id);
  if (user.length == 0) { 
    this.throw('User not found', 404); 
  }
  this.body = user[0]; // Massive returns single result as array
}

function* createUser() {
  let user = Object.assign({}, this.request.body);
  user.salt = crypto.randomBytes(16).toString('hex');
  user.passhash = crypto
    .createHmac('sha256', user.salt)
    .update(user.password)
    .digest('hex');

  delete user.password; // Remove plaintext password

  this.body = yield this.users.createUser(user);
}

module.exports = routes;