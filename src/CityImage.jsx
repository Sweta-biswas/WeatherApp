import React from 'react';

function CityImage({ city, country, cityImage }) {
  return (
    <div className="relative h-48 md:h-auto rounded-xl overflow-hidden">
      {cityImage ? (
        <img
          src={cityImage}
          alt={`${city}, ${country}`}
          className="w-full h-full object-cover"
          style={{ maxHeight: '236px' }}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-800">
          No image available
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-40">
        <h3 className="text-xl font-bold">{`${city}, ${country}`}</h3>
      </div>
    </div>
  );
}

export default CityImage;
