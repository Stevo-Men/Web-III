export default class WeatherService {

    async searchWeather(query) {
        const cacheKey = `searchWeather_${query}`;
        const cachedItem = getItem(cacheKey);

        if (cachedItem) { // Fix here: check for cached data, not cacheKey
            return cachedItem;
        }

        const url = `https://geocoding-api.open-meteo.com/v1/search?query=${query}`;
        console.log(`API`);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("API Error");
        }

        const json = await response.json();
        setItem(cacheKey, json.result, 60_000); // Caching for 60 seconds
        return json.result;
    }
}

function setItem(key, value, ttl) {
    const item = {
        value, 
        expiry: new Date().getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getItem(key) {
    const itemAsString = localStorage.getItem(key);
    if (!itemAsString) {
        return null;
    }

    const item = JSON.parse(itemAsString);

    if (item.expiry < new Date().getTime()) {
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
}
