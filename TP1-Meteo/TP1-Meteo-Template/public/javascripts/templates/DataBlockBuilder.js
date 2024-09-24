import { getWeatherIcon } from "../helpers/weatherIcons.js";
import { getWeatherDescription } from "../helpers/weatherCode.js";


export function createDailyForecast(forecastData) {
    return forecastData.daily.time.map((date, index) => {
        const weatherCode = forecastData.daily.weathercode?.[index] || 'default';
        return {
            date: new Date(date).toLocaleDateString(),
            temperature: forecastData.daily.temperature_2m_max?.[index] || 'N/A',
            humidity: forecastData.daily.relative_humidity_2m_max?.[index] || 'N/A',
            windspeed: forecastData.daily.windspeed_10m_max?.[index] || 'N/A',
            description: getWeatherDescription(weatherCode),
            icon: getWeatherIcon(weatherCode),
        };
    });
}


export function createCurrentWeather(weatherData, forecastData, elevation) {
    const formatTime = dateTimeString => new Date(dateTimeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return {
        temperature: weatherData.temperature || 'N/A',
        humidity: forecastData.daily.relative_humidity_2m_max?.[0] || 'N/A',
        windspeed: weatherData.windspeed || 'N/A',
        winddirection: weatherData.winddirection || 'N/A',
        sunrise: forecastData.daily.sunrise?.[0] ? formatTime(forecastData.daily.sunrise[0]) : 'N/A',
        sunset: forecastData.daily.sunset?.[0] ? formatTime(forecastData.daily.sunset[0]) : 'N/A',
        timezone: weatherData.timezone || 'N/A',
        elevation,
    };
}