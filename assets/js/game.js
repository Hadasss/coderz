const quizContainer = document.querySelector(".quiz-container");
const title = document.querySelector(".title");
let time = document.querySelector(".time");
let highScores = document.querySelector(".high-scores");
let feedback = document.querySelector(".feedback");
const startBtn = document.querySelector(".start");
const questionBox = document.querySelector(".question-box");
const allAnswers = document.querySelector(".all-answers");
const userInitials = document.querySelector(".user-initials");
let userInput = document.querySelector(".user-input");
const btnSave = document.querySelector(".save");
const scoreBoard = document.querySelector(".score-board");
const scoreTitle = document.querySelector(".score-title");
const scoresInfo = document.querySelector(".scores-info");
let scores = [];
// set it in global scope for better runtime
if (localStorage.getItem("scores")) {
  scores = JSON.parse(localStorage.getItem("scores"));
}
let currScore = "";
let countdown = "";
let counter = 200;
let questionIndex = 0;
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

  //   {
  //     questionText: "In JavaScript, what is a block of statement?",
  //     choices: [
  //       "Conditional block",
  //       "block that combines a number of statements into a single compound statement",
  //       "both conditional block and a single statement",
  //       "block that contains a single statement",
  //     ],
  //     answer:
  //       "block that combines a number of statements into a single compound statement",
  //   },

  //   {
  //     questionText:
  //       "When interpreter encounters an empty statements, what it will do:",
  //     choices: [
  //       "Shows a warning",
  //       "Prompts to complete the statement",
  //       "Throws an error",
  //       "Ignores the statements",
  //     ],
  //     answer: "Ignores the statements",
  //   },

  //   {
  //     questionText: "The 'function' and 'var' are known as:",
  //     choices: ["Keywords", "Data types", "Declaration statements", "Prototypes"],
  //     answer: "Declaration statements",
  //   },

  //   {
  //     questionText:
  //       "Which of the following variables takes precedence over the others if the names are the same?",
  //     choices: [
  //       "Global variable",
  //       "The local element",
  //       "The two of the above",
  //       "None of the above",
  //     ],
  //     answer: "The local element",
  //   },

  //   {
  //     questionText:
  //       "Which one of the following is the correct way for calling the JavaScript code?",
  //     choices: ["Preprocessor", "Triggering Event", "RMI", "Function/Method"],
  //     answer: "Function/Method",
  //   },

  //   {
  //     questionText: "Which of the following type of a variable is volatile?",
  //     choices: [
  //       "Mutable variable",
  //       "Dynamic variable",
  //       "Volatile variable",
  //       "Immutable variable",
  //     ],
  //     answer: "Mutable variable",
  //   },

  //   {
  //     questionText:
  //       "Which of the following number object function returns the value of the number?",
  //     choices: ["toString()", "valueOf()", "toLocaleString()", "toPrecision()"],
  //     answer: "valueOf()",
  //   },

  //   {
  //     questionText:
  //       "In the JavaScript, which one of the following is not considered as an error:",
  //     choices: [
  //       "Syntax error",
  //       "Missing of semicolons",
  //       "Division by zero",
  //       "Missing of Bracket",
  //     ],
  //     answer: "Division by zero",
  //   },
];
let questionTitle = document.querySelector(".question");
let currQuestion;
var answerContainer = document.createElement("ol");
let questionContainer = document.createElement("div");
const startAgainBtn = document.createElement("button");
const initialsAlert = document.createElement("h4");

