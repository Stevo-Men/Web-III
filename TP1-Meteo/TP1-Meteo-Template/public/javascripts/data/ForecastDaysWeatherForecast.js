// This API will provide the next 8 days information (temperature, weather code, windspeed, etc.).
const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=46.04178&longitude=-73.11358&forecast_days=8&timezone=auto&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,weathercode,sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant";

const sampleData = {
	"latitude": 46.04474,
	"longitude": -73.10983,
	"generationtime_ms": 1.4328956604003906,
	"utc_offset_seconds": -14400,
	"timezone": "America/Toronto",
	"timezone_abbreviation": "EDT",
	"elevation": 18.0,
	"daily_units": {
		"time": "iso8601",
		"temperature_2m_max": "°C",
		"temperature_2m_min": "°C",
		"apparent_temperature_max": "°C",
		"apparent_temperature_min": "°C",
		"weathercode": "wmo code",
		"sunrise": "iso8601",
		"sunset": "iso8601",
		"windspeed_10m_max": "km/h",
		"winddirection_10m_dominant": "°"
	},
	"daily": {
		"time": ["2023-08-25", "2023-08-26", "2023-08-27", "2023-08-28", "2023-08-29", "2023-08-30", "2023-08-31", "2023-09-01"],
		"temperature_2m_max": [17.2, 21.2, 21.3, 22.1, 22.7, 19.9, 21.0, 21.9],
		"temperature_2m_min": [14.3, 14.4, 12.9, 10.2, 11.3, 9.5, 7.7, 10.3],
		"apparent_temperature_max": [18.2, 24.4, 21.6, 22.7, 24.6, 21.1, 20.0, 20.1],
		"apparent_temperature_min": [14.1, 12.1, 11.6, 9.6, 10.9, 6.5, 3.9, 7.3],
		"weathercode": [51, 63, 51, 3, 53, 80, 1, 3],
		"sunrise": ["2023-08-25T06:04", "2023-08-26T06:05", "2023-08-27T06:06", "2023-08-28T06:08", "2023-08-29T06:09", "2023-08-30T06:10", "2023-08-31T06:11", "2023-09-01T06:13"],
		"sunset": ["2023-08-25T19:44", "2023-08-26T19:42", "2023-08-27T19:41", "2023-08-28T19:39", "2023-08-29T19:37", "2023-08-30T19:35", "2023-08-31T19:33", "2023-09-01T19:31"],
		"windspeed_10m_max": [13.8, 25.2, 20.0, 9.7, 13.6, 26.5, 14.1, 24.8],
		"winddirection_10m_dominant": [58, 354, 14, 205, 199, 332, 280, 219]
	}
}