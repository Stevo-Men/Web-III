export async function fetchWeatherData(latitude, longitude) {
    // Construct the API URL
    const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&forecast_days=8&timezone=auto&daily=temperature_2m_max,temperature_2m_min,weathercode,sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant,relative_humidity_2m_max,relative_humidity_2m_min`;

    try {
        const response = await fetch(weatherApiUrl);
        
        // Check if the response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Weather API Response:", data); // Log the API response

        // Check if current weather data is available
        if (!data.current_weather) {
            throw new Error("Current weather data is not available.");
        }

        // Extract the current weather data
        const { current_weather } = data;

        // Optionally log or return specific properties
        console.log("Current Weather:", current_weather);

        return current_weather; // Return the current weather data

    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Re-throw the error for further handling
    }
}
