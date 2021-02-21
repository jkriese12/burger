// Import MySQL connection,
var connection = require("../config/connection.js");

// Main ORM function
var orm = {
  selectAll: function () {
    var query = "SELECT * FROM burgers";
    connection.query(query, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  },
  insertOne: function (burgerName) {
    var query = "INSERT INTO burgers (burger_name,devoured VALUES ?, FALSE)";
    connection.query(query, burgerName, function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  },
  updateOne: function (arg1, arg2) {
    var query = "UPDATE burgers SET burger_name = ? WHERE id=?";
    connection.query(query, [arg1, arg2], function (err, result) {
      if (err) throw err;
      console.log(result);
    });
  },
};
// Exporting orm for use on server
module.exports = orm;
