function updateWeatherData(response) {
  let temperatureElement = document.querySelector("#weather-app-temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionConditions = document.querySelector("#description");
  let descriptionHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let dayTime = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  dayTime.innerHTML = formatDate(date);
  descriptionConditions.innerHTML = response.data.condition.description;
  descriptionHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeed.innerHTML = `${response.data.wind.speed} mph`;
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  console.log(response.data);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "06a75966f48t8e1bb0f5829fc38o234b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateWeatherData);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  forecast.innerHTML = `
  
    <div class="weather-forecast-day">
            <div class="weather-forecast-date">Tuesday</div>
            <img src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png" class="weather-forecast-icon">
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>15°</strong> 
              </div>
              <div class="weather-forecast-temperature">9°</div>
              </div>
`;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Boston");
displayForecast();
