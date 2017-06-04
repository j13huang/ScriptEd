$(document).ready(function() {
    var secretNumber = 6;

    $("button").click(function() {
        var guessString = $("input").val();
        var guess = parseInt(guessString, 10);

        if (guess < secretNumber) {
          $("#result").html("too low!");
        } else if (guess > secretNumber) {
          $("#result").html("too high!");
        } else if (guess === secretNumber) {
          $("#result").html("WOOOOOOOHHHH!!!!!! The secret number is 6");
        } else {
          $("#result").html("please enter a real number!");
        }
    });
});
