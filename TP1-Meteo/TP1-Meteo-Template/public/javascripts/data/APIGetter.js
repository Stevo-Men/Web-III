export function getGeocodingAPIUrl(query) {
  return `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`;
}