let Url = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "86960b2a6adfa182188e00404e6d2fce";

const cityName = document.querySelector("#city-name");
const searchButton = document.querySelector("#search-button");
const temperature = document.querySelector("#temp");
const sky = document.querySelector("#sky");
const weatherLocation = document.querySelector("#location");
const date = document.querySelector("#date");
const windSpeed = document.querySelector("#wind");
const pressure = document.querySelector("#pressure");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const humidity = document.querySelector("#humidity");
const visibility = document.querySelector("#visibility");

const fetchCurrentWeatherData = async() => {
    const apiUrl = `${Url}q=${cityName.value}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
}