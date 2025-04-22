const express = require('express');
const router = express.Router();
const axios = require('axios');


const weatherApiKey = process.env.WEATHER_API_KEY;
router.get('/get', async (req, res) => {
    const {city} = req.body;
    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }
    try {
        const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
            params: {
              key: weatherApiKey,
              q: city
            }
          });
        const weatherData = response.data;
        console.log('Weather data:', weatherData);
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

module.exports = router;