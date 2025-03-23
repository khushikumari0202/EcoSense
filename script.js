// Fetch real-time weather data
async function fetchWeather() {
    const apiKey = "0d46cbe5f2646ff71379e0e103fbe0bf"; // API key
    const city = "Bhopal"; // Change based on user location

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        document.getElementById("weather-data").textContent = `${data.main.temp}°C, ${data.weather[0].description}`;
    } catch (error) {
        document.getElementById("weather-data").textContent = "Failed to load";
    }
}

// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    fetchWeather();
});

document.addEventListener("DOMContentLoaded", () => {
    const roomsContainer = document.getElementById("rooms-container");

    function loadRooms() {
        let rooms = JSON.parse(localStorage.getItem("rooms")) || [];
        roomsContainer.innerHTML = "";

        if (rooms.length === 0) {
            roomsContainer.innerHTML = "<p>No rooms added yet.</p>";
            return;
        }

        rooms.forEach(room => {
            const roomDiv = document.createElement("div");
            roomDiv.classList.add("room-card");
            roomDiv.textContent = room;
            roomDiv.addEventListener("click", () => {
                sessionStorage.setItem("currentRoom", room); // Store room name
                window.location.href = "room.html"; // Open room page
            });

            roomsContainer.appendChild(roomDiv);
        });
    }

    loadRooms();
});


