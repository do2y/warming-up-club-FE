const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const submitBtn = document.getElementById("submit-btn");
const bookList = document.querySelector(".book-list");

function showMessage(text, duration = 1500) {
  const message = document.createElement("div");
  message.textContent = text;
  message.classList.add("message");

  const wrap = document.querySelector(".wrap-container");
  const header = wrap.querySelector("h1");
  wrap.insertBefore(message, header.nextSibling);

  setTimeout(() => {
    message.remove();
  }, duration);
}

submitBtn.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  titleInput.value = "";
  authorInput.value = "";

  if (title === "" || author === "") {
    alert("책 이름과 저자가 입력되지 않았습니다.");
    return;
  }

  const bookItem = document.createElement("div");
  bookItem.classList.add("book-item");

  const titleSpan = document.createElement("span");
  titleSpan.textContent = title;

  const authorSpan = document.createElement("span");
  authorSpan.textContent = author;

  const deleteSpan = document.createElement("span");
  deleteSpan.textContent = "x";
  deleteSpan.classList.add("delete-btn");

  bookItem.appendChild(titleSpan);
  bookItem.appendChild(authorSpan);
  bookItem.appendChild(deleteSpan);
  bookList.appendChild(bookItem);

  showMessage(`${title} 도서가 추가되었습니다.`, 1500);
});

bookList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const bookItem = e.target.parentElement;
    const title = bookItem.querySelector("span").textContent;
    bookItem.remove();
    showMessage(`${title} 도서가 삭제되었습니다.`, 3000);
  }
});
