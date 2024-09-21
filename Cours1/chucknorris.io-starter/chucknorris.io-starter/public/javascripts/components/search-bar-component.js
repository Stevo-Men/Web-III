
import FactService from "../sevices/FactService.js";
import FactTemplate from "../templates/FactTemplate.js";

const searchInputField = document.querySelector("[data-search-facts]");
const container = document.querySelector("[data-facts]");

const factService = new FactService();

export function initSearchBarComponent(maxQueryLength = 3) {
    searchInputField.addEventListener("keyup", async (event) => {
        const query = event.target.value;
        if (!query || query.length < maxQueryLength) {
            return;
        }
      
            // factService.searchFacts(query)
            //     .then((results) => {
            //     const factTemplate = new FactTemplate();
            // });
            
          
            const results = await factService.searchFacts(query);
            container.innerHTML = FactTemplate.facts(results);
            console.log(results);
    });
}



