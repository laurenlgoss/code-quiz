var $highscores = $(".highscores");
var $timer = $(".timer");
var $timerCount = $(".timer-count");
var $mainBody = $(".main-body");
var $mainText = $(".main-text");
var $subText = $(".sub-text");
var $startButton = $("#start-button");

var timerCount = 100;

function init() {
    $mainText.append("Code Quiz");
    $subText.append("This is a coding quiz.");
    $startButton.append("Start");
}

// Button to start game
$startButton.on("click", startGame);

// Upon button click,
function startGame() {

    // Timer begins
    startTimer();

    // Question displays

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
    timerCount = 100;
    timer = setInterval(function() {
        timerCount--;
        $timerCount.text(timerCount);
    }, 1000);
}

init();