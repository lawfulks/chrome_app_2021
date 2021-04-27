const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const row = btn.parentNode;
  toDoList.removeChild(row);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(row.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  showToDoList(toDos.length > 0);
}

function paintToDo(text) {
  const row = document.createElement("div");
  const delBtn = document.createElement("i");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  row.classList.add("todo-row");
  span.classList.add("todo-item");
  span.innerText = text;
  delBtn.classList.add("fas");
  delBtn.classList.add("fa-trash-alt");
  delBtn.classList.add("btn");
  delBtn.addEventListener("click", deleteToDo);
  row.appendChild(span);
  row.appendChild(delBtn);
  row.id = newId;
  toDoList.appendChild(row);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null && loadedToDos !== "[]") {
    showToDoList(true);
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  } else {
    showToDoList(false);
  }
}

function showToDoList(show) {
  if (show) {
    toDoList.classList.remove(NO_SHOWING_CN);
    toDoList.classList.add(SHOWING_CN);
  } else {
    toDoList.classList.remove(SHOWING_CN);
    toDoList.classList.add(NO_SHOWING_CN);
  }
}

function checkShowingList() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser != null) {
    toDoForm.classList.remove(NO_SHOWING_CN);
    toDoForm.classList.add(SHOWING_CN);
    loadToDos();
  } else {
    toDoForm.classList.remove(SHOWING_CN);
    toDoForm.classList.add(NO_SHOWING_CN);
    showToDoList(false);
  }
}

function init() {
  checkShowingList();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
