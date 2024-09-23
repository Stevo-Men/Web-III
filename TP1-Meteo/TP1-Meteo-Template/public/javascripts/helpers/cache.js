export function cacheWeatherData(city, data) {
    const cache = { timestamp: Date.now(), data };
    localStorage.setItem(city, JSON.stringify(cache));
}

export function getCachedWeatherData(city) {
    const cached = JSON.parse(localStorage.getItem(city));
    if (cached && (Date.now() - cached.timestamp) < 300000) {
        return cached.data;
    }
    return null;
}

export function clearCityCache(city) {
    localStorage.removeItem(city);
}

export function clearAllCaches() {
    localStorage.clear();
}

export function isCacheExpired(city) {
    const cached = JSON.parse(localStorage.getItem(city));
    if (cached && (Date.now() - cached.timestamp) >= 300000) {
        return true;
    }
    return false;
}