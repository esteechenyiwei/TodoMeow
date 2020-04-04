//handle ajax request to post/delete items
$(document).ready(function() {
  $("form").on("submit", function() {
    var task = $("form input");
    var todo = { task: task.val() };

    $.ajax({
      type: "POST",
      url: "/",
      data: todo,
      success: function(data) {
        //do something with the data via front-end framework
        location.reload();
      }
    });

    return false;
  });

  $("li").on("click", function() {
    var item = $(this)
      .text()
      .replace(/ /g, "-");
    $.ajax({
      type: "DELETE",
      url: "/" + item,
      success: function(data) {
        //do something with the data via front-end framework
        location.reload();
      }
    });
  });
});
