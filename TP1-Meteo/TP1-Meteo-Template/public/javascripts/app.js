const searchInputField = document.querySelector("[data-search-city]");

searchInputField.addEventListener("input", function() {
    const query = searchInputField.value.trim();
    
    if (query.length > 3) {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}`;
        
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
                // Clear previous results
                const resultsContainer = document.querySelector("#resultsContainer"); // Ensure you have this element in your HTML
                resultsContainer.innerHTML = '';

                // Loop through the first 10 cities and create HTML
                const cities = data.results.slice(0, 10); // Adjust based on your data structure
                cities.forEach(city => {
                    const cityHTML = `
                        <div data-collapse-${city.id} class="accordion-collapse collapse" data-bs-parent="[data-accordion]">
                            <div class="weather accordion-body text-start">
                                <div>
                                    <div>
                                        <h4 class="text-white fs-6 fw-bold">Current local date and time</h4>
                                        <div>${new Date().toLocaleString()}</div> <!-- Current local date and time -->
                                    </div>
                                    <hr class="border-white">
                                    <div>
                                        <h4 class="text-white fs-6 fw-bold">Current conditions</h4>
                                        <div class="d-flex justify-content-between gap-2 flex-wrap">
                                            <div class="row flex-wrap">
                                                <div class="col">
                                                    <img class="weather-icon" src="../public/images/cloudy.svg" alt="Overcast">
                                                </div>
                                                <div class="col">
                                                    <div>Overcast</div>
                                                    <div class="fs-1 fw-bold">13°</div>
                                                </div>
                                            </div>
                                            <div class="weather-grid">
                                                <div>
                                                    <i class="fa-solid fa-temperature-three-quarters"></i>
                                                    <span>12.9°</span>
                                                </div>
                                                <div>
                                                    <i class="fa-solid fa-droplet"></i>
                                                    <span>98%</span>
                                                </div>
                                                <div>
                                                    <i class="fa-solid fa-wind"></i>
                                                    <span>12.9 km/h</span>
                                                </div>
                                                <div>
                                                    <i class="fa-solid fa-compass"></i>
                                                    <span>SSW</span>
                                                </div>
                                                <div>
                                                    <span class="d-flex gap-1 align-items-center">
                                                        <span class="d-flex flex-column">
                                                            <i class="fa-solid fa-chevron-up"></i>
                                                            <i class="fa-solid fa-sun"></i>
                                                        </span>
                                                        <span>08:28</span>
                                                    </span>
                                                </div>
                                                <div>
                                                    <span class="d-flex gap-1 align-items-center">
                                                        <span class="d-flex flex-column">
                                                            <i class="fa-solid fa-chevron-down"></i>
                                                            <i class="fa-solid fa-sun"></i>
                                                        </span>
                                                        <span>18:34</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr class="border-white">
                                <div>
                                    <div>
                                        <h4 class="text-white fs-6 fw-bold mb-3">Daily Forecast</h4>
                                        <div class="weather-details-grid mb-2">
                                            ${generateForecastHTML()} <!-- Call to a function to generate forecast HTML -->
                                        </div>
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

// Function to generate forecast HTML (dummy data for demonstration)
function generateForecastHTML() {
    let forecastHTML = '';
    const days = ["Today", "Tomorrow", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const temperatures = ["14.3°", "14°", "15.4°", "13.3°", "12.8°", "12.3°", "13.7°", "10.7°"];
    const winds = ["25.9 km/h", "36.1 km/h", "35.8 km/h", "21.1 km/h", "25.6 km/h", "27.2 km/h", "48.3 km/h", "49.2 km/h"];
    const humidities = ["89%", "87%", "85%", "88%", "91%", "90%", "82%", "76%"];
    
    for (let i = 0; i < days.length; i++) {
        forecastHTML += `
            <div class="rounded-2 p-3 shadow border border-1 border-dark">
                <div class="row flex-wrap">
                    <div class="col mt-2">
                        <h5 class="fs-6 fw-bold mb-0">${days[i]}</h5>
                        <div class="mb-3"><small>${new Date(Date.now() + i * 24 * 60 * 60 * 1000).toLocaleDateString()}</small></div>
                        <img class="weather-detail-icon" src="../public/images/rainy.svg" alt="Rain: Slight intensity">
                        <div class="fw-bold mb-2">Rain: Slight intensity</div>
                    </div>
                    <div class="col mt-2">
                        <div class="mb-3">
                            <i class="fa-solid fa-temperature-three-quarters"></i>
                            <span>${temperatures[i]}</span>
                        </div>
                        <div class="mb-3">
                            <i class="fa-solid fa-wind"></i>
                            <span>${winds[i]}</span>
                        </div>
                        <div>
                            <i class="fa-solid fa-droplet"></i>
                            <span>${humidities[i]}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    return forecastHTML;
}
