import { fetchWeatherData } from "./services/WeatherService.js";
import { headerCityLayout } from './templates/headerCityLayout.js';
import { fetchWeeklyForecast } from "./services/ForecastService.js";
import { hideLoading, showLoading, showError } from "./components/StateMessage.js";
import { getGeocodingAPIUrl } from "./data/APIGetter.js";
import { debounce } from "./helpers/debounce.js";
import { createCurrentWeather, createDailyForecast } from "./templates/DataBlockBuilder.js";

const resultsContainer = document.querySelector("#resultsContainer");
const searchInputField = document.querySelector("[data-search-city]");

searchInputField.addEventListener("input", debounce(handleCitySearch, 500));


async function handleCitySearch() {
    const query = searchInputField.value.trim();
    if (query.length <= 3) return;

    const url = getGeocodingAPIUrl(query);
    showLoading();

    try {
        const cities = await fetchCities(url);
        if (!cities || cities.length === 0) {
            showError('No City Found!');
            clearResults();
            hideLoading();
            return;
        }

        clearResults();
        for (const city of cities) {
            await displayCityWeather(city);
        }

    } catch (error) {
        handleError('There was a problem with the geocoding fetch operation.', error);
    } finally {
        hideLoading();
    }
}


async function fetchCities(url) {
    const response = await fetch(url);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData}`);
    }
    const data = await response.json();
    return data.results;
}


async function displayCityWeather(city) {
    const { id: cityId, name: cityName, country, timezone, elevation = 'N/A', latitude, longitude } = city;
    console.log(`Fetching weather data for ${cityName}`);

    try {
        const weatherData = await fetchWeatherData(latitude, longitude);
        if (!weatherData) throw new Error('Invalid or empty weather data');

        const forecastData = await fetchWeeklyForecast(latitude, longitude);
        if (!forecastData) throw new Error('Invalid or empty forecast data');

        const dailyForecast = createDailyForecast(forecastData);
        const currentWeather = createCurrentWeather(weatherData, forecastData, elevation);
        updateUIWithWeatherData({ currentWeather, dailyForecast, cityId, cityName, country, timezone, elevation });

    } catch (error) {
        handleError(`Error fetching weather data for ${cityName}: ${error.message}`, error);
    }
}




function updateUIWithWeatherData({ currentWeather, dailyForecast, cityId, cityName, country, timezone, elevation }) {
    const formattedDate = new Date().toLocaleDateString();
    const formattedTime = new Date().toLocaleTimeString();

    const cityLayout = headerCityLayout(cityId, cityName, country, timezone, elevation, formattedDate, formattedTime, currentWeather, dailyForecast);
    resultsContainer.insertAdjacentHTML('beforeend', cityLayout);
}


function clearResults() {
    resultsContainer.innerHTML = "";
}


function handleError(message, error) {
    showError(message);
    console.error(message, error);
}
