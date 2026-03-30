const questionElement = document.getElementById("question");
const ansBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let questions = [];
let currQuestionIndex = 0;
let score = 0;

async function fetchQuestions() {
  try {
    const response = await fetch(
      "https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple",
    );
    const data = await response.json();

    questions = data.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
        answers: [],
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      const randomIndex = Math.floor(Math.random() * 4);
      answerChoices.splice(randomIndex, 0, loadedQuestion.correct_answer);

      answerChoices.forEach((choice) => {
        formattedQuestion.answers.push({
          text: choice,
          correct: choice === loadedQuestion.correct_answer,
        });
      });

      return formattedQuestion;
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    questionElement.innerHTML = "Failed to load questions.";
  }
}

async function startQuiz() {
  currQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";

  questionElement.innerHTML = "Loading questions...";
  resetState();

  await fetchQuestions();
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currQuestionIndex];
  let questionNo = currQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    ansBtn.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (ansBtn.firstChild) {
    ansBtn.removeChild(ansBtn.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(ansBtn.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
}

function handleNextButton() {
  currQuestionIndex++;
  if (currQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (currQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();
