const buttons = document.querySelectorAll("#choice-buttons button");
const restartButton = document.getElementById("restart-button"); 
let remainingChanceNumber = 10;


function playGame(choice) {
    if (remainingChanceNumber <= 0) return; // 게임 종료 후 리턴

    const computerChoice = getRandomChoice();
    determineWinner(choice, computerChoice);

    remainingChanceNumber--;
    document.getElementById("chance").textContent = `${remainingChanceNumber}`;

    if (remainingChanceNumber === 0) {
        endGame();
    }
}


function getRandomChoice() {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}


function determineWinner(playerChoice, computerChoice) {
    let result = "";

    if (playerChoice === computerChoice) {
        result = "무승부!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        result = "플레이어 승리!";
    } else {
        result = "컴퓨터 승리!";
    }

    document.getElementById("result").textContent = result;

    const playerScoreElement = document.getElementById("player-score");
    const computerScoreElement = document.getElementById("computer-score");

    let playerScore = parseInt(playerScoreElement.textContent);
    let computerScore = parseInt(computerScoreElement.textContent);

    if (result === "플레이어 승리!") {
        playerScoreElement.textContent = playerScore + 1;
    } else if (result === "컴퓨터 승리!") {
        computerScoreElement.textContent = computerScore + 1;
    }
}


function endGame() {
    const resultElement = document.getElementById("result");
    const playerScore = parseInt(document.getElementById("player-score").textContent);
    const computerScore = parseInt(document.getElementById("computer-score").textContent);

    if (playerScore > computerScore) {
        resultElement.textContent = "게임 승리!";
    } else if (playerScore < computerScore) {
        resultElement.textContent = "게임 패배!";
    } else {
        resultElement.textContent = "무승부!";
    }

    resultElement.classList.add("end-game");

    document.getElementById("choice-buttons").classList.add("hidden");

    restartButton.classList.remove("hidden");
}

restartButton.addEventListener("click", () => {
    window.location.reload(); // 페이지 새로고침
});

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        playGame(button.dataset.choice);
    });
});
