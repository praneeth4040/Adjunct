// getWeather.js
const axios = require('axios');
require('dotenv').config();

async function getWeather(location) {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    // URL create with city name
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    const data = response.data;

    const weatherInfo = {
      city: data.name,
      country: data.sys.country,
      weatherCondition: data.weather[0].main,
      weatherDescription: data.weather[0].description,
      temperature: {
        current: data.main.temp,
        feelsLike: data.main.feels_like,
        min: data.main.temp_min,
        max: data.main.temp_max,
      },
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      clouds: data.clouds.all,
      visibility: data.visibility,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      dateTime: new Date(data.dt * 1000).toLocaleString(),
    };

    return weatherInfo;
  } catch (error) {
    console.error('❌ Error fetching weather:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = getWeather;
