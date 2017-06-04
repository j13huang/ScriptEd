$(document).ready(function() {
    var guessesRemaining = 7;
    var secretNumber = null;

    $("#secretButton").click(function() {
        var secretString = $("#secret").val();
        var secret = parseInt(secretString, 10);
        secretNumber = secret;
        guessesRemaining = 7;
        $("#guessesRemaining").html(guessesRemaining);
    });

    function displayLostMessage() {
        $("#result").html("you don't have any guesses remaining! The secret number was " + secretNumber + ". Set a new secret number to start a new game.");
        $("#result").append('<div><img src="http://i.imgur.com/7981ABx.gif"></div>');
    }

    $("#guessButton").click(function() {
        if (guessesRemaining === 0) {
          displayLostMessage();
          return;
        }
        if (!secretNumber) {
          $("#result").html("please set a valid secret number first!");
          return;
        }

        var guessString = $("#guess").val();
        var guess = parseInt(guessString, 10);

        if (guess === secretNumber) {
          $("#result").html("WOOOOOOOHHHH!!!!!! The secret number is" + secretNumber);
          $("#result").append('<div><img src="https://media0.giphy.com/media/l41YfcbSoHyk5quLC/giphy.gif"></div>');
        } else if (guess > secretNumber - 3 && guess < secretNumber + 3) {
          $("#result").html("so close!!!");
        } else if (guess < secretNumber) {
          $("#result").html("too low!");
        } else if (guess > secretNumber) {
          $("#result").html("too high!");
        } else {
          $("#result").html("please enter a real number!");
        }

        guessesRemaining = guessesRemaining - 1;
        $("#guessesRemaining").html(guessesRemaining);
        if (guessesRemaining === 0) {
          displayLostMessage();
        }
    });
});
