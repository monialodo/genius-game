/* Parametros iniciais do jogo*/

let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

/************* Iniciando o jogo ********************** */
let started = false;
let level = 0;

$(document).keydown(function () {
  if (started === false) {
    $("#level-title").html("Level " + level);
    nextSequence();
    started = true;
  }
});
/************** Interações do Usuario ************************/

$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

/************** Verificar resposta do Usuario *************************** */

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").html("Game Over, Press Any Key to Restart");

    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    return (started = false);
  }
}

/************ Sequencia de jogo ******************* */
function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").html("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

/********** Tocar Som *************** */

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/************ Animar botão ********************** */
function animatePress(curentColour) {
  $("#" + curentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + curentColour).removeClass("pressed");
  }, 0100);
}
