export function headerCityLayout(cityId, cityName, countryName, timezone, elevation, formattedDate, formattedTime, currentWeather, dailyForecast) {
    return `
        <div class="accordion-item">
            <header class="accordion-header wrap-words">
                <button class="accordion-button collapsed text-center" data-bs-toggle="collapse" data-bs-target="#collapse-${cityId}">
                    <div class="d-flex flex-column w-100 text-center justify-content-center">
                        <h2 class="fs-5 fw-bold">
                            <i class="fa-solid fa-location-dot me-2 text-primary"></i>${cityName}, ${countryName}
                        </h2>
                        <h3 class="fs-6 country w-100">Timezone: ${timezone}</h3>
                        <h3 class="fs-6 country w-100">Elevation: ${elevation}m</h3>
                    </div>
                </button>
            </header>

            <div id="collapse-${cityId}" class="accordion-collapse collapse">
                <div class="weather accordion-body text-center">
                    <!-- Current date and time -->
                    <div class="mb-4">
                        <h4 class="text-white fs-6 fw-bold">Current local date and time</h4>
                        <div class="mt-2">
                            <div class="current-date mb-2">${formattedDate}</div>
                            <div class="current-time">${formattedTime}</div>
                        </div>
                    </div>

                    <hr class="border-white">
                    <!-- Current weather conditions -->
                    <div class="mb-4">
                        <h4 class="text-white fs-6 fw-bold">Current conditions</h4>
                        <div class="d-flex justify-content-around align-items-center flex-wrap">
                            <div class="row w-100 mb-3 justify-content-center align-items-center">
                                <div class="row d-flex justify-content-center align-items-center">
                                    <img class="weather-icon img-fluid" src="./public/images/${currentWeather.icon}" alt="${currentWeather.description}" style="max-width: 100px;">
                                </div>
                                <div class="col">
                                    <div class="mb-2">${currentWeather.description}</div>
                                    <div class="fw-bold" style="font-size: 3rem; margin-left: 1rem;">${currentWeather.temperature}°</div>
                                </div>
                            </div>
                            <div class="weather-grid w-100">
                                <div><i class="fa-solid fa-temperature-three-quarters"></i> ${currentWeather.temperature}°</div>
                                <div><i class="fa-solid fa-droplet"></i> ${currentWeather.humidity}%</div>
                                <div><i class="fa-solid fa-wind"></i> ${currentWeather.windspeed} km/h</div>
                                <div><i class="fa-solid fa-compass"></i> ${currentWeather.winddirection}</div>
                                <div>
                                    <span class="d-flex justify-content-center align-items-center gap-1">
                                        <span class="d-flex flex-column text-center">
                                            <i class="fa-solid fa-chevron-up"></i>
                                            <i class="fa-solid fa-sun"></i>
                                        </span>
                                        <span>${currentWeather.sunrise}</span>
                                    </span>
                                </div>
                                <div>
                                    <span class="d-flex justify-content-center align-items-center gap-1">
                                        <span class="d-flex flex-column text-center">
                                            <i class="fa-solid fa-chevron-down"></i>
                                            <i class="fa-solid fa-sun"></i>
                                        </span>
                                        <span>${currentWeather.sunset}</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="border-white">
                    <!-- Daily forecast -->
                    
                </div>
            </div>
        </div>
    `;
}
