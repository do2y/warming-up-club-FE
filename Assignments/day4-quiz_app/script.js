//랜덤 문제 내는 함수 //next 버튼 누르면 새로운 문제가 나온다.

//배경색 다르게 하는 함수 - 정답인지 아닌지
//정답이면 초록색, 오답이면 빨간색

//세번 틀리면 restart 뜨도록 하기

function startQuiz() {
    let answer = getRandomQuestion();
    let choice = chooseAnswer();

    checkAnswer(choice);
}

function getRandomQuestion() {   
    let arr = ["+", "-", "x"]; 
    let num1 = Math.floor(Math.random() * 10) + 1;     //1~10랜덤수
    let num2 = Math.floor(Math.random() * 10) + 1;     //1~10랜덤수

    let operator = arr[Math.floor(Math.random() * 3)];     //+,-,x 중 하나

    let answer;
    if(operator === "+") {
        answer = num1 + num2;
    } else if(operator === "-") {
        answer = num1 - num2;
    } else {
        answer = num1 * num2;
    }

    document.getElementById("question").innerHTML = num1 + " " + operator  + " " + num2 + " ?";
    return answer;
}
          
function chooseAnswer(){
    let userInput = parseInt(document.getElementById("answer").value);
}


//정답이면 선택한 버튼이 초록색, 오답이면 빨간색이됨됨
function checkAnswer(choice) {
    let userInput = choice;
    let correctAnswer = getRandomQuestion();

    if(userInput === correctAnswer) {
        document.getElementById("result").style.color = "green";  //선택된 버튼 색을을
        document.body.style.backgroundColor = "green";
    }
    else {
        document.getElementById("result").style.color = "red";
        document.body.style.backgroundColor = "red";
    }

}