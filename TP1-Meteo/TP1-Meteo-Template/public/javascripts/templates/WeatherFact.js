

// cityInjector.js

export function injectCities(cities, containerId) {
    const resultsContainer = document.querySelector(`#${containerId}`);
    resultsContainer.innerHTML = ''; // Clear previous results

    cities.forEach(city => {
        const cityHTML = `
            <header class="accordion-header wrap-words">
                <button class="accordion-button collapsed" data-bs-toggle="collapse"
                    data-bs-target="[data-collapse-2974198]">
                    <div class="d-flex flex-column">
                        <h2 class="fs-5 fw-bold">
                            <i class="fa-solid fa-location-dot me-2 text-primary"></i>${city.name}
                        </h2>
                        <h3 class="fs-6 country">
                            ${city.country} <!-- Adjust according to your API response -->
                        </h3>
                    </div>
                </button>
            </header>
        `;
        resultsContainer.insertAdjacentHTML('beforeend', cityHTML);
    });
}

