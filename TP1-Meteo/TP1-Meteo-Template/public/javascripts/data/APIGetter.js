import { cacheWeatherData, cacheWeatherData } from "../helpers/cache";




export function getGeocodingAPIUrl(query) {
  return `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`;
}