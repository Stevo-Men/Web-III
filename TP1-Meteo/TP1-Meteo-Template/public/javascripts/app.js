import { fetchWeatherData } from "./services/WeatherService.js";
import { headerCityLayout } from './templates/headerCityLayout.js';
import { fetchWeeklyForecast } from "./services/ForecastService.js";
import { getWeatherIcon, getWeatherIconPath } from "./helpers/weatherIcons.js";
import { getWeatherDescription } from "./helpers/weatherCode.js";
import { hideLoading,showLoading,showError } from "./components/StateMessage.js";
import { getGeocodingAPIUrl } from "./data/APIGetter.js";
import { debounce } from "./helpers/debounce.js";

const searchInputField = document.querySelector("[data-search-city]");



searchInputField.addEventListener("input", debounce(function () {
    const query = searchInputField.value.trim();
    const formatTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    if (query.length > 3) {
        const url = getGeocodingAPIUrl(query);
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
                const cities = data.results; 
                console.log(cities);

                if (!cities || cities.length === 0) {
                    showError('No City Found!');
                    const resultsContainer = document.querySelector("#resultsContainer");
                    resultsContainer.innerHTML = "";
                    hideLoading();
                    return;
                }


                const resultsContainer = document.querySelector("#resultsContainer");
                resultsContainer.innerHTML = ""; 


                cities.forEach(city => {
                    const cityId = city.id;
                    const cityName = city.name;
                    const countryName = city.country;
                    const timezone = city.timezone;
                    const elevation = city.elevation || 'N/A';

                    console.log(`Fetching weather data for ${cityName} (Lat: ${city.latitude}, Lon: ${city.longitude})`);


                    fetchWeatherData(city.latitude, city.longitude)
                        .then(weatherData => {
                            console.log(`Weather data for ${cityName}:`, weatherData);

                            if (!weatherData || Object.keys(weatherData).length === 0) {
                                throw new Error('Invalid or empty weather data');
                            }

                            return fetchWeeklyForecast(city.latitude, city.longitude)
                                .then(forecastData => {
                                    console.log(`8-Day Forecast for ${cityName}:`, forecastData);

                                    if (!forecastData || Object.keys(forecastData).length === 0) {
                                        throw new Error('Invalid or empty forecast data');
                                    }

                                    const dailyForecast = forecastData?.daily?.time?.map((date, index) => {
                                        const dailyWeatherCode = forecastData?.daily?.weathercode?.[index] || 'default';
                                        return {
                                            date: new Date(date).toLocaleDateString(),
                                            temperature: forecastData?.daily?.temperature_2m_max?.[index] || 'N/A',
                                            humidity: forecastData?.daily?.relative_humidity_2m_max?.[index] || 'N/A',
                                            windspeed: forecastData?.daily?.windspeed_10m_max?.[index] || 'N/A',
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
                                    };

                                    const formattedDate = new Date().toLocaleDateString();
                                    const formattedTime = new Date().toLocaleTimeString();

                                    const cityLayout = headerCityLayout(cityId, cityName, countryName, timezone, elevation, formattedDate, formattedTime, currentWeather, dailyForecast);

                                    resultsContainer.insertAdjacentHTML('beforeend', cityLayout);
                                    hideLoading();
                                });
                        })
                        .catch(error => {
                            showError(`Error fetching weather data for ${cityName}: ${error.message}`);
                            hideLoading();
                        });
                });
            })
            .catch(error => {
                showError('There was a problem with the geocoding fetch operation.');
                hideLoading();
            });
    }
}, 300));  





function updateUIWithWeatherData({ currentWeather, dailyForecast, cityId, cityName, countryName, timezone, elevation }) {
    const formattedDate = new Date().toLocaleDateString();
    const formattedTime = new Date().toLocaleTimeString();

    const cityLayout = headerCityLayout(cityId, cityName, countryName, timezone, elevation, formattedDate, formattedTime, currentWeather, dailyForecast);

    const resultsContainer = document.querySelector("#resultsContainer");
    resultsContainer.innerHTML = ""; 
    resultsContainer.insertAdjacentHTML('beforeend', cityLayout);
}