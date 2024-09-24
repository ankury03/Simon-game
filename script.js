const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];

var gameStarted = false;
var level = 0;

$(document).keydown(function(){
    if(!gameStarted){
        startGame();
    }
});

$(document).on("touchstart", function() {
    if(!gameStarted) {
        startGame();
    }
});

function startGame() {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
}

$(".btn").on("click" , function(){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    animatePress(userChoosenColor);
    Sound(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern.length = 0;
    level++;
    
    $("#level-title").text("Level " + level);

    var randomNum = Math.floor(Math.random() * 4); // Use Math.floor

    var choosenColor = buttonColors[randomNum];
    gamePattern.push(choosenColor);
    var selectedElement = $("#" + choosenColor);
    Sound(choosenColor);

    $(selectedElement).addClass("flash");
    setTimeout(() => {
        $(selectedElement).removeClass("flash");
    }, 500);
}   

function Sound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        Sound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key or Tap to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern.length = 0;
    gameStarted = false;
}




