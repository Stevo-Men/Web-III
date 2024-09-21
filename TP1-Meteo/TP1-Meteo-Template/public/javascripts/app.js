import { FACTS } from "./mocks/facts.js";
import WeatherService from "./services/weatherService.js";
import FactService from "./sevices/FactService.js";
import FactTemplate from "./templates/FactTemplate.js";

const searchInputField = document.querySelector("[data-search-city]");
const container = document.querySelector("[weather-data]");

const weatherService = new WeatherService();



searchInputField.addEventListener("keyup", async (event) => {
    const query = event.target.value;
    if (!query || query.length < 3) {
        return;
    }


    const results = weatherService.searchFacts(query);

    // const url = `https://geocoding-api.open-meteo.com/v1/search?query=${query}`
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json`
    fetch(url).then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((jsonResult) => {
            container.innerHTML = FactTemplate.facts(jsonResult);
        });

    //    const response = await fetch(url);
    //    if (!response.ok) {
    //     throw new Error("Error")
    //    }


   // const results = await weatherService.searchFacts(query);
    console.log(results)
    console.log(searchInputField);
});

