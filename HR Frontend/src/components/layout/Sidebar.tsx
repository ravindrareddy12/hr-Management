import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserFriends,
  FaUserLock,
  FaArrowLeft,
  FaArrowRight,
  FaChartPie,
  FaThLarge,
  FaUserTie,
  FaUsersCog,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import PageContainer from "./PageContainer";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { user } = useAuth();

  return (
    <PageContainer title={""} description="">
      <div
        className={`fixed top-16 left-0 h-full ${
          isSidebarOpen ? "w-64" : "w-14"
        } bg-gray-100 p-4 transition-all duration-300 flex flex-col shadow-md`}
      >
        {/* Toggle Button */}
        <button
          className="absolute top-5 right-[-5px] bg-white rounded-full shadow-lg border p-2 hover:bg-gray-200"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <FaArrowLeft className="w-3 h-3" />
          ) : (
            <FaArrowRight className="w-3 h-3" />
          )}
        </button>

        {/* Sidebar Menu */}
        <ul className="space-y-2 pt-8">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded ${
                  isActive ? "bg-blue-800 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <FaThLarge className="w-6 h-6" />
              {isSidebarOpen && <span className="ml-3">Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/candidates"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded ${
                  isActive ? "bg-blue-800 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              <FaUserTie className="w-6 h-6" />
              {isSidebarOpen && <span className="ml-3">Candidates</span>}
            </NavLink>
          </li>

          {/* Users Menu (Restricted) */}
          {user?.role !== "team-member" && (
            <li>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded ${
                    isActive ? "bg-blue-800 text-white" : "hover:bg-gray-200"
                  }`
                }
              >
                <FaUsersCog className="w-6 h-6" />
                {isSidebarOpen && <span className="ml-3">Users</span>}
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </PageContainer>
  );
};

export default Sidebar;
