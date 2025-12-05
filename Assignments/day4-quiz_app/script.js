let quizIndex = 0;
let incorrectCount = 0;
let answer;

const restartButton = document.querySelector(".restart-btn");
const nextButton = document.querySelector(".next-btn");
const choiceButtons = document.querySelectorAll(".choices button");

function startQuiz() {
  quizIndex = 0;
  incorrectCount = 0;
  loadNextQuiz();
}

// 문제 불러오기
function loadNextQuiz() {
  if (incorrectCount >= 3 || quizIndex >= 5) {
    restartButton.classList.remove("hidden");
    nextButton.classList.add("hidden");
    return;
  }

  // 새로운 문제 세팅
  answer = getRandomQuestion();
  quizIndex++;

  // 버튼 색 초기화
  choiceButtons.forEach((btn) => {
    btn.style.backgroundColor = "";
    btn.disabled = false;
  });

  nextButton.classList.add("hidden");
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", function () {
    handleAnswer(Number(this.textContent), this);
  });
});

function handleAnswer(selectedValue, clickedButton) {
  if (selectedValue === answer) {
    clickedButton.style.backgroundColor = "#32965cff";
  } else {
    clickedButton.style.backgroundColor = "#d32427ff";
    incorrectCount++;
  }

  choiceButtons.forEach((btn) => (btn.disabled = true));

  nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
  loadNextQuiz();
});

restartButton.addEventListener("click", () => {
  window.location.reload();
});

// 랜덤 문제 생성
function getRandomQuestion() {
  let arr = ["+", "-", "x"];
  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;

  let operator = arr[Math.floor(Math.random() * 3)];

  let answer;
  if (operator === "+") answer = num1 + num2;
  else if (operator === "-") answer = num1 - num2;
  else answer = num1 * num2;

  let incorrect = answer - Math.floor(Math.random() * 10 + 1);
  if (incorrect === answer) incorrect -= 1;

  let choiceArr = [answer, incorrect, "정답이 없습니다."];
  choiceArr.sort(() => Math.random() - 0.5);

  document.getElementById(
    "question"
  ).textContent = `${num1} ${operator} ${num2} ?`;
  document.getElementById("choice1").textContent = choiceArr[0];
  document.getElementById("choice2").textContent = choiceArr[1];
  document.getElementById("choice3").textContent = choiceArr[2];

  return answer;
}

startQuiz();
