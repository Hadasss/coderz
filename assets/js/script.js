// code quiz
const title = document.querySelector(".title");
let countdown = document.querySelector(".countdown");
let highScores = document.querySelector(".high-scores");
let question = document.querySelector(".question");
let answerContainer = document.querySelector(".answer-container");
let feedback = document.querySelector(".feedback");

// TODO create an array of question objects
const questionsArr = [
  {
    question: "",
    answers: [],
  },
];

// TODO create an introduction function to display begining of app and lead into the quiz
const intro = function () {
  var introTitle = document.createElement("h2");
  introTitle.textContent = "Welcome to Coding Quiz Challenge!";

  title.appendChild(introTitle);
};

intro();

// TODO create startQuiz function to be called onclick and display questions and start countdown

const startQuiz = function () {
  // onclick start quiz
  // display question and possible answers
  // when answer is clicked >> display correct/incorrect
  // if incorrect >> take time off timer
  // when all questions are answeres || timer = 0 >> endGame();
};

// TODO write an endGame function to display score, save initials and store score

const endGame = function () {
  // display current score
  // save initials >> submit (preventDefault)
};

// TODO create an object to store high scores into localStorage
