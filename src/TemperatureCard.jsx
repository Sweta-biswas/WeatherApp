import React from 'react';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm, WiFog } from 'react-icons/wi';

function TemperatureCard({ type, temp, location, tempMin, tempMax, weatherCondition }) {
  let content;
  let cardClass = "bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-4 text-center flex-1 mx-2";

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear': return <WiDaySunny className="text-5xl mx-auto" />;
      case 'rain': return <WiRain className="text-5xl mx-auto" />;
      case 'snow': return <WiSnow className="text-5xl mx-auto" />;
      case 'clouds': return <WiCloudy className="text-5xl mx-auto" />;
      case 'thunderstorm': return <WiThunderstorm className="text-5xl mx-auto" />;
      case 'mist':
      case 'fog': return <WiFog className="text-5xl mx-auto" />;
      default: return <WiDaySunny className="text-5xl mx-auto" />;
    }
  };

  switch (type) {
    case 'range':
      content = (
        <>
          <div className="text-xl font-bold">Temp Range</div>
          <div className="text-2xl">{tempMin}°C - {tempMax}°C</div>
        </>
      );
      break;
    case 'current':
      content = (
        <>
          <div className="text-4xl font-bold">{temp}°C</div>
          {location && <div className="mt-2 text-sm">{location}</div>}
        </>
      );
      cardClass += " transform scale-110 z-10";
      break;
    case 'status':
      content = (
        <>
          {getWeatherIcon(weatherCondition)}
          <div className="text-xl font-bold mt-2">{weatherCondition}</div>
        </>
      );
      break;
    default:
      content = null;
  }

  return (
    <div className={cardClass}>
      {content}
    </div>
  );
}

export default TemperatureCard;
