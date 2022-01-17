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
let scores = [];
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

const startQuiz = function () {
  console.log("button clicked");
  questionIndex = 0;
  title.remove();

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
  let currQuestion = questionsArr[questionIndex];
  console.log(currQuestion);

  let questionContainer = document.createElement("div");
  questionBox.appendChild(questionContainer);

  let questionTitle = document.createElement("h3");
  questionTitle.textContent = currQuestion.questionText;
  questionContainer.appendChild(questionTitle);

  var answerContainer = document.createElement("ol");
  allAnswers.appendChild(answerContainer);

  for (let i = 0; i < currQuestion.choices.length; i++) {
    var answerChoice = document.createElement("li");
    answerChoice.className = "answers";
    answerChoice.textContent = currQuestion.choices[i];

    var clickedAnswer = answerChoice.setAttribute(
      "id",
      currQuestion.choices[i]
    );

    answerContainer.appendChild(answerChoice);
  }
  answerContainer.addEventListener("click", function (event) {
    answerChoice = event.target;
    console.log(event.target);

    if (answerChoice.id == currQuestion.answer) {
      // display correct
      feedback = document.createElement("h3");
      feedback.textContent = "Correct!";
      answerContainer.appendChild(feedback);
      console.log(questionIndex);
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
    // BUG multiple clicks on answers multiplies number of answers

    const displayNextQuestion = setTimeout(function () {
      if (questionIndex < questionsArr.length) {
        questionContainer.remove();
        answerContainer.remove();
        displayQuestions();
      } else {
        endGame();
      }
    }, 2000);
  });
};

// endGame function
const endGame = function () {
  // stop timer
  clearInterval(countdown);
  // TODO set a conditional for when player loses - out of time

  // remove question and answers
  questionBox.remove();
  allAnswers.remove();
  // display current score
  currScore = counter;
  let endMessage = document.createElement("h3");
  endMessage.textContent = `Game Over. Your score is ${counter}. See if you made it to the top 10 scores. `;
  quizContainer.appendChild(endMessage);
  getUserInitials();
  return currScore;
};

const saveScore = function (event) {
  event.preventDefault();
  let score = {
    initials: userInput.value,
    score: currScore,
  };
  scores.push(score);
  console.log(scores);

  localStorage.setItem("scores", JSON.stringify(scores));
  //   console.log(scoreStr);
  //   let scoresParsed = JSON.parse(localStorage.getItem("scores"));
  //   console.log(scoresParsed);

  // TODO push current score to scores array
  // TODO check if score is in top 10 scores
};

const getUserInitials = function () {
  if (userInitials.className === "hidden") {
    userInitials.className.remove("hidden");
    userInitials.className("visible");
    // TODO clear form
    // document.querySelector("form").reset();
    // TODO save initials >> submit (preventDefault)
    saveScore();
    // TODO create an object and store high scores into localStorage
  }
};

const loadHighscore = function () {
  console.log("high scores clicked!");
  // TODO clear the quizContainer
  // TODO move start quiz button to a different location? or find other place to display scores
  // TODO get scores from localStorage

  // TODO convert from string to objects
};

startBtn.addEventListener("click", startQuiz);

highScores.addEventListener("click", loadHighscore);

btnSave.addEventListener("click", saveScore);
