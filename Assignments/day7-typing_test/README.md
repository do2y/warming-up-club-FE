## ⌨️ Typing Test App

> 제한 시간 안에 제시된 문장을 타이핑하며 WPM, CPM, 정확도를 측정하는 타자 연습 웹 애플리케이션입니다.

<br>

## ⁘ 기능 소개

#### 1. 게임 시작 / 재시작

START 버튼을 눌러 게임을 시작하고, 종료 후 RETRY 버튼으로 재시작할 수 있습니다.

#### 2. 랜덤 문장 제시

`sentences.json`에서 랜덤으로 문장을 불러와 화면에 표시합니다.  
문장을 완성하면 자동으로 다음 문장이 로드됩니다.

#### 3. 실시간 타이핑 피드백

타이핑한 글자가 맞으면 초록색, 틀리면 빨간색으로 표시되어 실시간으로 정오를 확인할 수 있습니다.

#### 4. 타이머

첫 입력이 감지되는 순간 카운트다운이 시작됩니다.  
제한 시간(10초)이 종료되면 타이핑이 비활성화되고 결과 화면이 표시됩니다.

#### 5. 결과 통계

게임 종료 후 아래 지표를 표시합니다.

- **ERRORS** — 오타 수
- **ACCURACY** — 정확도 (%)
- **WPM** — 분당 단어 수 (Words Per Minute)
- **CPM** — 분당 타수 (Characters Per Minute)

<br>

## ⁘ 기술적 구현 특징

- 타이머를 `setInterval` 대신 `setTimeout` 재귀 호출로 구현해, 탭 비활성화 등으로 인한 타이머 오차를 방지했습니다.
- 각 글자를 `<span>`으로 분리 렌더링해 글자 단위 색상 피드백을 구현했습니다.
- 첫 입력 시점을 기준으로 타이머를 시작해, 문장을 읽는 시간이 측정에 포함되지 않도록 했습니다.

<br>

## 🔧 트러블슈팅

### 1. 오타 카운트가 의도한 것보다 훨씬 크게 나오는 문제

**문제**

`input` 이벤트 핸들러 안에서 오류 수를 셀 때, `errors` 변수를 `totalErrorCount`로 초기화한 뒤 현재 문장의 틀린 글자를 그 위에 더하는 구조였다.

```js
let errors = totalErrorCount; // 이전 누적값에서 시작

spans.forEach((span, index) => {
  if (typedChar !== span.textContent) {
    errors++; // 매 입력마다 이전 누적에 계속 더해짐
  }
});
```

문장 중간에 오타를 낸 상태로 계속 타이핑하면, 키를 누를 때마다 같은 오타가 반복 카운트되어 오류 수가 폭발적으로 늘었다.

**해결**

`errors`를 `0`에서 시작해 현재 문장의 오류만 세고, 문장 완료 시점에만 `totalErrorCount`에 합산하도록 수정했다.

```js
let errors = 0; // 현재 문장 오류만 카운트

spans.forEach((span, index) => {
  if (typedChar !== span.textContent) {
    errors++;
  }
});

// 문장 완료 시점에만 누적
if (문장_완료_조건) {
  totalErrorCount += errors;
}
```

---

### 2. `isSentenceComplete` 플래그가 중복 호출을 막지 못하는 문제

**문제**

문장 완료 시 `newSentence()`의 중복 호출을 막기 위해 `isSentenceComplete` 플래그를 두었지만, `newSentence()` 내부의 `fetch`가 비동기라 플래그가 즉시 `false`로 돌아왔다.

```js
isSentenceComplete = true;
typingArea.value = "";
newSentence();         // fetch 비동기 시작 — 아직 안 끝남
isSentenceComplete = false; // 바로 false로 복귀 → 플래그 의미 없음
```

fetch가 완료되기 전에 플래그가 이미 `false`가 되어, 빠르게 입력하면 `newSentence()`가 중복 호출될 수 있었다.

**해결**

`fetch` 완료 콜백(`.then()`) 안에서 `isSentenceComplete = false`를 설정해, 새 문장이 실제로 렌더링된 이후에 플래그를 해제하도록 수정했다.

```js
function newSentence() {
  fetch("sentences.json")
    .then((res) => res.json())
    .then((data) => {
      currentSentence = data[Math.floor(Math.random() * data.length)].text;
      renderSentence(currentSentence);
      isSentenceComplete = false; // 렌더링 완료 후 해제
    });
}
```

---

### 3. 문장이 바뀔 때마다 `sentences.json`을 반복 요청하는 문제

**문제**

`newSentence()`를 호출할 때마다 `fetch("sentences.json")`이 실행되어, 게임 중 문장이 바뀔 때마다 불필요한 네트워크 요청이 발생했다.  
`sentences.json`은 내용이 고정된 정적 파일이므로, 반복 요청은 낭비였다.

**해결 방향**

게임 시작 시 한 번만 `fetch`해서 데이터를 변수에 저장하고, 이후 문장 전환은 저장된 배열에서 랜덤 인덱스로 꺼내도록 개선할 수 있다.

```js
let sentencesData = [];

async function loadSentences() {
  const res = await fetch("sentences.json");
  sentencesData = await res.json();
}

function newSentence() {
  const sentence = sentencesData[Math.floor(Math.random() * sentencesData.length)].text;
  renderSentence(sentence);
}
```
