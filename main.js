const apikey = "e66e474a08ee34e3bfec6063d1823fb5";
const searchForm = document.querySelector("form");
const searchCityInput = document.getElementById("city-input");

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = searchCityInput.value;
  getWeatherInfo(city);
  searchCityInput.value = "";
});

async function getWeatherInfo(city) {
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
  )
    .then((response) => response.json())
    .then((response) => {
      const temperature = Math.round(response.main.temp);
      const cityName = response.name;
      const description = `${response.weather[0].main}, ${response.weather[0].description}`;
      const icon = response.weather[0].icon;
      const realFeel = Math.round(response.main.feels_like);
      const humidity = response.main.humidity;
      const windSpeed = response.wind.speed;

      // display the results
      document.querySelector(
        ".weather-img"
      ).innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather icon"/>`;
      document.querySelector(".temperature").innerHTML = `${temperature}°C`;
      document.querySelector(".city").innerHTML = `<h1>${cityName}</h1>`;
      document.querySelector(".description").innerHTML = `${description}`;
      document.querySelector(
        ".feels-like"
      ).innerHTML = `Feels like: ${realFeel}°C`;
      document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
      document.querySelector(
        ".w-speed"
      ).innerHTML = `Wind speed: ${windSpeed} m/s`;
    })
    //error processing
    .catch((error) => {
      // clear the last result display
      document.querySelector(".weather-img").innerHTML = "";
      document.querySelector(".temperature").innerHTML = "";
      document.querySelector(".city").innerHTML = "";
      document.querySelector(".description").innerHTML =
        "An error occurred, please try again.";
      document.querySelector(".feels-like").innerHTML = "";
      document.querySelector(".humidity").innerHTML = "";
      document.querySelector(".w-speed").innerHTML = "";
    });
}
