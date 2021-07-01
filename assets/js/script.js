var highscoresEl = document.querySelector(".highscores");
var timerEl = document.querySelector(".timer");
var timerCountEl = document.querySelector(".timer-count");
var mainBodyEl = document.querySelector(".main-body");
var mainTextEl = document.querySelector(".main-text");
var subTextEl = document.querySelector(".sub-text");
var answersContainerEl = document.querySelector(".answers-container");
var startButtonEl = document.querySelector("#start-button");

var timerCount;
var timer;

function init() {
    mainTextEl.textContent = "Code Quiz";
    subTextEl.textContent = "This is a coding quiz.";
    startButtonEl.textContent = "Start";
}

// Button to start game
startButtonEl.addEventListener("click", startGame);

// Upon button click,
function startGame() {

    // Timer begins
    timerCount = 100;
    startTimer();

    // Question displays
    subTextEl.setAttribute("style", "display: none");
    startButtonEl.setAttribute("style", "display: none");

    var answerArray = ["Answer 1", "Answer 2", "Answer 3", "Answer 4"];
    nextQuestion("Question 1", answerArray);

    // Upon answer,

        // Right answer:

            // Displays "correct"

            // Increases user score

        // Wrong answer:

            // Displays "wrong"

            // Decreases user score
                        
            // Subtracts time from timer

        // Displays next question

}

// Once timer runs out/game ends

    // Score is totaled and displayed

    // User inputs initials

        // Score/initials are saved

        // Score is displayed in recent scores

    // Game is reset and can be played again

function startTimer() {
    timer = setInterval(function() {
        timerCount--;
        timerCountEl.textContent = timerCount;
    }, 1000);
}

function nextQuestion(questionString, answerArray) {
    mainTextEl.textContent = questionString;

    for (var i = 0; i < answerArray.length; i++) {
        var answer = document.createElement("button");
        answer.textContent = answerArray[i];
        answersContainerEl.appendChild(answer);
    }
}

init();