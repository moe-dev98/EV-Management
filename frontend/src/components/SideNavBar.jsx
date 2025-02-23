import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaSignOutAlt,
  FaCar,
  FaBatteryHalf,
  FaChartBar,
} from "react-icons/fa";

const SideNavBar = () => {
  return (
    <div className="w-55 h-full bg-gray-800 text-white fixed">
      <div className="p-4 flex justify-center">
        <NavLink to="/daily-overview">
          <h2 className="text-xl font-bold">
            <FaCar className="h-12 w-12" />
          </h2>
        </NavLink>
      </div>
      <nav className="mt-4">
        <ul>
          <li className="hover:bg-gray-700">
            <NavLink to="/daily-overview" activeClassName="bg-gray-700" className="block p-4">
              <FaHome className="inline-block mr-2" />
              Daily OverView
            </NavLink>
          </li>
          <li className="hover:bg-gray-700">
            <NavLink to="/analytics" exact activeClassName="bg-gray-700" className="block p-4">
              <FaChartBar className="inline-block mr-2" />
              Analytics
            </NavLink>
          </li>
          <li className="hover:bg-gray-700">
            <NavLink to="/" exact activeClassName="bg-gray-700" className="block p-4">
              <FaBatteryHalf className="inline-block mr-2" />
              Charging Stations
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
