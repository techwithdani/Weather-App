let Url = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "key";

const cityName = document.querySelector("#city-name");
const searchButton = document.querySelector("#search-button");
const temperature = document.querySelector("#temp");
const sky = document.querySelector("#sky");
const currentLocation = document.querySelector("#location");
const currentDate = document.querySelector("#date");
const windSpeed = document.querySelector("#wind");
const pressure = document.querySelector("#pressure");
const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const humidity = document.querySelector("#humidity");
const visibility = document.querySelector("#visibility");

const fetchCurrentWeatherData = async() => {
    const apiUrl = `${Url}q=${cityName.value}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error("Sorry, we couldn't find data. Please check your spelling and try again.");
        } else {
            throw new Error("Oops! we're having trouble getting the weather information right now. Please try again later or contact our support.");
        }
    }

    const weatherData = await response.json();

    temperature.innerHTML = await weatherData.main.temp;
    sky.innerHTML = await weatherData.weather[0].description;
    currentLocation.innerHTML = await weatherData.name;
    currentDate.innerHTML = await weatherData.dt;

    windSpeed.innerHTML = await weatherData.wind.speed;
    pressure.innerHTML = await weatherData.main.pressure;
    sunrise.innerHTML = await weatherData.sys.sunrise;
    sunset.innerHTML = await weatherData.sys.sunset;
    humidity.innerHTML = await weatherData.main.humidity;
    visibility.innerHTML = await weatherData.visibility;
}