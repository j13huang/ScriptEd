function setImageDirection(horizontalDirection) {
  if (horizontalDirection > 0) {
    $("#megaman").css("transform", "scaleX(-1)");
    $("#megaman").css("filter", "FlipH");
  } else if (horizontalDirection < 0) {
    $("#megaman").css("transform", "");
    $("#megaman").css("filter", "");
  }
}


$(document).ready(function() {
  var upPressed = false;
  var downPressed = false;
  var leftPressed = false;
  var rightPressed = false;
  var pixelsPerTick = 5;
  var maxNumberEnemies = 5;
  var enemyIDs = [];
  for (var i = 0; i < maxNumberEnemies; i++) {
    enemyIDs.push(null);
  }
  var spawnTimer = 1;
  var maxNumberShots = 3;
  var shotIDs = [];
  for (var i = 0; i < maxNumberShots; i++) {
    shotIDs.push(null);
  }
  var score = 0;

  function moveCharacter() {
    var verticalDirection = 0;
    if (upPressed) {
      verticalDirection--;
    }
    if (downPressed) {
      verticalDirection++;
    }

    var top = $("#megaman").position().top;
    var newTop = top + verticalDirection * pixelsPerTick;
    if (newTop < 0) {
      newTop = 0;
    } else if (newTop > 450) {
      newTop = 450;
    }
    $("#megaman").css("top", newTop + "px");

    var horizontalDirection = 0;
    if (leftPressed) {
      horizontalDirection--;
    }
    if (rightPressed) {
      horizontalDirection++;
    }

    setImageDirection(horizontalDirection);

    var left = $("#megaman").position().left;
    var newLeft = left + horizontalDirection * pixelsPerTick;
    if (newLeft < 0) {
      newLeft = 0;
    } else if (newLeft > 950) {
      newLeft = 950;
    }
    $("#megaman").css("left", newLeft + "px");
  }

  function hasMaxSpriteCount(sprites) {
    for (id of sprites) {
      if (!id) {
        return false;
      }
    }
    return true;
  }

  function spawnEnemy() {
    var enemyNumber = 0;
    for (var i = 0; i < enemyIDs.length; i++) {
      if (!enemyIDs[i]) {
        enemyNumber = i;
        break;
      }
    }
    var id = "enemy" + enemyNumber;
    $("#boundary").append('<img class="enemy" id="' + id + '" src="https://cdn.wikimg.net/strategywiki/images/e/e5/Mega_Man_2_enemy_Claw.png"/>');
    $("#" + id).css("top", Math.random() * 440 + "px");
    enemyIDs[enemyNumber] = id;
  }

  function spawnShot() {
    var shotNumber = 0;
    for (var i = 0; i < shotIDs.length; i++) {
      if (!shotIDs[i]) {
        shotNumber = i;
        break;
      }
    }
    var id = "shot" + shotNumber;
    $("#boundary").append('<img class="shot" id="' + id + '" src="http://rpg.megamanpoweredup.net/images/abilities/atomic-fire/icon_right_40x40.png"/>');
    var top = $("#megaman").position().top;
    $("#" + id).css("top", top + "px");
    var left = $("#megaman").position().left;
    var newLeft = left + 50;
    $("#" + id).css("left", newLeft + "px");
    shotIDs[shotNumber] = id;
  }

  function moveEnemies() {
    for (var i = 0; i < enemyIDs.length; i++) {
      var id = enemyIDs[i];
      if (!id) {
        continue;
      }
      var left = $("#" + id).position().left;
      var newLeft = left - 2;
      if (newLeft <= 0) {
        $("#" + id).remove();
        enemyIDs[i] = null;
      } else {
        $("#" + id).css("left", newLeft + "px");
      }
    }
  }

  function moveShots() {
    for (var i = 0; i < shotIDs.length; i++) {
      var id = shotIDs[i];
      if (!id) {
        continue;
      }
      var left = $("#" + id).position().left;
      var newLeft = left + 5;
      if (newLeft >= 950) {
        $("#" + id).remove();
        shotIDs[i] = null;
      } else {
        $("#" + id).css("left", newLeft + "px");
      }
    }
  }

  function checkCollisions() {
    for (var i = 0; i < shotIDs.length; i++) {
      if (!shotIDs[i]) {
        continue
      }
      for (var j = 0; j < enemyIDs.length; j++) {
        if (!enemyIDs[j]) {
          continue
        }
        var shotPosition = $("#" + shotIDs[i]).position();
        var enemyPosition = $("#" + enemyIDs[j]).position();
        if (shotPosition.left > enemyPosition.left &&
            shotPosition.left < enemyPosition.left + 30 &&
            shotPosition.top > enemyPosition.top &&
            shotPosition.top < enemyPosition.top + 25 ) {
          $("#" + shotIDs[i]).remove();
          shotIDs[i] = null;
          $("#" + enemyIDs[j]).remove();
          enemyIDs[j] = null;
          score++;
          $("#score").html(score);
          break;
        }
      }
    }
  }

  // This is a game loop! You can repeatedly run code here.
  // It runs once every 30 milliseconds.
  setInterval(function () {
    moveCharacter();
    moveEnemies();
    moveShots();
    checkCollisions();
    spawnTimer++;
    if (spawnTimer >= 100 && !hasMaxSpriteCount(enemyIDs)) {
      spawnEnemy();
      spawnTimer = 1;
    }
  }, 30);

  $(document).keydown(function(event) {
    if (event.which === 37) {
      leftPressed = true;
    } else if (event.which === 38) {
      upPressed = true;
    } else if (event.which === 39) {
      rightPressed = true;
    } else if (event.which === 40) {
      downPressed = true;
    }
  });

  $(document).keyup(function(event) {
    if (event.which === 37) {
      leftPressed = false;
    } else if (event.which === 38) {
      upPressed = false;
    } else if (event.which === 39) {
      rightPressed = false;
    } else if (event.which === 40) {
      downPressed = false;
    }
  });

  $(document).keydown(function(event) {
    if (event.which === 32 && !hasMaxSpriteCount(shotIDs)) {
      spawnShot(shotIDs);
    }
  });
});
