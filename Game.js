var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];
var gamePattern=[];
var level=0;
function nextSequence(){
  userClickedPattern=[];
  $("#level-title").text("Level "+level);
    level++;
  var k=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[k];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// checking checkAnswer
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){

    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


// playing sound
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}

// Animations
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");

  setTimeout(function(){
  $("#"+currentColour).removeClass("pressed");},100);
}

// starter
var started=false;
if(started===false){
  $("body").keypress(function(event){
    started=true;
    $("#level-title").text("Level "+level);
    nextSequence();
  });
}
// startOver
function startOver(){
  gamePattern=[];
  started=false;
  level=0;
}
