// DOM Elements
const divTimer = document.getElementById("timer");
const mainSectionEl = document.getElementById("main");
const divWelcome = document.getElementById("welcome-div");
const h1El = document.getElementById("header");
const pEl = document.getElementById("paragraph");
const btnStartGame = document.getElementById("start-game");
const btnHighScore = document.getElementById("high-score");

// Other Variables
let questionCounter = 0;
const questionsLength = questions.length;
let secondsLeft = 0;
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
let timerInterval;

btnStartGame.addEventListener("click", startGame);

function startGame() {
  divWelcome.style.display = "none";
  getQuestion();
  startTimer();
}

function getQuestion() {
  if (questionCounter >= questionsLength) {
  } else {
    // get array value
    let title = questions[questionCounter].title;
    let choices = questions[questionCounter].choices;

    // build HTML, append Elemetns
    let questionHTML = `
  <div class="starter-template" id="questions-div">
    <h1 id="header">Question ${questionCounter + 1}:</h1>
    <p id="paragraph" class="lead">
    ${title}
    </p>`;

    // loop through choices
    choices.forEach(choice => {
      questionHTML += `
    <button class="btn btn-outline-primary" value="${choice}" onclick="validateChoice(${questionCounter}, '${choice}')">${choice}</button>
    `;
    });

    // append elements
    mainSectionEl.innerHTML = questionHTML;

    questionCounter++;
  }
}

function validateChoice(questionCounter, choice) {
  let counter = questionCounter;
  let userChoice = choice;
  let answer = questions[counter].answer;

  if (userChoice != answer) {
    secondsLeft -= 15;
    displayValidation("wrong");
  } else {
    displayValidation("correct");
  }

  counter++;
  if (counter == questionsLength) {
    clearInterval(timerInterval);
    getInitials();
  }

  getQuestion();
}

function displayValidation(answer) {
  if (answer == "correct") {
    let correctAnsHTML = `<div class="alert alert-success container text-center" id="message-pop-up" role="alert">
    <i class="fa fa-lg fa-check"></i> You are correct!
  </div>`;

    document.getElementById("message").innerHTML = correctAnsHTML;

    setTimeout(function() {
      $("#message-pop-up").remove();
    }, 1000);
  } else if (answer == "wrong") {
    let wrongAnsHTML = `<div class="alert alert-danger container text-center" id="message-pop-up" role="alert">
    <i class="fa fa-lg fa-times"></i> Wrong Answer!
  </div>`;

    document.getElementById("message").innerHTML = wrongAnsHTML;

    setTimeout(function() {
      $("#message-pop-up").remove();
    }, 1000);
  }
}

function startTimer() {
  // Start Timer (Formula = Question Length * 15 seconds);
  secondsLeft = questionsLength * 15;

  timerInterval = setInterval(function() {
    secondsLeft--;

    if (secondsLeft <= 0) {
      secondsLeft = 0;
      clearInterval(timerInterval);
      getInitials();
    }

    displayTimer(secondsLeft);
  }, 1000);
}

function displayTimer(secondsLeft) {
  let timerHTML = `<p><i class="fa fa-lg fa-clock-o"></i> Time Left: ${secondsLeft} sec</p>`;
  divTimer.innerHTML = timerHTML;
}

function getInitials() {
  const divQuestion = document.getElementById("questions-div");
  const divPopUp = document.getElementById("message-pop-up");
  divQuestion.style.display = "none";
  if (divPopUp != null) {
    divPopUp.style.display = "none";
  }

  divTimer.style.display = "none";

  if (secondsLeft < 0) {
    secondsLeft = 0;
  }

  let initialsHTML = `  <div class="starter-template" id="get-initals-div">
  <h1 id="header">All done!</h1>
  <p id="paragraph" class="lead">
    Your final score is: <span id="score">${secondsLeft}</span>
  </p>
  <div class="form-group">
    <input
      type="text"
      class="form-control w-25 m-auto"
      id="initials"
      placeholder="Enter initials"
    />
  </div>
  <button
    class="btn btn-primary"
    id="submit-initials"
    onclick="saveScore()"
  >
    Submit Initials
  </button>
</div>`;

  mainSectionEl.innerHTML = initialsHTML;
}

function saveScore() {
  let userInitials = document.getElementById("initials").value;

  let userScore = {
    initials: userInitials,
    score: secondsLeft
  };

  highScores.push(userScore);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem("highScores", JSON.stringify(highScores));

  viewHighScores();
}

function viewHighScores() {
  divWelcome.style.display = "none";
  divTimer.style.display = "none";

  let highScoresHTML = "";
  highScoresHTML += `<div class="starter-template" id="highscores-div">
  <h1 id="header">High Scores</h1>
  <ol class="list-group list-group-flush mb-5" id="highscores-list">
  </ol>
  <button class="btn btn-primary" onclick="retryQuiz()">Retry Quiz</button>
  <button class="btn btn-primary" onclick="clearHighscores()">
    Clear Highscores
  </button>
</div>`;

  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  let liHTML = "";
  highScores.forEach((highScore, index) => {
    liHTML += `<li class="list-group-item w-25 m-auto">${index + 1}. <strong>${
      highScore.initials
    }</strong> - ${highScore.score} points</li>`;
  });

  mainSectionEl.innerHTML = highScoresHTML;

  let highScoresList = document.getElementById("highscores-list");
  highScoresList.innerHTML = liHTML;
}

function clearHighscores() {
  localStorage.removeItem("highScores");
  viewHighScores();
}

function retryQuiz() {
  window.location.reload();
}
