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

    nextQuestion("Question 1", "Answer 1", true, "Answer 2", false, "Answer 3", false, "Answer 4", false);

    // Upon answer,

        // Correct answer:

            // Displays "correct"

            // Increases user score

        // Incorrect answer:

            // Displays "incorrect"

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

function nextQuestion(questionString, answerOneString, answerOneBoolean, answerTwoString, answerTwoBoolean, answerThreeString, answerThreeBoolean, answerFourString, answerFourBoolean) {
    mainTextEl.textContent = questionString;

    var answerOne = {
        string: answerOneString,
        boolean: answerOneBoolean,
    };
    var answerTwo = {
        string: answerTwoString,
        boolean: answerTwoBoolean,
    };
    var answerThree = {
        string: answerThreeString,
        boolean: answerThreeBoolean,
    };
    var answerFour = {
        string: answerFourString,
        boolean: answerFourBoolean,
    };

    var answerArray = [answerOne, answerTwo, answerThree, answerFour];

    for (var i = 0; i < answerArray.length; i++) {
        var answerEl = document.createElement("button");
        answerEl.textContent = answerArray[i].string;
        answersContainerEl.appendChild(answerEl);
        
        if (answerArray[i].boolean === true) {
        answerEl.addEventListener("click", correctAnswer);
        }
    }
}

function correctAnswer() {
    console.log("correct");
}

init();