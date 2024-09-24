export const fetchWeeklyForecast = async (latitude, longitude) => {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&forecast_days=8&timezone=auto&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,weathercode,sunrise,sunset,windspeed_10m_max,winddirection_10m_dominant`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Error ${response.status}:`, errorData);
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching 8-day forecast:', error);
        throw error;
    }
};
