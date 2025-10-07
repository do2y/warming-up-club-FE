const generateBtn = document.getElementById("submit");
const passwordLengthInput = document.getElementById("length");

const numbers = "0123456789";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const symbols = "@!#$&%";

const copyBtn = document.getElementById("copy-btn");

generateBtn.addEventListener("click" , (e) => {
    e.preventDefault();
    const passwordLength = Number(passwordLengthInput.value.trim());
    console.log(passwordLength);

    let passwordRange = '';
    if (document.getElementById("numbers").checked) {
        passwordRange += numbers;
    }
    if (document.getElementById("small-letters").checked) {
        passwordRange += lowerCaseLetters;
    }
    if (document.getElementById("capital-letters").checked) {
        passwordRange += upperCaseLetters;
    }
    if (document.getElementById("symbols").checked) {
        passwordRange += symbols;
    }

    if (passwordRange === '') {
        alert('적어도 한 가지 버튼을 선택해주세요!');
        return;
    }

    const passwordDiv = document.getElementById("password");
    passwordDiv.innerText = getRandomPassword( passwordLength, passwordRange );
});

function getRandomPassword ( passwordLength, range ) {
    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * range.length);
        password += range[randomIndex];
    }
    return password;
}

copyBtn.addEventListener("click", () => {
    const password = document.getElementById("password").innerText;

    if (!password || password.includes("비밀번호를 복사")) {
        alert("먼저 비밀번호를 생성해주세요!");
        return;
    }

    navigator.clipboard.writeText(password);
    alert("비밀번호가 복사되었습니다.");
})

