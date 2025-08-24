import React from "react";
import { FiSearch, FiBell, FiUser, FiSettings } from "react-icons/fi";

const Header: React.FC = () => {
  return (
    <header className="bg-creamWhite h-16 flex items-center px-6 shadow-md">
      {/* Logo */}
      <div className="text-forestGreen font-bold text-xl">Agi</div>

      {/* Search Bar */}

      <div className="flex-1 mx-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a project..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-forestGreen"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      {/* Right Icons */}
      <div className="flex items-center space-x-4 text-forestGreen">
        <FiBell className="w-6 h-6 cursor-pointer" />
        <FiSettings className="w-6 h-6 cursor-pointer" />
        <FiUser className="w-6 h-6 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
