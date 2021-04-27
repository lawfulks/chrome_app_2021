const userForm = document.querySelector(".js-userForm"),
  toDoFormInList = document.querySelector(".js-toDoForm"),
  input = userForm.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  rightBtn = document.querySelector(".right-btn");

const USER_LS = "currentUser",
  SHOWING_CN = "showing",
  NO_SHOWING_CN = "no-showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {
  greeting.classList.remove(SHOWING_CN);
  greeting.classList.add(NO_SHOWING_CN);
  userForm.classList.remove(NO_SHOWING_CN);
  userForm.classList.add(SHOWING_CN);
  userForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  userForm.classList.remove(SHOWING_CN);
  userForm.classList.add(NO_SHOWING_CN);
  greeting.classList.remove(NO_SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `${text} 's TODO List`;
  toDoFormInList.classList.remove(NO_SHOWING_CN);
  toDoFormInList.classList.add(SHOWING_CN);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
