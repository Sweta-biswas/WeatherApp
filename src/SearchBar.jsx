import React from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ city, setCity, handleSearch }) {
  return (
    <form onSubmit={handleSearch} className="mb-8">
      <h2 className="text-3xl font-bold mb-4">Discover the weather in every city you go</h2>
      <div className="relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city"
          className="w-full py-3 px-4 rounded-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <FaSearch className="text-gray-300" />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
