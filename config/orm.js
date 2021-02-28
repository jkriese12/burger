// Import MySQL connection,
var connection = require("../config/connection.js");
// SQL syntax helper for pushing an array of question marks for SQL queries
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Main ORM function - Selected names will describe each objects functionality
var orm = {
  selectAll: function (table, cb) {
    var query = "SELECT * FROM " + table + ";";
    connection.query(query, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
      console.log(result);
    });
  },
  insertOne: function (table, cols, vals, cb) {
    var query = "INSERT INTO " + table;
    query += " (";
    query += cols.toString();
    query += ") ";
    query += "VALUES (";
    query += printQuestionMarks(vals.length);
    query += ") ";
    connection.query(query, vals, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
      console.log(result);
    });
  },
  updateOne: function (table, objColVals, condition, cb) {
    var query = "UPDATE " + table;
    query += " SET ";
    query += objToSql(objColVals);
    query += " WHERE ";
    query += condition;
    connection.query(query, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
      console.log(result);
    });
  },
  delete: function (table, condition, cb) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
      console.log(result);
    });
  },
};
// Exporting orm for use on server
module.exports = orm;
