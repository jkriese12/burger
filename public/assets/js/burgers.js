// Wrapping entire logic in function to prevent default
$(function () {
  // On click logic for changing a burger to devoured or not devoured
  $(".eatBurger").on("click", function (event) {
    var id = $(this).data("id");
    var eatBurger = $(this).data("devour");

    var eatenBurger = {
      devoured: !eatBurger,
    };

    // Send the PUT request to server
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: eatenBurger,
    }).then(function () {
      // Reload the page to get the updated list
      location.reload();
    });
  });
  // On click logic for adding burger to the database
  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#ca").val().trim(),
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      console.log("created new burger");
      // Reload the page to get the updated list
      location.reload();
    });
  });
  // Delete a burger
  $(".delete-burger").on("click", function (event) {
    var id = $(this).data("id");
    //Sending Delete request to the server
    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
    }).then(function () {
      location.reload();
    });
  });
});
