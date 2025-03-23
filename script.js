// Fetch real-time weather data
async function fetchWeather() {
    const apiKey = "0d46cbe5f2646ff71379e0e103fbe0bf"; // Replace with actual API key
    const city = "Bhopal"; // Change based on user location

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        document.getElementById("weather-data").textContent = `${data.main.temp}°C, ${data.weather[0].description}`;
    } catch (error) {
        document.getElementById("weather-data").textContent = "Failed to load";
    }
}

fetchWeather();
