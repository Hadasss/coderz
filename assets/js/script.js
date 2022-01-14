// code quiz
const quizContainer = document.querySelector(".quiz-container");
const title = document.querySelector(".title");
let time = document.querySelector(".time");
let highScores = document.querySelector(".high-scores");
let questionContainer = document.querySelector(".question");
let answerContainer = document.querySelector(".answer-container");
let feedback = document.querySelector(".feedback");
const startBtn = document.querySelector(".start");
highScores = [];
let counter = 10;

const questionsArr = [
  {
    question: "Which type of JavaScript language is",
    choices: ["Object-Oriented", "Object-Based", "Low-level", "High-level"],
    answer: 1,
  },
  {
    question: "In JavaScript the x===y statement implies that:",
    choices: [
      "Both x and y are equal in value, type and reference address as well",
      "Both are x and y are equal in value only",
      "Both are equal in the value and data type",
      "Both are not same at all",
    ],
    answer: 2,
  },

  {
    question: "In JavaScript, what is a block of statement?",
    choices: [
      "Conditional block",
      "block that combines a number of statements into a single compound statement",
      "both conditional block and a single statement",
      "block that contains a single statement",
    ],
    answer: 1,
  },

  {
    question:
      "When interpreter encounters an empty statements, what it will do:",
    choices: [
      "Shows a warning",
      "Prompts to complete the statement",
      "Throws an error",
      "Ignores the statements",
    ],
    answer: 3,
  },

  {
    question: "The 'function' and 'var' are known as:",
    choices: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
    answer: 2,
  },

  {
    question:
      "Which of the following variables takes precedence over the others if the names are the same?",
    choices: [
      "Global variable",
      "The local element",
      "The two of the above",
      "None of the above",
    ],
    answer: 1,
  },

  {
    question:
      "Which one of the following is the correct way for calling the JavaScript code?",
    choices: ["Preprocessor", "Triggering Event", "RMI", "Function/Method"],
    answer: 3,
  },

  {
    question: "Which of the following type of a variable is volatile?",
    choices: [
      "Mutable variable",
      "Dynamic variable",
      "Volatile variable",
      "Immutable variable",
    ],
    answer: 0,
  },

  {
    question:
      "Which of the following number object function returns the value of the number?",
    choices: ["toString()", "valueOf()", "toLocaleString()", "toPrecision()"],
    answer: 1,
  },

  {
    question:
      "In the JavaScript, which one of the following is not considered as an error:",
    choices: [
      "Syntax error",
      "Missing of semicolons",
      "Division by zero",
      "Missing of Bracket",
    ],
    answer: 2,
  },
];

// TODO create startQuiz function to be called onclick and display questions and start countdown

const startQuiz = function () {
  console.log("button clicked");

  // TODO hide title dive to display quiz
  //   title.className(".hidden");

  // timer
  const countdown = setInterval(function () {
    time.textContent = `Time: ${counter}`;
    if (counter > 0) {
      counter--;
    } else if (counter == 0) {
      clearInterval(countdown);
      const timeoutMsg = document.createElement("h3");
      timeoutMsg.textContent = "You're out of time!";
      quizContainer.appendChild(timeoutMsg);
      const againBtn = document.createElement("button");
      againBtn.textContent = "Try Again!";
      againBtn.className = "btn";
      quizContainer.appendChild(againBtn);
    }
  }, 1000);

  // display question and possible answers
  for (let i = 0; i < questionsArr.length; i++) {
      
  }

  // when answer is clicked >> display correct/incorrect
  // if incorrect >> take time off timer
  // when all questions are answeres || timer = 0 >> endGame();

  endGame();
};

// TODO write an endGame function to display score, save initials and store score

const endGame = function () {
  // display current score
  // save initials >> submit (preventDefault)
};

// TODO create an object to store high scores into localStorage

startBtn.addEventListener("click", startQuiz);
