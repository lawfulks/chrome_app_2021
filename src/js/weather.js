const weather = document.querySelector(".js-weather"),
  temp = document.querySelector(".js-weather-temp"),
  weatherIcon = document.querySelector(".weather-icon");

const COORDS = "coords";

function getWeather(latitude, longitude) {
  const API_KEY = "6cae8fb624982d8ba93858b92330ff17";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature =
        Math.round(((parseInt(json.main.temp, 0) - 32) * 5) / 9) / 10;
      const weatherText = json.weather[0].main;
      const weatherImg = json.weather[0].icon;

      weatherIcon.classList.remove(NO_SHOWING_CN);
      weatherIcon.classList.add(SHOWING_CN);
      weatherIcon.src = `http://openweathermap.org/img/wn/${weatherImg}.png`;
      weather.innerText = weatherText;
      temp.innerHTML = `${temperature}°C`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObject = {
    latitude,
    longitude,
  };
  saveCoords(coordsObject);
  getWeather(latitude, longitude);
}

function handleGeoError() {}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);

  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
