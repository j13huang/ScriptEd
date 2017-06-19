$(document).ready(function() {
    var money = 10.00;
    var cokes = 0;
    var chips = 0;

    $("#buy").click(function() {
        var item = $("input").val();
        if (item === "coke" && money > 1.5) {
            money = money - 1.5;
            cokes = cokes + 1;
            $("#message").html("I bought a coke for $1.50");
            $("#coke_purchases").html("I have bought " + cokes + " cokes");
        } else if (item === "chips" && money > 1.25) {
            money = money - 1.25;
            chips = chips + 1;
            $("#message").html("I bought chips for $1.25");
            $("#coke_purchases").html("I have bought " + chips + " chips");
        } else {
            $("#message").html("You can't buy that.");
        }
        $("#money").html("I have $" + money);
    });
});
