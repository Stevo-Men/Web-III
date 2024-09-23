import { fetchWeatherData } from "./services/WeatherService.js";
import { headerCityLayout } from './templates/headerCityLayout.js';
import { fetchWeeklyForecast } from "./services/ForecastService.js";
import { getWeatherIcon, getWeatherIconPath } from "./helpers/weatherIcons.js";

const searchInputField = document.querySelector("[data-search-city]");

searchInputField.addEventListener("input", function () {
    const query = searchInputField.value.trim();

    if (query.length > 3) {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        console.error(`Error ${response.status}:`, errorData);
                        throw new Error(`Network response was not ok: ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                const city = data.results?.[0]; // Get the first city from the results array
                console.log(data.results);

                if (!city) {
                    console.error("No city found.");
                    resultsContainer.innerHTML = "";
                    return;
                }

                // Define city variables based on API response
                const cityId = city.id;
                const cityName = city.name;
                const countryName = city.country;
                const timezone = city.timezone;
                const elevation = city.elevation || 'N/A'; // Use 'N/A' if elevation is missing

                // Fetch weather data for this city
                fetchWeatherData(city.latitude, city.longitude)
                .then(weatherData => {
                    console.log("Weather Data:", weatherData); // Log the entire weatherData object

                    const currentWeather = weatherData?.current_weather || {};
                    
                    const weatherCode = currentWeather?.weathercode || 'default';
                    const weatherIcon = getWeatherIcon(weatherCode); // Get the icon path

                    const dailyForecast = weatherData.daily;

                    // Format the current date and time
                    const formattedDate = new Date().toLocaleDateString();
                    const formattedTime = new Date().toLocaleTimeString();


                    // Create the city layout with all necessary data
                    const cityLayout = headerCityLayout(cityId, cityName, countryName, timezone, elevation, formattedDate, formattedTime, weatherData, dailyForecast);
                   
                    
                    const resultsContainer = document.querySelector("#resultsContainer");
                    resultsContainer.innerHTML = "";
                    
                    resultsContainer.insertAdjacentHTML('beforeend', cityLayout);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
});
