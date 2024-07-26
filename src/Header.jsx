import React from 'react';

function Header() {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Weather</h1>
      <nav>
        <button className="p-2">
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white mb-1"></div>
          <div className="w-6 h-0.5 bg-white"></div>
        </button>
      </nav>
    </header>
  );
}

export default Header;
