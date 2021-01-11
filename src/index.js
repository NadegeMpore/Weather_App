

//Feature (1) Displaying the current date and time
function currentDate() {
  let date_now = new Date();
  let currentDate = date_now.getDate();
  let day_today = date_now.getDay();
  let year = date_now.getFullYear();
  let month = date_now.getMonth();
  let hour = date_now.getHours();

  //let's create an array of days
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday"
  ];

  // let's create an array of months
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let today = `${days[day_today]}, ${months[month]} ${currentDate}, ${year}`;
  return today;
}
// set the true date today
let today = document.querySelector("#fullDate");
today.innerHTML = currentDate();

function currentTime() {
  let date_now = new Date();
  let hours = date_now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date_now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}h${minutes}`;
}
let hour_today = document.querySelector("#hourOfDay");
hour_today.innerHTML = currentTime();

// Feature (2) adding a search engine when searching for city

function showWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function Find_City(city) {
  //make an API call to OpenWeather API
  // get the HTTP response that displays the city name, temperature, wind and precipitation
  let apiKey = "9fbdda51194341ffccf784d37286b31a";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showWeatherCondition);
}
function submitButton(event) {
  event.preventDefault();
  let city = document.querySelector("#world-cities").value;
  Find_City(city);
}

function getPosition(position) {
  let apiKey = `9fbdda51194341ffccf784d37286b31a`;
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiURL).then(showWeatherCondition);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

//Feature (3) Displaying a fake temperature in celsius and convert it into Faranheit
function convert_to_Faranheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temperature");

  temp.innerHTML = 56;
}

function convert_to_Celsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temperature");
  temp.innerHTML = 19;
}

let faranheit_click = document.querySelector("#degree-faranheit");
faranheit_click.addEventListener("click", convert_to_Faranheit);
let celsius_click = document.querySelector("#degree-celsius");
celsius_click.addEventListener("click", convert_to_Celsius);

let searchForm = document.querySelector("#city_search");
searchForm.addEventListener("submit", submitButton);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getCurrentPosition);

Find_City("New York");
