//랜덤 문제 내는 함수 //next 버튼 누르면 새로운 문제가 나온다.

//배경색 다르게 하는 함수 - 정답인지 아닌지
//정답이면 초록색, 오답이면 빨간색

//세번 틀리면 restart 뜨도록 하기

const restartButton = document.getElementById("restart-button");


function startQuiz() {
    let incorrectCount = 0;

    //문제 5개
    for(let i = 0; i < 5; i++) {   
        let answer = getRandomQuestion();
        let selectedValue;
        
        document.querySelectorAll(".choices button").forEach(button => {
            button.addEventListener("click", function() {
            selectedValue = Number(this.textContent);
             });
        });


        while(incorrectCount < 3){
            if(selectedValue === answer) {
                //정답이면 그 버튼 색깔을 그린으로
                document.getElementById("choice1").style.backgroundColor = "green";  
                //document.body.style.backgroundColor = "green"; 
            }
            else {
                //오답이면 그 버튼 색깔을 빨강으로
                document.getElementById("choice2").style.backgroundColor = "red";
                //document.body.style.backgroundColor = "red";
                incorrectCountCount++;
             }
        }
    }  
    
    //restart 버튼 표시
    restartButton.addEventListener("click", () => {
        window.location.reload();   // 페이지 새로고침
    });

    restartButton.classList.remove("hidden");
}


// 문제 내는 함수, 문제 내고 정답을 리턴함. 
// 문제와 선지를 화면에 표시.
function getRandomQuestion() {   
    let arr = ["+", "-", "x"]; 

    let num1 = Math.floor(Math.random() * 10) + 1;     // 1~10 랜덤 수
    let num2 = Math.floor(Math.random() * 10) + 1;     // 1~10 랜덤 수

    let operator = arr[Math.floor(Math.random() * 3)]; // +, -, x 중 하나

    let answer;
    if (operator === "+") {
        answer = num1 + num2;
    } else if (operator === "-") {
        answer = num1 - num2;
    } else {
        answer = num1 * num2;
    }

    let incorrect = answer - Math.floor(Math.random() * 10 + 1); // 틀린 답
    if (incorrect === answer) incorrect -= 1; // 만약 틀린 답이 정답과 같다면 보정

    let choiceArr = [answer, incorrect, "정답이 없습니다."]; // 선택지 배열
    choiceArr.sort(() => Math.random() - 0.5); // 배열 섞기

    // 문제 표시
    document.getElementById("question").textContent = `${num1} ${operator} ${num2} ?`;

    // 랜덤으로 섞인 선택지를 버튼에 배치
    document.getElementById("choice1").textContent = choiceArr[0];
    document.getElementById("choice2").textContent = choiceArr[1];
    document.getElementById("choice3").textContent = choiceArr[2];

    return answer;
}



startQuiz();