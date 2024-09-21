const apiUrl = "https://geocoding-api.open-meteo.com/v1/search?name=Sorel&count=10&language=fr&format=json";

const api = {
  get: async () => {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET'
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
};

async function main() {
  try {
    const data = await api.get();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();