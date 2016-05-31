'use strict';

const koa = require('koa');
const join = require('path').join;
const resource = require('koa-resourcer');
const docs = require('koa-resourcer-docs');
const massive = require('massive');
const config = require('./config');
const Recipes = require('./lib/models/recipes');
const Users = require('./lib/models/users');
let app = koa();

let db = massive.connectSync({connectionString: config.DB_URL});

app.context.users = new Users(db);
app.context.recipes = new Recipes(db);

resource(app, join(__dirname, 'resources'), docs.addRoute);

let server = app.listen(config.PORT);
console.log("Listening on port: " + config.PORT);

module.exports = {
  app: app,
  server: server
};
