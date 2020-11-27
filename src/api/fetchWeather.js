import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'fd38cc478408816ca8c4dacc320aad0c';

export const fetchWeatherByCity = async (query) => {
  const { data } = await axios.get(URL, {
    params: {
      q: query,
      units: 'metric',
      APPID: API_KEY,
    },
  });

  return data;
};

export const fetchWeatherByCoords = async (lat, lon) => {
  const { data } = await axios.get(URL, {
    params: {
      lat: lat,
      lon: lon,
      units: 'metric',
      APPID: API_KEY,
    },
  });

  return data;
};
