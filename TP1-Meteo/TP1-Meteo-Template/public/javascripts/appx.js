import { fetchWeatherData } from "./services/WeatherService.js";

const searchInputField = document.querySelector("[data-search-city]");

searchInputField.addEventListener("input", function() {
    const query = searchInputField.value.trim();
    const { id, latitude, longitude, name, country, elevation } = this.city;

    // const weatherData = fetchWeatherData(latitude, longitude);
    
    // const dailyForecast = weatherData?.daily?.time?.map((date, index) => {
    //     const dailyWeatherCode = weatherData?.daily?.weathercode?.[index] || 'default';
    //     return {
    //         date: new Date(date).toLocaleDateString(),
    //         temperature: weatherData?.daily?.temperature_2m_max?.[index] || 'N/A',
    //         humidity: weatherData?.daily?.relative_humidity_2m_max?.[index] || 'N/A',
    //         windspeed: weatherData?.daily?.windspeed_10m_max?.[index] || 'N/A',
    //         description: getWeatherDescription(dailyWeatherCode),
    //         icon: getWeatherIcon(dailyWeatherCode),
    //     };
    // })

    if (query.length > 3) {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`;
        console.log('allo')

       

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        console.error(`Error ${response.status}:`, errorData);
                        throw new Error(`Network response was not ok: ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                

                const { id, latitude, longitude, name, country, elevation } = this.city;

                const resultsContainer = document.querySelector("#resultsContainer"); 
                resultsContainer.innerHTML = '';

                const cities = data.results.slice(0, 10);
                cities.forEach(city => {
                    const cityHTML = `
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
                                        <div>
                                            <h4 class="text-white fs-6 fw-bold mb-3">Daily Forecast</h4>
                                            <div class="weather-details-grid mb-2">
                                                ${dailyForecast.map(day => `
                                                <div class="rounded-2 p-3 shadow border border-1 border-dark mb-3 text-center">
                                                    <div class="d-flex justify-content-between align-items-center">
                                                        <div class="col text-center">
                                                            <h5 class="fs-6 fw-bold mb-2">${day.date}</h5>
                                                            <img class="weather-detail-icon img-fluid mx-auto mb-2" src="./public/images/${day.icon}" alt="${day.description}">
                                                            <div class="fw-bold">${day.description}</div>
                                                        </div>
                                                        <div class="col d-flex flex-column justify-content-between align-items-center">
                                                            <div class="mb-2"><i class="fa-solid fa-temperature-three-quarters"></i> ${day.temperature}°</div>
                                                            <div class="mb-2"><i class="fa-solid fa-wind"></i> ${day.windspeed} km/h</div>
                                                            <div><i class="fa-solid fa-droplet"></i> ${day.humidity}%</div>
                                                        </div>
                                                    </div>
                                                </div>`).join('')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    `;
                    resultsContainer.insertAdjacentHTML('beforeend', cityHTML);
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
});


