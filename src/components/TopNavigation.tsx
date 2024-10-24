import React from 'react';
import { Search, Settings, User, Grid, Filter, Bell } from 'lucide-react';

const TopNavigation = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1 mx-4 flex items-center">
          <div className="relative flex-grow max-w-2xl">
            <input
              type="text"
              placeholder="AI Contextual Search"
              className="w-full p-2 pl-10 pr-4 border rounded-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <button className="ml-2 p-2 rounded-full hover:bg-gray-200">
            <Filter size={20} />
          </button>
          <button className="ml-2 p-2 rounded-full hover:bg-gray-200">
            <Bell size={20} />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <Settings size={24} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <Grid size={24} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <User size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavigation;