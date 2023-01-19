// retrieve DOM elements
var startBtn = document.querySelector("#start");
var timerEl = document.querySelector("#timer");

var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#options");
var responseEl = document.querySelector("#response");

var nameEl = document.querySelector("#name");
var submitBtn = document.querySelector("#submit-score");
var restartBtn = document.querySelector("#restart");


// sample quiz questions
var questions = [
    {
      title: 'Commonly used data types DO NOT include:',
      choices: ['strings', 'booleans', 'alerts', 'numbers'],
      answer: 'alerts',
    },
    {
      title: 'The condition in an if / else statement is enclosed within ____.',
      choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
      answer: 'parentheses',
    },
    {
      title: 'Arrays in JavaScript can be used to store ____.',
      choices: [
        'numbers and strings',
        'other arrays',
        'booleans',
        'all of the above',
      ],
      answer: 'all of the above',
    },
    {
      title:
        'String values must be enclosed within ____ when being assigned to variables.',
      choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
      answer: 'quotes',
    },
    {
      title:
        'A very useful tool used during development and debugging for printing content to the debugger is:',
      choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
      answer: 'console.log',
    },
  ];

// @ quiz start

var index = 0;
var time = questions.length * 15;
var timerId;

// start quiz and initialize hide
function startQuiz() {
  timerEl.textContent = time;
  timerId = setInterval(tick, 1000);
  var firstScreenEl = document.getElementById("start-screen");
  firstScreenEl.setAttribute("class", "hide");
  questionsEl.removeAttribute("class");
  showQuestion();
}

function tick() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function showQuestion() {
  var currentQ = questions[index];
  var prompt = document.getElementById("question-prompt")
  prompt.textContent = currentQ.title;
  choicesEl.innerHTML = "";
  currentQ.choices.forEach(function(choice, i) {
      var choiceBtn = document.createElement("button");
      choiceBtn.setAttribute("value", choice);
      choiceBtn.textContent = (i+1) + ". " + choice;
      choiceBtn.onclick = clickChoice;
      choicesEl.appendChild(choiceBtn);
  });
}

// check for correct response when user answers a question 
function clickChoice() {
  if (this.value !== questions[index].answer) {
    time -= 15;
    if (time < 0) {
      time = 0;
    }
    timerEl.textContent = time;
    responseEl.textContent = 'Wrong!';
  } 
  else {
    responseEl.textContent = "Correct!";
  }
  responseEl.setAttribute("class", "response");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "response hide");
  }, 2000);
  index += 1;
  
  // check if quiz ends
  if (index === questions.length) {
    endQuiz();
  } 
  // if not, shows next question
  else {
    showQuestion();
  }
}

// ends the quiz and resets timer/questions
function endQuiz() {
  clearInterval(timerId);
  var endingEl = document.getElementById("end-screen");
  endingEl.removeAttribute("class");
  var scoreEl = document.getElementById("score-final");
  scoreEl.textContent = time;
  questionsEl.setAttribute("class", "hide");
}

// use local storage to save highest score
function saveScore() {
  var name = nameEl.value.trim();
  if (name !== "") {
    var scores = JSON.parse(window.localStorage.getItem("scores")) || [];
    // each score is an object
    var newScore = {
      name: name,
      score: time
    };
    scores.push(newScore);
    window.localStorage.setItem("scores", JSON.stringify(scores));
  }
}

function saveScore2(event) {
  if (event.key === "Enter") {
      saveScore();
  }
}

// define user interaction w/ buttons/keys

  // save score when submit quiz
submitBtn.onclick = saveScore;
  // also save score when user presses enter when entering name
nameEl.onkeyup = saveScore2;
  // start quiz when start button is clicked
startBtn.onclick = startQuiz;