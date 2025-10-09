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

showStart();

startBtn.addEventListener("click", () => {
    console.log("게임 시작 ~");
    startGame();
})

retryBtn.addEventListener("click", () => {
    console.log("게임 다시 시작 ~");
    startGame();
})

 
typingArea.addEventListener("input", (e) => {
    //입력되는 글자가... 맞는지....
    //,,,,,,,,,,,,,
    console.log('입력값:', e.target.value);

    //timer도 start
    const endTime = new Date(Date.now() + 3 * 1000); 
    timer(endTime, 1000);
});

//start 화면
function showStart() {
    startScreen.classList.remove("hidden");  
    retryScreen.classList.add("hidden");  
}

//retry 화면
function showRetry() {
    retryScreen.classList.remove("hidden");  
}

//게임 화면
function startGame() {
    retryScreen.classList.add("hidden");
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    newSentence();
    typingArea.value = "";
}



//sentences.json에서 랜덤으로 문장을 가져오는 함수
function newSentence() {
    fetch("sentences.json")
        .then(res => res.json())
        .then(data => {
            const randomSentence = data[Math.floor(Math.random() * data.length)];
            document.getElementById("sentence-area").textContent = randomSentence.text;
    });
}

function timer(endTime, timeout) {
    const now = Date.now();
    const end = endTime.getTime();
    const timeLeft = end - now;

    if (timeLeft <= 0) {
        showRetry();
        return;
    }

    setTimeout(() => {
        timer(endTime, timeout);
    }, timeout);
}

function calculateAccuracy() {

}

function calculateWPM() {
    
}

function calculateCPM() {
    
}

