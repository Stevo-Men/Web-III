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

                const resultsContainer = document.querySelector("#resultsContainer"); 
                resultsContainer.innerHTML = '';

                const cities = data.results.slice(0, 10);
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
                                        ${city.country}
                                    </h3>
                                </div>
                            </button>
                        </header>
                    `;
                    resultsContainer.insertAdjacentHTML('beforeend', cityHTML);
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }
});
