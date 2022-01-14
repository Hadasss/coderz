const quizContainer = document.querySelector(".quiz-container");
const title = document.querySelector(".title");
let time = document.querySelector(".time");
let highScores = document.querySelector(".high-scores");
let questionContainer = document.querySelector(".question");
const answerContainer = document.querySelector(".answer-container");
const allAnswers = document.querySelector(".all-answers");
let feedback = document.querySelector(".feedback");
const startBtn = document.querySelector(".start");
const questionBox = document.querySelector(".question-box");
highScores = [];

let counter = 200;

const questionsArr = [
  {
    questionText: "Which type of language is Javascript?",
    choices: ["Object-Oriented", "Object-Based", "Low-level", "High-level"],
    answer: "Object-Based",
  },
  {
    questionText: "In JavaScript the x===y statement implies that:",
    choices: [
      "Both x and y are equal in value, type and reference address as well",
      "Both are x and y are equal in value only",
      "Both are equal in the value and data type",
      "Both are not same at all",
    ],
    answer: "Both are equal in the value and data type",
  },

  {
    questionText: "In JavaScript, what is a block of statement?",
    choices: [
      "Conditional block",
      "block that combines a number of statements into a single compound statement",
      "both conditional block and a single statement",
      "block that contains a single statement",
    ],
    answer:
      "block that combines a number of statements into a single compound statement",
  },

  {
    questionText:
      "When interpreter encounters an empty statements, what it will do:",
    choices: [
      "Shows a warning",
      "Prompts to complete the statement",
      "Throws an error",
      "Ignores the statements",
    ],
    answer: "Ignores the statements",
  },

  {
    questionText: "The 'function' and 'var' are known as:",
    choices: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
    answer: "Declaration statements",
  },

  {
    questionText:
      "Which of the following variables takes precedence over the others if the names are the same?",
    choices: [
      "Global variable",
      "The local element",
      "The two of the above",
      "None of the above",
    ],
    answer: "The local element",
  },

  {
    questionText:
      "Which one of the following is the correct way for calling the JavaScript code?",
    choices: ["Preprocessor", "Triggering Event", "RMI", "Function/Method"],
    answer: "Function/Method",
  },

  {
    questionText: "Which of the following type of a variable is volatile?",
    choices: [
      "Mutable variable",
      "Dynamic variable",
      "Volatile variable",
      "Immutable variable",
    ],
    answer: "Mutable variable",
  },

  {
    questionText:
      "Which of the following number object function returns the value of the number?",
    choices: ["toString()", "valueOf()", "toLocaleString()", "toPrecision()"],
    answer: "valueOf()",
  },

  {
    questionText:
      "In the JavaScript, which one of the following is not considered as an error:",
    choices: [
      "Syntax error",
      "Missing of semicolons",
      "Division by zero",
      "Missing of Bracket",
    ],
    answer: "Division by zero",
  },
];

const startQuiz = function () {
  console.log("button clicked");

  title.remove();

  // countdown timer
  const countdown = setInterval(function () {
    time.textContent = `Time: ${counter}`;
    if (counter > 0) {
      counter--;
    } else if (counter == 0) {
      clearInterval(countdown);
      const timeoutMsg = document.createElement("h3");
      timeoutMsg.textContent = "You're out of time!";
      quizContainer.appendChild(timeoutMsg);

      endGame();
    }
  }, 1000);

  displayQuestions();
};

// display question and possible answers
const displayQuestions = function () {
  for (let i = 0; i < questionsArr.length; i++) {
    let questionTitle = document.createElement("h3");
    questionTitle.textContent = questionsArr[i].questionText;
    questionContainer.appendChild(questionTitle);

    for (let j = 0; j < questionsArr[i].choices.length; j++) {
      var answerChoice = document.createElement("li");
      answerChoice.className = "answers";
      answerChoice.textContent = questionsArr[i].choices[j];

      var clickedAnswer = answerChoice.setAttribute(
        "id",
        questionsArr[i].choices[j]
      );
      answerContainer.appendChild(answerChoice);
    }
    // BUG loop will not continue iterating

    answerContainer.addEventListener("click", function (event) {
      answerChoice = event.target;
      console.log(event.target);

      if (answerChoice.id == questionsArr[i].answer) {
        // display correct
        feedback = document.createElement("h3");
        feedback.textContent = "Correct!";
        answerContainer.appendChild(feedback);
        // TODO move on to next question
        // questionBox.remove();
      } else {
        // display incorrect
        feedback = document.createElement("h3");
        feedback.textContent = "Wrong!";
        answerContainer.appendChild(feedback);
        // take time off counter
        counter -= 20;
        // TODO move on to next question
        // questionBox.remove();
      }
      // BUG feedback will display multiple times if clicked. will be fixed on move to next question
    });

    break;
  }

  endGame();
};

// endGame function
const endGame = function () {
  // TODO display current score
  
  // TODO save initials >> submit (preventDefault)
  // TODO create an object and store high scores into localStorage
};

startBtn.addEventListener("click", startQuiz);
