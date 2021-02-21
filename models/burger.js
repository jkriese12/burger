var orm = require("../config/orm.js");

var burger = {
  selectAll: function (cb) {
    orm.selectAll(function (res) {
      cb(res);
    });
  },
  insertOne: function (cb) {},
};
