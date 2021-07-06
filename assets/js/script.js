var highscoresEl = document.querySelector(".highscores");
var timerEl = document.querySelector(".timer");
var timerCountEl = document.querySelector(".timer-count");
var mainBodyEl = document.querySelector(".main-body");
var mainTextEl = document.querySelector(".main-text");
var subTextEl = document.querySelector(".sub-text");
var answersContainerEl = document.querySelector(".answers-container");
var startButtonEl = document.querySelector("#start-button");

var timerCount = 100;
var timer;

var userScore = 0;

// Track what question user is on
var questionIndex = 0;

var questionOne = {
    questionString: "Question 1",
    answerArray: [
        {string: "Answer 1", boolean: true},
        {string: "Answer 2", boolean: false},
        {string: "Answer 3", boolean: false},
        {string: "Answer 4", boolean: false},
        ],
};
var questionTwo = {
    questionString: "Question 2",
    answerArray: [
        {string: "Answer 1", boolean: true},
        {string: "Answer 2", boolean: false},
        {string: "Answer 3", boolean: false},
        {string: "Answer 4", boolean: false},
        ],
};
var questionThree = {
    questionString: "Question 3",
    answerArray: [
        {string: "Answer 1", boolean: true},
        {string: "Answer 2", boolean: false},
        {string: "Answer 3", boolean: false},
        {string: "Answer 4", boolean: false},
        ],
};
var questionFour = {
    questionString: "Question 4",
    answerArray: [
        {string: "Answer 1", boolean: true},
        {string: "Answer 2", boolean: false},
        {string: "Answer 3", boolean: false},
        {string: "Answer 4", boolean: false},
        ],
};
var questionFive = {
    questionString: "Question 5",
    answerArray: [
        {string: "Answer 1", boolean: true},
        {string: "Answer 2", boolean: false},
        {string: "Answer 3", boolean: false},
        {string: "Answer 4", boolean: false},
        ],
};

var questionArray = [questionOne, questionTwo, questionThree, questionFour, questionFive];

// Load introduction text onto page
function init() {
    mainTextEl.textContent = "Code Quiz";
    subTextEl.textContent = "This is a coding quiz.";
    startButtonEl.textContent = "Start";
}

// Button to start game
startButtonEl.addEventListener("click", startGame);

// Upon button click,
function startGame() {

    // Begin timer
    startTimer();

    // Display first question
    subTextEl.setAttribute("style", "display: none");
    startButtonEl.setAttribute("style", "display: none");

    nextQuestion(questionIndex);

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

function nextQuestion(arrayIndex) {
    // Display question text
    mainTextEl.textContent = questionArray[arrayIndex].questionString;

    // Create button for each answer
    for (var i = 0; i < questionArray[arrayIndex].answerArray.length; i++) {
        var answerEl = document.createElement("button");
        answerEl.setAttribute("class", "answer-button");
        answerEl.textContent = questionArray[arrayIndex].answerArray[i].string;
        answersContainerEl.appendChild(answerEl);
        
        // If correct answer clicked call correctAnswer(), else call incorrectAnswer()
        if (questionArray[arrayIndex].answerArray[i].boolean === true) {
            answerEl.addEventListener("click", correctAnswer);
        } else {
            answerEl.addEventListener("click", incorrectAnswer);
        }
    }
    questionIndex++;
}

function correctAnswer() {
    // Remove previous answer buttons
    var answerElArray = document.querySelectorAll(".answer-button");
    for (var i = 0; i < answerElArray.length; i++) {
        answerElArray[i].remove();
    }
    // Increase user score
    userScore++;
    nextQuestion(questionIndex);
}

function incorrectAnswer() {
    console.log("incorrect");
}

init();