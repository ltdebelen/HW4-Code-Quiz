// DOM Elements
const mainSectionEl = document.getElementById("main");
const divEl = document.getElementById("main-div");
const h1El = document.getElementById("header");
const pEl = document.getElementById("paragraph");
const btnStartGame = document.getElementById("start-game");
const btnHighScore = document.getElementById("high-score");

// Other Variables
let questionCounter = 0;

btnStartGame.addEventListener("click", startGame);

function startGame() {
  divEl.style.display = "none";
  getQuestion();
}

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
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  }
];

function getQuestion() {
  // Increment Question Counter
  questionCounter++;

  // get array value
  let title = questions[questionCounter].title;
  let choices = questions[questionCounter].choices;

  // build HTML, append Elemetns
  let questionHTML = `
  <div class="starter-template" id="main-div">
    <h1 id="header">Question: ${questionCounter}</h1>
    <p id="paragraph" class="lead">
    ${title}
    </p>
  </div>`;

  // loop through choices
  choices.forEach(choice => {
    questionHTML += `
    <button class="btn btn-outline-primary" value="${choice}">${choice}</button>
    `;
  });

  // append elements
  mainSectionEl.innerHTML = questionHTML;
}
