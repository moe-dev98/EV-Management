import React from 'react';
import { NavLink } from 'react-router-dom';

const SideNavBar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white fixed">
      <div className="p-4">
        <h2 className="text-xl font-bold"> LOGO </h2>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <NavLink to="/analytics" activeClassName="bg-gray-700">Analytics</NavLink>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <NavLink to="/" exact activeClassName="bg-gray-700">Charge Stations</NavLink>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-4">
        <button className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideNavBar;