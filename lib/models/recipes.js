'use strict';

class Recipes {
  constructor(db) {
    this.db = db;
  }

  getRecipe(id) {
    return (callback) => {
      this.db.recipes.findOne(id, callback);
    };
  }

  createRecipe(recipe) {
    let args = [
      recipe.user_id,
      recipe.name,
      recipe.description || '',
      recipe.private || false
    ];

    return (callback) => {
     // this.db.save_recipe(args, callback);
    };
  }
}

module.exports = Recipes;