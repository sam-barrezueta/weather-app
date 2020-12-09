// DATE & TIME

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let dayIndex = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = dayIndex[date.getDay()];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");

function formatDaylight(timestamp,timezone) {
let time = new Date((timestamp + timezone) * 1000);
let hours = time.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = time.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
return `${hours}:${minutes}`
}

let sunriseElement = document.querySelector("#sunrise");
let sunsetElement = document.querySelector("#sunset");

// SEARCH ENGINE

function showTemperature(response) {
  celsiusTemperature = Math.round(response.data.main.temp)
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = celsiusTemperature;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#weather-icon").setAttribute("alt", "response.data.weather[0].description");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);  
  sunriseElement.innerHTML = formatDaylight(response.data.sys.sunrise, response.data.timezone);
  sunsetElement.innerHTML = formatDaylight(response.data.sys.sunset, response.data.timezone);
}

function search(city) {
  let apiKey = "aef650f4f97d6be4e2588d635fe74f28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
let searchForm = document.querySelector("#button-addon2");
searchForm.addEventListener("click", submitCity);


// CURRENT-CITY BUTTON

  function retrieveCoordinates(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "aef650f4f97d6be4e2588d635fe74f28";
  let geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(geoApiUrl).then(showTemperature);
  }

function showCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveCoordinates);
}

let currentCityButton = document.querySelector("#current-city-btn");
currentCityButton.addEventListener("click", showCurrentPosition);


// UNIT CONVERSION

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}
function convertToCelsius(event) {
  event.preventDefault();
temperatureElement.innerHTML = celsiusTemperature
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
}
let celsiusTemperature = null;
let temperatureElement = document.querySelector("#temperature");

let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");


fahrenheitLink.addEventListener("click", convertToFahrenheit);
celsiusLink.addEventListener("click", convertToCelsius);

search("New York");