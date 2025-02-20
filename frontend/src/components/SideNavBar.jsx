import { NavLink } from 'react-router-dom';
import { FaChartLine, FaHome, FaSignOutAlt, FaCar } from 'react-icons/fa';

const SideNavBar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white fixed">
      <div className="p-4">
        <h2 className="text-xl font-bold"> 
          <FaCar className="h-12 w-12" />
        </h2>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <NavLink to="/" exact activeClassName="bg-gray-700">
              <FaHome className="inline-block mr-2" />
              Daily Overview
            </NavLink>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <NavLink to="/analytics" activeClassName="bg-gray-700">
              <FaChartLine className="inline-block mr-2" />
              Analytics
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-4">
        <button className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          <FaSignOutAlt className="inline-block mr-2" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideNavBar;