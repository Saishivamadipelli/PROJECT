const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherData = document.getElementById('weatherData');
const errorMessage = document.getElementById('errorMessage');
const cityDisplay = document.getElementById('cityDisplay');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const icon = document.getElementById('icon');

// ***REPLACE THIS WITH YOUR ACTUAL API KEY***
const apiKey = '9d109b2404549a6b4a3b1eded88378c1'; // Get one from: https://openweathermap.org/

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    errorMessage.textContent = '';
    weatherData.style.display = 'none';

    if (!city) {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    fetchWeatherData(city);
});

async function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            // Handle HTTP errors (400, 404, 500, etc.)
            const errorJson = await response.json().catch(() => ({ message: response.statusText })); // Handle potential JSON parsing errors
            throw new Error(errorJson.message || `HTTP error ${response.status}`);
        }

        const data = await response.json();
        displayWeather(data);

    } catch (error) {
        console.error("Error fetching weather:", error);
        errorMessage.textContent = error.message; // Display error to the user
    }
}

function displayWeather(data) {
    cityDisplay.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Description: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    const iconCode = data.weather[0].icon;
    icon.innerHTML = iconCode
        ? `<img src="http://openweathermap.org/img/w/${iconCode}.png" alt="Weather Icon">`
        : ''; // Clear icon if no code

    weatherData.style.display = 'block';
}