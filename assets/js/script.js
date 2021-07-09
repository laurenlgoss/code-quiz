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

// Create highscore array from local storage
var highscoreArray = JSON.parse(localStorage.getItem("highscore")) || [];

var timeRemaining;
var timerCount = 50;
var timer;

var userScore = 0;

// Track what question user is on
var questionIndex = 0;

var questionOne = {
    questionString: "How do you comment JavaScript?",
    answerArray: [
        { string: "// Comment", boolean: true },
        { string: "/* Comment */", boolean: false },
        { string: "<!-- Comment -->", boolean: false },
        { string: "// Comment //", boolean: false },
    ],
};
var questionTwo = {
    questionString: "What character goes at the end of every line in CSS and JavaScript?",
    answerArray: [
        { string: ":", boolean: false },
        { string: ";", boolean: true },
        { string: ",", boolean: false },
        { string: ".", boolean: false },
    ],
};
var questionThree = {
    questionString: "How do you enclose an array?",
    answerArray: [
        { string: "()", boolean: false },
        { string: "{}", boolean: false },
        { string: "<>", boolean: false },
        { string: "[]", boolean: true },
    ],
};
var questionFour = {
    questionString: "Where do you typically link your style sheet in HTML?",
    answerArray: [
        { string: "body", boolean: false },
        { string: "main", boolean: false },
        { string: "head", boolean: true },
        { string: "div", boolean: false },
    ],
};
var questionFive = {
    questionString: "What positioning in CSS allows the element to be out of flow?",
    answerArray: [
        { string: "Absolute", boolean: false },
        { string: "Fixed", boolean: true },
        { string: "Relative", boolean: false },
        { string: "Static", boolean: false },
    ],
};

var questionArray = [questionOne, questionTwo, questionThree, questionFour, questionFive];

// Load introduction text onto page
function init() {
    mainTextEl.textContent = "Code Quiz";
    subTextEl.textContent = "This is a multiple-choice coding quiz testing your knowledge of HTML, CSS, and JavaScript. You will be given " + questionArray.length + " questions with " + timerCount + " seconds to complete the quiz. If you choose a wrong answer, 10 seconds will be subtracted from the timer. The quiz ends either when all questions are answered or the timer runs out.";
    startButtonEl.textContent = "Start";
    timerCountEl.textContent = timerCount;

    renderHighscore();
}

function renderHighscore() {
    // Sort highscores by descending score
    highscoreArray.sort(function(a, b) {
        return b.score - a.score;
    })

    // Clear previous highscores on page
    highscoresContainer.innerHTML = "";

    // Take only top 5 highscores
    var limitedArray = highscoreArray.slice(0, 5);

    // Render highscores to page
    limitedArray.forEach(function(highscore) {
        var li = document.createElement("li");
        li.setAttribute("class", "highscores");
        li.textContent = highscore.initials + " " + highscore.score;
        highscoresContainer.appendChild(li);
    })
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

        // End game when timer reaches zero
        if (timerCount <= 0) {
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
    timerCountEl.textContent = timerCount;

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
    timeRemaining = timerCount;

    // Reset timer
    clearInterval(timer);
    timerCount = 50;

    mainTextEl.textContent = "Game Over"

    // Display user score
    subTextEl.textContent = "You got " + userScore + "/" + questionArray.length + " correct. Your final score is: " + userScore * timeRemaining;

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
        score: userScore * timeRemaining,
    };

    // Push last highscore into highscore array
    highscoreArray.push(highscore);

    // Save highscore in local storage
    localStorage.setItem("highscore", JSON.stringify(highscoreArray));

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