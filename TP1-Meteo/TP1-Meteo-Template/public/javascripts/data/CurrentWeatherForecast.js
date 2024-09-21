// This API will provide current weather only. Although, this is mostly for reference and I don`t think this is required 
// since the ForecastDays API provide the current day + the 7 next days as arrays.
const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=46.04178&longitude=-73.11358&current_weather=true";

const sampleData = {
	"latitude": 46.04474,
	"longitude": -73.10983,
	"generationtime_ms": 1.055002212524414,
	"utc_offset_seconds": -14400,
	"timezone": "America/Toronto",
	"timezone_abbreviation": "EDT",
	"elevation": 18.0,
	"current_weather": {
		"temperature": 15.4,
		"windspeed": 9.0,
		"winddirection": 53,
		"weathercode": 3,
		"is_day": 1,
		"time": "2023-08-25T12:00"
	}
}