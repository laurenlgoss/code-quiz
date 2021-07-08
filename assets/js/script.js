var highscoresContainer = document.querySelector(".highscore-container");
var timerEl = document.querySelector(".timer");
var timerCountEl = document.querySelector(".timer-count");
var mainBodyEl = document.querySelector(".main-body");
var mainTextEl = document.querySelector(".main-text");
var subTextEl = document.querySelector(".sub-text");
var answersContainerEl = document.querySelector(".answers-container");
var startButtonEl = document.querySelector("#start-button");

var formEl = document.createElement("form");
var userInitialsEl = document.createElement("input");
var resetButtonEl = document.createElement("button");

var timerCount = 50;
var timer;

var userScore = 0;

// Track what question user is on
var questionIndex = 0;

var questionOne = {
    questionString: "Question 1",
    answerArray: [
        { string: "Answer 1", boolean: true },
        { string: "Answer 2", boolean: false },
        { string: "Answer 3", boolean: false },
        { string: "Answer 4", boolean: false },
    ],
};
var questionTwo = {
    questionString: "Question 2",
    answerArray: [
        { string: "Answer 1", boolean: false },
        { string: "Answer 2", boolean: true },
        { string: "Answer 3", boolean: false },
        { string: "Answer 4", boolean: false },
    ],
};
var questionThree = {
    questionString: "Question 3",
    answerArray: [
        { string: "Answer 1", boolean: true },
        { string: "Answer 2", boolean: false },
        { string: "Answer 3", boolean: false },
        { string: "Answer 4", boolean: false },
    ],
};
var questionFour = {
    questionString: "Question 4",
    answerArray: [
        { string: "Answer 1", boolean: true },
        { string: "Answer 2", boolean: false },
        { string: "Answer 3", boolean: false },
        { string: "Answer 4", boolean: false },
    ],
};
var questionFive = {
    questionString: "Question 5",
    answerArray: [
        { string: "Answer 1", boolean: true },
        { string: "Answer 2", boolean: false },
        { string: "Answer 3", boolean: false },
        { string: "Answer 4", boolean: false },
    ],
};

var questionArray = [questionOne, questionTwo, questionThree, questionFour, questionFive];

// Load introduction text onto page
function init() {
    mainTextEl.textContent = "Code Quiz";
    subTextEl.textContent = "This is a coding quiz.";
    startButtonEl.textContent = "Start";
    timerCountEl.textContent = timerCount;

    renderHighscore();
}

// Render last highscore on page
function renderHighscore() {
    var highscoreStorage = JSON.parse(localStorage.getItem("highscore"));

    // Check if any highscores in local storage
    if (highscoreStorage !== null) {
        var highscoreEl = document.createElement("li");
        highscoreEl.setAttribute("class", "highscores");
        highscoreEl.textContent = highscoreStorage.initials + " " + highscoreStorage.score + "/" + questionArray.length;
        highscoresContainer.appendChild(highscoreEl);
    }
}

// Button to start game
startButtonEl.addEventListener("click", startGame);

function startGame() {
    startTimer();

    // Display first question
    subTextEl.textContent = "";
    startButtonEl.setAttribute("style", "display: none");

    nextQuestion(questionIndex);
}

function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timerCountEl.textContent = timerCount;

        // When timer reaches zero, reset timer and end game
        if (timerCount <= 0) {
            clearInterval(timer);
            timerCount = 50;

            removeButtons();
            endGame();
        }
    }, 1000);
}

// Display questions/answers on page
function nextQuestion(arrayIndex) {
    if (questionIndex < questionArray.length) {
        questionIndex++;

        // Display question text
        mainTextEl.textContent = questionArray[arrayIndex].questionString;

        // Create button for each answer
        for (var i = 0; i < questionArray[arrayIndex].answerArray.length; i++) {
            var answerEl = document.createElement("button");
            answerEl.setAttribute("class", "answer-button");
            answerEl.textContent = questionArray[arrayIndex].answerArray[i].string;
            answersContainerEl.appendChild(answerEl);

            // If correct answer clicked call correctAnswer(), else call incorrectAnswer()
            if (questionArray[arrayIndex].answerArray[i].boolean) {
                answerEl.addEventListener("click", correctAnswer);
            } else {
                answerEl.addEventListener("click", incorrectAnswer);
            }
        }
    } else {
        endGame();
    }
}

function correctAnswer() {
    removeButtons();

    // Increase user score
    userScore++;

    nextQuestion(questionIndex);
}

function incorrectAnswer() {
    removeButtons();

    // Subtract time from timer
    timerCount -= 10;

    nextQuestion(questionIndex);
}

// Remove answer buttons from page
function removeButtons() {
    var answerElArray = document.querySelectorAll(".answer-button");
    for (var i = 0; i < answerElArray.length; i++) {
        answerElArray[i].remove();
    }
}

function endGame() {
    mainTextEl.textContent = "Game Over"

    // Display user score
    subTextEl.textContent = "Final score: " + userScore + "/" + questionArray.length;

    // Create form for user initials
    formEl.setAttribute("id", "user-initials-form");
    mainBodyEl.appendChild(formEl);

    userInitialsEl.setAttribute("type", "text");
    userInitialsEl.setAttribute("placeholder", "User initials here");
    userInitialsEl.setAttribute("id", "user-initials-input");

    formEl.appendChild(userInitialsEl);

    // Create reset button
    resetButtonEl.setAttribute("id", "reset-button");
    resetButtonEl.textContent = "Return to Home"
    mainBodyEl.appendChild(resetButtonEl);
    resetButtonEl.addEventListener("click", resetGame);
}

function resetGame() {
    var highscore = {
        initials: userInitialsEl.value.trim(),
        score: userScore,
    };

    // Save highscore in local storage
    localStorage.setItem("highscore", JSON.stringify(highscore));

    // Remove form and reset button from page
    userInitialsEl.remove();
    formEl.remove();
    resetButtonEl.remove();

    startButtonEl.setAttribute("style", "display: inline");

    // Reset question index and user score
    questionIndex = 0;
    userScore = 0;

    // Return to home screen
    init();
}

init();