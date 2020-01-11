// DOM Elements
const divTimer = document.getElementById("timer");
const mainSectionEl = document.getElementById("main");
const divEl = document.getElementById("main-div");
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

btnStartGame.addEventListener("click", startGame);

function startGame() {
  divEl.style.display = "none";
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
  <div class="starter-template" id="main-div">
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

  if (userChoice == answer) {
    console.log("YOU ARE CORRECT");
  }

  getQuestion();
}

function startTimer() {
  // Start Timer (Formula = Question Length * 15 seconds);
  // Adding + 1 Second for function delay showing in UI;
  secondsLeft = questionsLength * 15 + 1;

  var timerInterval = setInterval(function() {
    secondsLeft--;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
    }
    displayTimer(secondsLeft);
  }, 1000);
}

function displayTimer(secondsLeft) {
  console.log(secondsLeft);
  let timerHTML = `<p>Time Left: ${secondsLeft}</p>`;
  divTimer.innerHTML = timerHTML;
}
