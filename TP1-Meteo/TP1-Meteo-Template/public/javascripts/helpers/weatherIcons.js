const iconMap = new Map([
    [0, 'day.svg'],
    [1, 'cloudy.svg'],
    [2, 'cloudy.svg'],
    [3, 'cloudy.svg'],
    [45, 'fog.png'],
    [48, 'fog.png'],
    [51, 'rainy.svg'],
    [53, 'rainy.svg'],
    [55, 'rainy.svg'],
    [56, 'rainy.svg'],
    [57, 'rainy.svg'],
    [61, 'rainy.svg'],
    [63, 'rainy.svg'],
    [65, 'rainy.svg'],
    [66, 'rainy.svg'],
    [67, 'rainy.svg'],
    [71, 'snowy.svg'],
    [73, 'snowy.svg'],
    [75, 'snowy.svg'],
    [77, 'snowy.svg'],
    [80, 'rainy.svg'],
    [81, 'rainy.svg'],
    [82, 'rainy.svg'],
    [85, 'snowy.svg'],
    [86, 'snowy.svg'],
    [95, 'thunder.svg'],
    [96, 'thunder.svg'],
    [99, 'thunder.svg'],
]);

export function getWeatherIcon(weatherCode) {
    return iconMap.get(weatherCode) || 'weather-logo.png';
}


export function getWeatherIconPath(weatherCode) {
    const basePath = './public/images/';
    return basePath + getWeatherIcon(weatherCode);
}
