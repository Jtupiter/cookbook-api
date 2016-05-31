'use strict';

class Users {
  constructor(db) {
    this.db = db;
  }

  getUser(id) {
    return (callback) => {
      this.db.get_user(id, callback);
    };
  }

  createUser(user) {
    return (callback) => {
      this.db.users.save(user, callback);
    };
  }
}

module.exports = Users;