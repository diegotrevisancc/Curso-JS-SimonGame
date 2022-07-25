var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;
var index = 0;


$("body").keypress(function() {
    if(!started){
        nextSequence()
        started = true;
    }
    
});

$(".btn").click(function() {
    var userChosenColor = this.id
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(index);
})


function nextSequence () {
    level++;
    $("h1").html("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChooseColor = buttonColors[randomNumber];
    gamePattern.push(randomChooseColor);
    $("#" + randomChooseColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio ("sounds/" + randomChooseColor+".mp3");
    audio.play();
}

function checkAnswer(currentLevel) {
    if(userClickPattern[currentLevel] == gamePattern[currentLevel]){
        index++;
        if(userClickPattern.length == gamePattern.length) {
            index = 0;
            userClickPattern =[];
            setTimeout(function(){nextSequence();},500)
        }
    } else {
        console.log(userClickPattern)
        console.log(gamePattern)
        $("h1").html("Game-Over, press any key to restart");
        startOver();
    }
}
function startOver() {
    userClickPattern = []
    gamePattern = []
    started = false;
    level = 0;
    index = 0;
}

function playSound(name) {
    var audio = new Audio ("sounds/" +name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}


