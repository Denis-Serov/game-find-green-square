const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let penaltyHits = 0;
let startGame = false;
let totalScore = 0;

function round() {
  hits = hits + 1;
  $(".game-field").removeClass("target");
  $(".game-field").removeClass("miss")
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits);
   
  if (hits === maxHits+1) {
    endGame();
  }
}

function endGame() {
  $(".tableWrapper").addClass("d-none")
  // FIXME: спрятать игровое поле сначала
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#textMaxHits").text(maxHits);
  $("#textPenaltyHits").text(penaltyHits);
  totalScore = 100/totalPlayedSeconds * 100/(penaltyHits+maxHits); 
  totalScore = totalScore.toPrecision(3)
  $("#textTotalScore").text(totalScore);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  if (startGame == true) {
    if ($(event.target).hasClass("target")) {
      $(".game-field").text("");
      round();
    }
    else {
      $(event.target).addClass('miss');
      $(event.target).text('промах');
      penaltyHits++;
    }
  }
}

function dismis() {
     document.getElementById('button-start').classList.toggle("invisible");
     document.getElementById('button-reload').classList.toggle("invisible");
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start").click(function() {
    startGame = true; 
    dismis();
    round(); 
    firstHitTime = getTimestamp();   
  });
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
