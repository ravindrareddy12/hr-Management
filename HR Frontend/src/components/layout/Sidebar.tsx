import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserFriends,
  FaUserLock,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
import PageContainer from "./PageContainer";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { user } = useAuth(); // Get the logged-in user

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
        {isSidebarOpen && (
          <ul className="space-y-2 pt-8">
            {/* Candidates Menu (Visible for All Users) */}
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center space-x-3 px-3 py-2 rounded bg-blue-800 text-white"
                    : "flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-200"
                }
              >
                <FaUserFriends className="w-6 h-6" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/candidates"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center space-x-3 px-3 py-2 rounded bg-blue-800 text-white"
                    : "flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-200"
                }
              >
                <FaUserFriends className="w-6 h-6" />
                <span>Candidates</span>
              </NavLink>
            </li>

            {/* Users Menu (Restricted: Only Admin & Team Leaders can see this) */}
            {user?.role !== "team-member" && (
              <li>
                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center space-x-3 px-3 py-2 rounded bg-blue-800 text-white"
                      : "flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-200"
                  }
                >
                  <FaUserLock className="w-6 h-6" />
                  <span>Users</span>
                </NavLink>
              </li>
            )}
          </ul>
        )}
      </div>
    </PageContainer>
  );
};

export default Sidebar;
