import { fetchWeatherData } from "./services/WeatherService.js";
import { headerCityLayout } from './templates/headerCityLayout.js';
import { fetchWeeklyForecast } from "./services/ForecastService.js";
import { getWeatherIcon, getWeatherIconPath } from "./helpers/weatherIcons.js";
import { getWeatherDescription } from "./helpers/weatherCode.js";
import { showError } from "./components/ErrorMessage.js";
import { hideLoading,showLoading } from "./components/LoadingMessage.js";

const searchInputField = document.querySelector("[data-search-city]");

searchInputField.addEventListener("input", function () {
    const query = searchInputField.value.trim();

    if (query.length > 3) {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`;
        showLoading(); 
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        showError(`Error ${response.status}:`, errorData);
                        throw new Error(`Network response was not ok: ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                const city = data.results?.[0]; // Get the first city from the results array
                console.log(data.results);

                if (!city) {
                    showError('No City Found!')
                    resultsContainer.innerHTML = "";
                    return;
                }

                const formatTime = (dateTimeString) => {
                    const date = new Date(dateTimeString);
                    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }

                // Define city variables based on API response
                const cityId = city.id;
                const cityName = city.name;
                const countryName = city.country;
                const timezone = city.timezone;
                const elevation = city.elevation || 'N/A'; // Use 'N/A' if elevation is missing

                // Fetch current weather data for this city
                return fetchWeatherData(city.latitude, city.longitude) // Return the promise here
                .then(weatherData => {
                    console.log("Weather Data:", weatherData); // Log the entire weatherData object

                    
                    

                    // Fetch the 8-day weather forecast
                    return fetchWeeklyForecast(city.latitude, city.longitude).then(forecastData => {
                        console.log("8-Day Forecast Data:", forecastData); // Log the forecast data

                        

                       
                        const dailyForecast = forecastData?.daily?.time?.map((date, index) => {
                            const dailyWeatherCode = forecastData?.daily?.weathercode?.[index] || 'default';
                            return {
                                date: new Date(date).toLocaleDateString(),
                                temperature: forecastData?.daily?.temperature_2m_max?.[index] || 'N/A',
                                humidity: forecastData?.daily?.relative_humidity_2m_max?.[index] || 'N/A',
                                windspeed:forecastData?.daily?.windspeed_10m_max?.[index] || 'N/A',
                                description: getWeatherDescription(dailyWeatherCode),
                                icon: getWeatherIcon(dailyWeatherCode),
                            };
                        }) || [];
                        

                        const currentWeather = {
                            temperature: weatherData?.temperature || 'N/A',
                            humidity: forecastData?.daily?.relative_humidity_2m_max?.[0] || 'N/A',
                            windspeed: weatherData?.windspeed || 'N/A',
                            winddirection: weatherData?.winddirection || 'N/A',
                            sunrise: forecastData?.daily?.sunrise?.[0] ? formatTime(forecastData.daily.sunrise[0]) : 'N/A',
                            sunset: forecastData?.daily?.sunset?.[0] ? formatTime(forecastData.daily.sunset[0]) : 'N/A',
                            timezone: weatherData?.timezone || 'N/A',
                            elevation: elevation || 'N/A',
                           // description: getWeatherDescription(weatherCode),
                           // icon: getWeatherIcon(weatherCode),
                        };

                        const weatherCode = currentWeather?.weathercode || 'default';
                        const weatherIcon = getWeatherIcon(weatherCode); // Get the icon path

                        const formattedDate = new Date().toLocaleDateString();
                        const formattedTime = new Date().toLocaleTimeString();

                        const cityLayout = headerCityLayout(cityId, cityName, countryName, timezone, elevation, formattedDate, formattedTime, currentWeather, dailyForecast);

                        const resultsContainer = document.querySelector("#resultsContainer");
                        resultsContainer.innerHTML = "";

                        resultsContainer.insertAdjacentHTML('beforeend', cityLayout);
                        hideLoading();
                    });
                });
            })
            .catch(error => {
                showError('There was a problem with the fetch operation:', error);
            });
    }
});
