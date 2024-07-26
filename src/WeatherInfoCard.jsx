import React from 'react';

function WeatherInfoCard({ title, icon, value }) {
  return (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl p-4">
      <div className="flex items-center mb-2">
        {icon}
        <h3 className="ml-2 font-bold">{title}</h3>
      </div>
      <p>{value}</p>
    </div>
  );
}

export default WeatherInfoCard;
