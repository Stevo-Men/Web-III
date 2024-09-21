import { FACTS } from "../mocks/facts.js"

export default class FactService {
    searchMockFacts(query) {
        const filteredResults = [];
    for (const fact of FACTS) {
       if (fact.value.includes(query)) {
        filteredResults.push(fact);
       }
    }
    return filteredResults;
    }

    searchFacts(query) {
        
    }

    async searchFacts(query) {
        const cacheKey = `searchFacts_${query}`;
        const cachedItem = getItem(cacheKey);
        if (cacheKey) {
            return cachedItem;
        }

        const url = `https://mapi.cegeplabs.qc.ca/web/jokes/search?query=${query}`;
        console.log(`API`)

        const response = await fetch(url);
        if (!response.ok) {
         throw new Error("API Error")
        }
    
    
        const json = await response.json();
        setItem(cacheKey, json.result, 60_000)
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

const value = localStorage.getItem("key");