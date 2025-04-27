async function getWeather(city){
    return {
        "location": city,
        "temperature": 30,
        "unit": "Celsius",
        "condition": "Sunny",
        "humidity": 60,
        "forecast": "Clear skies, no rain expected."
      }      
}

module.exports = getWeather;