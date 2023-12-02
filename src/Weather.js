// src/Weather.js
import React, { useState } from 'react';


const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    const apiKey = '12fe44fa2c067df75064ffb39b27b38c';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError(null);
      } else {
        setError(`Error: ${data.message}`);
        setWeatherData(null);
      }
    } catch (error) {
      setError(`Error fetching weather data: ${error.message}`);
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-container">
      <div className="background"></div>
      <div className="content">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>

        {error && <p className="error">{error}</p>}

        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp} °C</p>
            <p>Description: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
