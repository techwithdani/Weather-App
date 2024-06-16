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

const fetchCurrentWeatherData = async () => {
    try {
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

        temperature.innerHTML = await convertRoundDegree(weatherData.main.temp - 273.15);
        sky.innerHTML = await weatherData.weather[0].description;
        currentLocation.innerHTML = await weatherData.name;
        currentDate.innerHTML = await changeDateFormat(weatherData.dt);

        windSpeed.innerHTML = await convertMpsToKmh(weatherData.wind.speed);
        pressure.innerHTML = `${weatherData.main.pressure} HPA`;
        sunrise.innerHTML = await changeDateFormat(weatherData.sys.sunrise, "hour");
        sunset.innerHTML = await changeDateFormat(weatherData.sys.sunset, "hour");
        humidity.innerHTML = `${weatherData.main.humidity} %`;
        visibility.innerHTML = await convertMetersToKm(weatherData.visibility);

    }  catch (error) {
        console.error(error.message);
    }
};

const convertMetersToKm = async (meters) => {
    return `${meters / 1000} KM`;
};

const convertMpsToKmh = async (mps) => {
    return `${Math.round(mps * 3.6)} KM/H`;
};

const convertRoundDegree = async (degree) => {
    const roundedDegree = Math.round(degree * 10) / 10;
    if (roundedDegree % 1 === 0) {
      return `${roundedDegree.toFixed(1)}°C`;
    } else {
      return `${roundedDegree}°C`;
    }
};

const changeDateFormat = async (unixTimeStamp, type) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const daysOfWeekShortened = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const monthsOfYearShortened = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthsOfYear = [
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
    "December",
  ];

  const date = new Date(unixTimeStamp * 1000);
  const dayOfMonth = date.getDate();
  const monthIndex = date.getMonth();
  const dayOfWeekIndex = date.getDay();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${dayOfMonth} ${monthsOfYear[monthIndex]} ${daysOfWeek[dayOfWeekIndex]}`;
  const formattedDateShortened = `${dayOfMonth} ${monthsOfYearShortened[monthIndex]} ${daysOfWeekShortened[dayOfWeekIndex]}`;

  if (type === "day") {
    return daysOfWeek[dayOfWeekIndex];
  } else if (type === "hour") {
    return `${hours}:${minutes}`;
  } else if (type === "short") {
    return formattedDateShortened;
  } else {
    return formattedDate;
  }
}