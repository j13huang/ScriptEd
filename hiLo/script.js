$(document).ready(function() {
    var secretNumber = 6;

    function pickJar(jellybeanCount, selector) {
      $(".jars img").css("border", "none");
      $(selector).css("border", "2px solid #15c2d2");
      secretNumber = jellybeanCount;
      $("#controls").show();
    }

    $("#jellybeans_small").click(function() {
      pickJar(2, "#jellybeans_small");
    });

    $("#jellybeans_medium").click(function() {
      pickJar(55, "#jellybeans_medium");
    });

    $("#jellybeans_large").click(function() {
      pickJar(87, "#jellybeans_large");
    });

    $("button").click(function() {
        var guessString = $("input").val();
        var guess = parseInt(guessString, 10);

        if (guess < secretNumber) {
          $("#result").html("too low!");
        } else if (guess > secretNumber) {
          $("#result").html("too high!");
        } else if (guess === secretNumber) {
          $("#result").html("WOOOOOOOHHHH!!!!!! There are " + secretNumber + " jellybeans in this jar!");
        } else {
          $("#result").html("please enter a real number!");
        }
    });
});
