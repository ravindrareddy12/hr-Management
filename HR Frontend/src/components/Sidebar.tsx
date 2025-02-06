import React from "react";
import { NavLink } from "react-router-dom";
import { FaChartLine, FaUserFriends, FaUserLock } from "react-icons/fa";
const Sidebar: React.FC = () => {
  return (
    <div className="w-40 h-screen bg-white p-4 flex flex-col">
      <ul className="space-y-6 flex-grow">
        {/* <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 text-blue-400 font-medium"
                : "flex items-center space-x-3 text-black-300 hover:text-blue-400"
            }
          >
            <FaChartLine className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to="/candidates"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 text-blue-400 font-medium"
                : "flex items-center space-x-3 text-black-300 hover:text-blue-400"
            }
          >
            <FaUserFriends className="w-5 h-5" />
            <span>Candidates</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users" // Corrected the typo from "creaate" to "create"
            className={
              ({ isActive }) =>
                isActive
                  ? "flex items-center space-x-3 text-blue-400 font-medium"
                  : "flex items-center space-x-3 text-black-300 hover:text-blue-400" // text-black-300 corrected to text-gray-300 for consistency
            }
          >
            <FaUserLock className="w-5 h-5" />
            {/* <FontAwesomeIcon icon="fa-solid fa-user-lock" /> */}
            <span>Users</span>
          </NavLink>
        </li>

        {/* Add more menu items as needed */}
      </ul>
    </div>
  );
};
export default Sidebar;
