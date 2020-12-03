// DATE & TIME

function formatDate() {
  let dayIndex = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = dayIndex[currentDate.getDay()];


  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

let currentDate = new Date();
let date = document.querySelector("#date");
date.innerHTML = formatDate(currentDate);

// SEARCH ENGINE

function showTemperature(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  // document.querySelector("#date").innerHTML = response.data.
  console.log(response.data);
}

function search(city){
  let unit = "metric";
  let apiKey = "aef650f4f97d6be4e2588d635fe74f28";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

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
function showCurrentPosition(position) {

  function showCurrentPositionTemperature(response) {
    document.querySelector("#city-name").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
  }

  function retrieveCoordinates(coordinates) {
  let lat = coordinates.coords.latitude;
  let lon = coordinates.coords.longitude;
  let unit = "metric";
  let apiKey = "aef650f4f97d6be4e2588d635fe74f28";
  let geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`

  axios.get(geoApiUrl).then(showCurrentPositionTemperature);
  }

  navigator.geolocation.getCurrentPosition(retrieveCoordinates);

}

let currentCityButton = document.querySelector("#current-city-btn");
currentCityButton.addEventListener("click", showCurrentPosition);


// UNIT LINKS

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 61;
}
function convertToCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 16;
}

let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");

fahrenheitLink.addEventListener("click", convertToFahrenheit);
celsiusLink.addEventListener("click", convertToCelsius);

search("New York");