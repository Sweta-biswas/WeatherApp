import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaWind, FaSun, FaTint } from 'react-icons/fa';
import { createApi } from 'unsplash-js';
import rainVideo from './assets/Rain.mp4';
import Header from './Header';
import SearchBar from './SearchBar';
import TemperatureCards from './TemperatureCards';
import CityImage from './CityImage';
import WeatherInfoCard from './WeatherInfoCard';

const API_KEY = 'd722a857cf87978954e76a0d2b9c8a2c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const UNSPLASH_ACCESS_KEY = 'bwLHoXH9V997J8-Ee_vTuGKLBcKOQx_Yzy6EJEXkgTQ';

const unsplash = createApi({
  accessKey: UNSPLASH_ACCESS_KEY,
});

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('New York');
  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [cityImage, setCityImage] = useState('');
  const [isRain, setIsRain] = useState(false);

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/weather?q=${cityName}&units=metric&appid=${API_KEY}`);
      const weatherCondition = response.data.weather[0].main.toLowerCase();
      setWeather(response.data);
      setBackgroundImage(getBackgroundImage(response.data));
      fetchCityImage(cityName);

      if (weatherCondition === 'rain') {
        setIsRain(true);
      } else {
        setIsRain(false);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    setLoading(false);
  };

  const fetchCityImage = async (cityName) => {
    try {
      const response = await unsplash.search.getPhotos({ query: cityName, perPage: 1 });
      if (response.response.results.length > 0) {
        setCityImage(response.response.results[0].urls.regular);
      } else {
        setCityImage('');
      }
    } catch (error) {
      console.error('Error fetching city image:', error);
      setCityImage('');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  const isWinter = (temperature) => {
    return temperature <= 10;
  };

  const getBackgroundImage = (weatherData) => {
    const weatherCondition = weatherData.weather[0].main.toLowerCase();
    const temperature = weatherData.main.temp;

    if (isWinter(temperature)) {
      return "url('https://i.pinimg.com/originals/41/9e/97/419e974e5b946cc9854be1d8d3ec8513.gif')";
    }

    switch (weatherCondition) {
      case 'drizzle':
        return "url('https://i.pinimg.com/originals/99/3f/fd/993ffdb32512869802c79cf3627828ff.gif')";
      case 'thunderstorm':
        return "url('https://24.media.tumblr.com/tumblr_m9xzvj3S6L1r4zr2vo1_r1_500.gif')";
      case 'clear':
        return "url('https://i.pinimg.com/originals/7c/d8/90/7cd8909e564eea6c47897f526973e6bc.gif')";
      case 'fog':
      case 'mist':
        return "url('https://i.pinimg.com/originals/03/53/cd/0353cdf9b3b43ea8e16506cde3ec94ef.gif')";
      default:
        return "url('https://i.makeagif.com/media/2-14-2018/Urn-62.gif')";
    }
  };

  if (loading) return <div className="text-white text-center">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center transition-all duration-500 ease-in-out" style={{ backgroundImage: !isRain ? backgroundImage : 'none' }}>
      {isRain && (
        <video autoPlay loop muted className="absolute w-full h-full object-cover">
          <source src={rainVideo} type="video/mp4" />
        </video>
      )}
      <div className="relative max-w-4xl w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl p-8 text-white shadow-lg">
        <Header />
        <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
        {weather && (
          <>
            <TemperatureCards weather={weather} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <CityImage city={weather.name} country={weather.sys.country} cityImage={cityImage} />
              <div className="grid grid-rows-3 gap-4">
                <WeatherInfoCard title="Wind" icon={<FaWind />} value={`${weather.wind.speed} m/s`} />
                <WeatherInfoCard title="Sunrise" icon={<FaSun />} value={new Date(weather.sys.sunrise * 1000).toLocaleTimeString()} />
                <WeatherInfoCard title="Humidity" icon={<FaTint />} value={`${weather.main.humidity}%`} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