const startQuiz = function () {
  questionIndex = 0;
  title.remove();
  scoreBoard.remove();

  //   countdown timer
  countdown = setInterval(function () {
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

const displayQuestions = function () {
  questionContainer.innerHTML = "";
  answerContainer.innerHTML = "";
  currQuestion = questionsArr[questionIndex];
  questionBox.appendChild(questionContainer);

  let questionTitle = document.createElement("h3");
  questionTitle.textContent = currQuestion.questionText;
  questionContainer.appendChild(questionTitle);

  allAnswers.appendChild(answerContainer);

  for (let i = 0; i < currQuestion.choices.length; i++) {
    var answerChoice = document.createElement("li");
    answerChoice.className = "answers";
    answerChoice.textContent = currQuestion.choices[i];

    var clickedAnswer = answerChoice.setAttribute(
      "id",
      currQuestion.choices[i]
    );

    answerChoice.addEventListener("click", performCheck);
    answerContainer.appendChild(answerChoice);
  }
};

function performCheck(event) {
  answerChoice = event.target;

  if (answerChoice.id == currQuestion.answer) {
    // display correct
    feedback = document.createElement("h3");
    feedback.textContent = "Correct!";
    answerContainer.appendChild(feedback);
    questionIndex++;
  } else {
    // display incorrect
    feedback = document.createElement("h3");
    feedback.textContent = `Wrong! ${currQuestion.answer}`;
    answerContainer.appendChild(feedback);
    // take time off counter
    counter -= 20;
    questionIndex++;
  }

  const allAnswersLi = document.querySelectorAll(".answers");
  for (j = 0; j < allAnswersLi.length; j++) {
    allAnswersLi[j].setAttribute("class", "answers disabled");
  }

  const displayNextQuestion = setTimeout(function () {
    if (questionIndex < questionsArr.length) {
      displayQuestions();
    } else {
      endGame();
    }
  }, 2000);
}

const endGame = function () {
  // stop timer
  clearInterval(countdown);
  // TODO set a conditional for when player loses - out of time

  // remove question and answers
  questionBox.textContent = "";
  allAnswers.remove();
  // display current score
  currScore = counter;
  let endMessage = document.createElement("h3");
  endMessage.textContent = `Game Over. Your score is ${counter}. See if you made it to the top 10 scores. `;
  questionBox.appendChild(endMessage);
  getUserInitials();
};

const saveScore = function () {
  let score = {
    initials: userInput.value,
    score: currScore,
  };
  // BUG score saved to array automatically + on user save. when score object is taken out to global scope the code breaks.

  // BUG not executing condition
  //   if (!userInput.textContent) {
  //     initialsAlert.textContent = "Please type your initials";
  //     quizContainer.appendChild(initialsAlert);
  //   } else {
  scores.push(score);
  localStorage.setItem("scores", JSON.stringify(scores));

  // TODO clear form

  startAgain();
  //   }
};

const startAgain = function () {
  // add button to play again
  startAgainBtn.textContent = "Try Again?";
  startAgainBtn.className = "btn";
  quizContainer.appendChild(startAgainBtn);
};

const getUserInitials = function () {
  if (userInitials.className === "user-initials hidden") {
    userInitials.classList.remove("hidden");
    userInitials.classList.add("visible");
  }

  saveScore();
};

const loadHighscore = function () {
  // BUG "view highscores" disappears on click
  console.log("high scores clicked!");
  // clear the quizContainer
  title.remove();
  questionContainer.remove();
  answerContainer.remove();
  userInitials.remove();

  // TODO get scores from localStorage + display
  let scoresParsed = JSON.parse(localStorage.getItem("scores"));
  console.log(scoresParsed);

  scoreBoardTitle = document.querySelector("h3");
  scoreBoardTitle.textContent = "";
  scoreTitle.appendChild(scoreBoardTitle);

  if (!scoresParsed) {
    scoreBoardTitle.textContent =
      "There are no scores yet, you are the first player!";

    startBtn.textContent = "Start Quiz";
    scoreBoard.appendChild(startBtn);
  } else {
    scoreBoardTitle.textContent = "These are the top scores:";
    for (let i = 0; i < scores.length; i++) {
      const scoreDiv = document.createElement("div");
      scoreDiv.className = "score-div";
      scoresInfo.appendChild(scoreDiv);
      let scoreName = document.createElement("p");
      scoreName.className = "score-name";
      scoreName.textContent = scores[i].initials;
      scoreDiv.appendChild(scoreName);
      let scoreNum = document.createElement("span");
      scoreNum.textContent = scores[i].score;
      scoreDiv.appendChild(scoreNum);
    }
  }
};

startBtn.addEventListener("click", startQuiz);
highScores.addEventListener("click", loadHighscore);
btnSave.addEventListener("click", saveScore);
startAgainBtn.addEventListener("click", function () {
  location.reload();
});
