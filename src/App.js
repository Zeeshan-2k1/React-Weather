import React, { useState } from 'react';

import { fetchWeatherByCity, fetchWeatherByCoords } from './api/fetchWeather';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  if (window.navigator.geolocation) {
    const location = window.navigator.geolocation;
    location.getCurrentPosition(async (p) => {
      const lat = p.coords.latitude;
      const lon = p.coords.longitude;

      const data = await fetchWeatherByCoords(lat, lon);

      setWeather(data);
    });
  }

  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeatherByCity(query);

      setWeather(data);
      setQuery('');
    }
  };

  return (
    <div className="main-container">
      <h1>Get Weather Detail</h1>
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
            <p>
              <u>Pressure:</u> <b>{weather.main.pressure}</b>
              <br />
              <br />
              <u>Wind Speed:</u> <b>{weather.wind.speed} </b>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
