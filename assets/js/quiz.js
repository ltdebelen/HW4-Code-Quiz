// DOM Elements
const divTimer = document.getElementById("timer");
const mainSectionEl = document.getElementById("main");
const divWelcome = document.getElementById("welcome-div");
const h1El = document.getElementById("header");
const pEl = document.getElementById("paragraph");
const btnStartGame = document.getElementById("start-game");
const btnHighScore = document.getElementById("high-score");

let questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  }
];

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
  }

  counter++;
  if (counter == questionsLength) {
    clearInterval(timerInterval);
    getInitials();
  }

  getQuestion();
}

function startTimer() {
  // Start Timer (Formula = Question Length * 15 seconds);
  // Adding + 1 Second for function delay showing in UI;
  secondsLeft = questionsLength * 15 + 1;

  console.log("Question Counter" + questionCounter);
  console.log("Question Array Length" + questionsLength);

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
  console.log(secondsLeft);
  let timerHTML = `<p>Time Left: ${secondsLeft}</p>`;
  divTimer.innerHTML = timerHTML;
}

function getInitials() {
  const divQuestion = document.getElementById("questions-div");
  divQuestion.style.display = "none";

  let initialsHTML = `  <div class="starter-template" id="get-initals-div">
  <h1 id="header">All done!</h1>
  <p id="paragraph" class="lead">
    Your final score is: <span id="score">${secondsLeft}</span>
  </p>
  <div class="form-group">
    <input
      type="email"
      class="form-control"
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
  const divGetInitials = document.getElementById("get-initals-div");
  divGetInitials.style.display = "none";
}
