// Import required modules
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Serve frontend files from the public folder
app.use(express.static('public'));


// --------------------------------------------------
// Function to get weather information
// --------------------------------------------------

async function getWeather(city) {

    try {

        // OpenWeatherMap API URL
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_KEY}&units=metric`;

        // Call weather API
        const response = await fetch(url);

        // Convert response to JSON
        const data = await response.json();

        // Check for API errors
        if (!response.ok) {
            throw new Error(data.message || "Unable to get weather data");
        }

        // Return required weather information
        return {
            city: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            forecast: data.weather[0].description,
            windSpeed: data.wind.speed
        };

    } catch (error) {

        // Return error information
        return {
            error: error.message
        };
    }
}


// --------------------------------------------------
// Weather API route
// --------------------------------------------------

app.get('/weather', async (req, res) => {

    // Get city from query parameter
    // Bengaluru is the default city
    const city = req.query.city || "Bengaluru";

    // Get weather information
    const weatherData = await getWeather(city);

    // Send weather data as JSON
    res.json(weatherData);
});


// --------------------------------------------------
// Start server
// --------------------------------------------------

app.listen(3000, () => {

    console.log("Weather server is running on port 3000");

});