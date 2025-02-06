import React from "react";
import { NavLink } from "react-router-dom";
import { FaChartLine, FaUserFriends, FaUserLock } from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <div
      className="w-40 h-full bg-gray-100 p-4 flex flex-col mt-0.5"
      style={{ boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.1)" }}
    >
      <ul className="space-y-2 flex-grow">
        <li>
          <NavLink
            to="/candidates"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 px-3 py-2 rounded bg-blue-100 text-blue-600 font-medium"
                : "flex items-center space-x-3 px-3 py-2 rounded text-gray-800 hover:text-blue-600 hover:bg-gray-200"
            }
          >
            <FaUserFriends className="w-5 h-5" />
            <span>Candidates</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              isActive
                ? "flex items-center space-x-3 px-3 py-2 rounded bg-blue-100 text-blue-600 font-medium"
                : "flex items-center space-x-3 px-3 py-2 rounded text-gray-800 hover:text-blue-600 hover:bg-gray-200"
            }
          >
            <FaUserLock className="w-5 h-5" />
            <span>Users</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
