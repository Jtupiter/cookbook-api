'use strict';

const koa = require('koa');
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');

let app = koa();
let router = require('koa-joi-router')();

router.route(userRoutes);
router.route(recipeRoutes);

app.use(router.middleware());

module.exports = app;