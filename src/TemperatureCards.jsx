import React from 'react';
import TemperatureCard from './TemperatureCard';

function TemperatureCards({ weather }) {
  return (
    <div className="flex flex-wrap justify-between mb-8 space-y-4 md:space-y-0">
      <TemperatureCard type="range" tempMin={Math.round(weather.main.temp_min)} tempMax={Math.round(weather.main.temp_max)} />
      <TemperatureCard type="current" temp={Math.round(weather.main.temp)} location={`${weather.name}, ${weather.sys.country}`} />
      <TemperatureCard type="status" weatherCondition={weather.weather[0].main} />
    </div>
  );
}

export default TemperatureCards;
