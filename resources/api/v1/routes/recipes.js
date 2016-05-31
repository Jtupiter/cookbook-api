'use strict';

const schemas = require('../schemas');

let routes = [
  {
    method: 'get',
    path: '/recipe/:id',
    handler: getRecipe,
    validate: {
      params: schemas.GET_RECIPE
    }
  },
  {
    method: 'post',
    path: '/recipe',
    handler: createRecipe,
    validate: {
      body: schemas.CREATE_RECIPE,
      type: 'json'
    }
  }
];

function* getRecipe() {
  this.body = yield this.recipes.getRecipe(this.params.id);
}

function* createRecipe() {
  this.body = yield this.recipes.createRecipe(recipe);
}

module.exports = routes;