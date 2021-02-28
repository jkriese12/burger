// IMPORTING EXPRESS
var express = require("express");
var router = express.Router();
// IMPORTING BURGER MODEL TO USE ITS FUNCTIONS
var burger = require("../models/burger.js");
// GET route to show all the burgers in the database
router.get("/", function (req, res) {
  burger.selectAll((data) => {
    var handleBarObj = {
      burgers: data,
    };
    res.render("index", handleBarObj);
  });
});
// POST route when adding a new burger to the database
router.post("/api/burgers", function (req, res) {
  burger.insertOne(
    ["burger_name", "devoured"],
    [req.body.burger_name, req.body.devoured],
    function (result) {
      res.json({ id: result.insertId });
    }
  );
});
// PUT route to update a burgers condition in the database to devoured or NOT devoured
router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne(
    {
      devoured: req.body.devoured,
    },
    condition,
    function (result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});
// DELETE route to remove a burger entirely from the database
router.delete("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
