$(document).ready(function() {
  var scriptEducators = ["Ariel", "Emily", "John", "Luna", "Razzi"];

  $("button").click(function() {
      var randomIndex = Math.floor(Math.random() * scriptEducators.length);
      $("#response").html(scriptEducators[randomIndex] + ", I need some help!");
  });
});

