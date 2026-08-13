async function getWeather() {

    // Get city entered by user
    const city = document.getElementById("cityInput").value.trim();

    // Get HTML elements
    const loading = document.getElementById("loading");
    const error = document.getElementById("error");
    const weatherCard = document.getElementById("weatherCard");

    // If city is empty
    if (city === "") {
        error.textContent = "Please enter a city name.";
        error.style.display = "block";
        weatherCard.style.display = "none";
        return;
    }

    // Show loading
    loading.style.display = "block";
    error.style.display = "none";
    weatherCard.style.display = "none";

    try {

        // Call our Node.js Express API
        const response = await fetch(
            `/weather?city=${encodeURIComponent(city)}`
        );

        // Convert response to JSON
        const data = await response.json();

        // Check for error
        if (data.error) {
            throw new Error(data.error);
        }

        // Display weather information
        document.getElementById("city").textContent =
            `${data.city}, ${data.country}`;

        document.getElementById("forecast").textContent =
            data.forecast;

        document.getElementById("temperature").textContent =
            Math.round(data.temperature);

        document.getElementById("feelsLike").textContent =
            `${Math.round(data.feelsLike)}°C`;

        document.getElementById("humidity").textContent =
            `${data.humidity}%`;

        document.getElementById("windSpeed").textContent =
            `${data.windSpeed} m/s`;

        // Show weather card
        weatherCard.style.display = "block";

    } catch (err) {

        // Display error
        error.textContent = err.message;
        error.style.display = "block";

    } finally {

        // Hide loading message
        loading.style.display = "none";
    }
}


// Allow Enter key to search

document.getElementById("cityInput").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        getWeather();
    }

});