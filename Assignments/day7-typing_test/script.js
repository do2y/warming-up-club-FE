const errorDiv = document.getElementById("error");
const timeDiv = document.getElementById("time");
const accuracyDiv = document.getElementById("accuracy");
const wpmDiv = document.getElementById("wpm");
const cpmDiv = document.getElementById("cpm");

const sentenceArea = document.getElementById("sentence-area");

const startScreen = document.getElementById("start-screen");
const retryScreen = document.getElementById("retry-screen");
const gameScreen = document.getElementById("game-screen");

const startBtn = document.getElementById("start-btn");
const retryBtn = document.getElementById("retry-btn");
const typingArea = document.getElementById("typing-area");

let timerStarted = false;
let currentSentence = "";
let totalSeconds = 10;

showStart();

startBtn.addEventListener("click", () => {
  startGame();
});

retryBtn.addEventListener("click", () => {
  startGame();
});

typingArea.addEventListener("input", (e) => {
  if (!timerStarted) {
    const endTime = new Date(Date.now() + totalSeconds * 1000);
    timer(endTime, 1000);
    timerStarted = true;
  }

  const typed = typingArea.value.split("");
  const spans = sentenceArea.querySelectorAll("span");
  let errors = 0;

  spans.forEach((span, index) => {
    const typedChar = typed[index];

    if (typedChar == null) {
      span.classList.remove("correct", "incorrect");
    } else if (typedChar === span.textContent) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
    } else {
      span.classList.add("incorrect");
      span.classList.remove("correct");
      errors++;
    }
  });

  errorDiv.textContent = errors;
});

function showStart() {
  startScreen.classList.remove("hidden");
  retryScreen.classList.add("hidden");
  gameScreen.classList.add("hidden");
}

function showRetry() {
  retryScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
}

function startGame() {
  timerStarted = false;
  typingArea.disabled = false;
  typingArea.value = "";
  errorDiv.textContent = 0;
  accuracyDiv.textContent = "0%";
  wpmDiv.textContent = 0;
  cpmDiv.textContent = 0;
  timeDiv.textContent = totalSeconds + "s";

  startScreen.classList.add("hidden");
  retryScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  newSentence();
}

function newSentence() {
  fetch("sentences.json")
    .then((res) => res.json())
    .then((data) => {
      currentSentence = data[Math.floor(Math.random() * data.length)].text;
      renderSentence(currentSentence);
    });
}

function renderSentence(sentence) {
  sentenceArea.innerHTML = "";
  sentence.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    sentenceArea.appendChild(span);
  });
}

function timer(endTime, timeout) {
  const now = Date.now();
  const timeLeft = endTime.getTime() - now;

  const seconds = Math.ceil(timeLeft / 1000);
  timeDiv.textContent = `${seconds}s`;

  if (timeLeft <= 0) {
    endGame();
    return;
  }

  setTimeout(() => timer(endTime, timeout), timeout);
}

function endGame() {
  typingArea.disabled = true;
  showRetry();

  const totalTyped = typingArea.value.length;
  const errors = parseInt(errorDiv.textContent);
  const correct = Math.max(totalTyped - errors, 0);

  const accuracy = totalTyped === 0 ? 0 : (correct / totalTyped) * 100;

  accuracyDiv.textContent = accuracy.toFixed(1) + "%";

  const cpm = Math.round(totalTyped * (60 / totalSeconds));
  cpmDiv.textContent = cpm;

  const wpm = Math.round((totalTyped / 5) * (60 / totalSeconds));
  wpmDiv.textContent = wpm;
}
