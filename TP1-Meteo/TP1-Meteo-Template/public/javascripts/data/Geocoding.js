// This API provide Geocoding information to get the latitude and longitude that will be needed to use the Weather Forecast API.
const apiUrl = "https://geocoding-api.open-meteo.com/v1/search?name=Sorel&count=10&language=fr&format=json";
const endpointDocumentation = "https://open-meteo.com/en/docs/geocoding-api#name=Sorel&language=fr";

 

const sampleResponse = {
	"results": [{
		"id": 2974198,
		"name": "Sorel",
		"latitude": 50.01667,
		"longitude": 3.05,
		"elevation": 134.0,
		"feature_code": "PPL",
		"country_code": "FR",
		"timezone": "Europe/Paris",
		"postcodes": ["80240"],
		"country_id": 3017382,
		"country": "France"
	}, {
		"id": 6151350,
		"name": "Sorel",
		"latitude": 46.04178,
		"longitude": -73.11358,
		"elevation": 13.0,
		"feature_code": "PPL",
		"country_code": "CA",
		"admin1_id": 6115047,
		"admin2_id": 6076966,
		"admin3_id": 8674017,
		"timezone": "America/Toronto",
		"population": 41629,
		"country_id": 6251999,
		"country": "Canada",
		"admin1": "Québec",
		"admin2": "Montérégie",
		"admin3": "Sorel-Tracy"
	}, {
		"id": 8955244,
		"name": "Sorelle",
		"latitude": 41.63575,
		"longitude": 13.73025,
		"elevation": 376.0,
		"feature_code": "PPL",
		"country_code": "IT",
		"admin1_id": 3174976,
		"admin3_id": 6536980,
		"timezone": "Europe/Rome",
		"population": 118,
		"country_id": 3175395,
		"country": "Italie",
		"admin1": "Latium",
		"admin3": "Casalvieri"
	}, {
		"id": 2149116,
		"name": "Sorell",
		"latitude": -42.78161,
		"longitude": 147.56267,
		"elevation": 17.0,
		"feature_code": "PPLX",
		"country_code": "AU",
		"admin1_id": 2147291,
		"admin2_id": 7839861,
		"timezone": "Australia/Hobart",
		"population": 2848,
		"country_id": 2077456,
		"country": "Australie",
		"admin1": "Tasmanie",
		"admin2": "Sorell"
	}, {
		"id": 801700,
		"name": "Sorelti",
		"latitude": 42.55444,
		"longitude": 43.49167,
		"elevation": 1054.0,
		"feature_code": "PPL",
		"country_code": "GE",
		"admin1_id": 865542,
		"timezone": "Asia/Tbilisi",
		"country_id": 614540,
		"country": "Géorgie",
		"admin1": "Racha-Lechkhumi and Kvemo Svaneti"
	}, {
		"id": 2974197,
		"name": "Sorel-Moussel",
		"latitude": 48.83391,
		"longitude": 1.36699,
		"elevation": 83.0,
		"feature_code": "PPL",
		"country_code": "FR",
		"admin1_id": 3027939,
		"admin2_id": 3019316,
		"admin3_id": 3020809,
		"admin4_id": 6612443,
		"timezone": "Europe/Paris",
		"population": 1526,
		"postcodes": ["28260"],
		"country_id": 3017382,
		"country": "France",
		"admin1": "Centre-Val de Loire",
		"admin2": "Eure-et-Loir",
		"admin3": "Dreux",
		"admin4": "Sorel-Moussel"
	}, {
		"id": 2974199,
		"name": "Sorel-en-Vimeu",
		"latitude": 50.01055,
		"longitude": 1.90786,
		"elevation": 105.0,
		"feature_code": "PPL",
		"country_code": "FR",
		"admin1_id": 11071624,
		"admin2_id": 2974304,
		"admin3_id": 3038788,
		"admin4_id": 6444753,
		"timezone": "Europe/Paris",
		"population": 192,
		"postcodes": ["80490"],
		"country_id": 3017382,
		"country": "France",
		"admin1": "Hauts-de-France",
		"admin2": "Somme",
		"admin3": "Abbeville",
		"admin4": "Sorel-en-Vimeu"
	}, {
		"id": 8005718,
		"name": "Sorelun",
		"latitude": 27.35781,
		"longitude": 87.84891,
		"elevation": 1516.0,
		"feature_code": "PPLL",
		"country_code": "NP",
		"admin1_id": 12095447,
		"admin2_id": 12095528,
		"admin3_id": 12096049,
		"timezone": "Asia/Kathmandu",
		"country_id": 1282988,
		"country": "Népal",
		"admin1": "Province 1",
		"admin2": "Taplejung",
		"admin3": "Sirijangha"
	}, {
		"id": 11747674,
		"name": "Sorell Creek",
		"latitude": -42.77679,
		"longitude": 147.11734,
		"elevation": 14.0,
		"feature_code": "PPLL",
		"country_code": "AU",
		"admin1_id": 2147291,
		"admin2_id": 7839357,
		"timezone": "Australia/Hobart",
		"population": 87,
		"country_id": 2077456,
		"country": "Australie",
		"admin1": "Tasmanie",
		"admin2": "Derwent Valley"
	}],
	"generationtime_ms": 1.2199879
};

export default api;