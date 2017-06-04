$(document).ready(function() {
    var money = 1.00;

    $("#add_1_dollar").click(function() {
        money = money + 1;
        $("#money").html("I have $" + money);
    });

    $("#subtract_1_dollar").click(function() {
        if (money >= 1) {
            money = money - 1;
            $("#money").html("I have $" + money);
        }
    });

    $("#add_25_cents").click(function() {
        money = money + 0.25;
        $("#money").html("I have $" + money);
    });

    $("#subtract_25_cents").click(function() {
        if (money >= 0.25) {
            money = money - 0.25;
            $("#money").html("I have $" + money);
        }
    });

    var cokes = 0;
    var chips = 0;

    $("#buy").click(function() {
        var item = $("input").val();
        if (item === "coke") {
            if (money < 1.5) {
                $("#message").html("I don't have enough money for coke");
            } else {
                money = money - 1.5;
                cokes = cokes + 1;
                $("#message").html("I bought a coke for $1.50");
            }
        } else if (item === "chips") {
            if (money < 1.25) {
                $("#message").html("I don't have enough money for chips");
            } else {
                money = money - 1.25;
                chips = chips + 1;
                $("#message").html("I bought chips for $1.25");
            }
        } else {
            $("#message").html("This vending machine doesn't have that item");
        }
        $("#money").html("I have $" + money);
        $("#purchases").html("I bought " + cokes + " cokes and " + chips + " chips.");
    });
});
