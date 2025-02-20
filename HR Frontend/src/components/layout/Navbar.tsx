import React, { useEffect, useState } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AlertMessages from "../AlertMessage";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [alert, setAlert] = useState({
    message: "",
    type: "success" as "success" | "error" | "info" | "warning" | "dark",
    show: false,
  });
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const { user } = useAuth();

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
  }, []);

  const showAlert = (
    message: string,
    type: "success" | "error" | "info" | "warning" | "dark"
  ) => {
    setAlert({ message, type, show: true });
  };

  const handleLogout = () => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userName");
        sessionStorage.clear();
        showAlert("Successfully logged out!", "success");
        navigate("/login");
      })
      .catch((err) => {
        showAlert(
          `Logout failed: ${err.response?.data?.message || "Unknown error"}`,
          "error"
        );
      });
  };

  const handleProfileClick = () => {
    navigate("/profile"); // Navigate to the profile page
  };
  return (
    <>
      {alert.show && (
        <AlertMessages
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <div className="fixed top-0 left-0 w-full bg-gray-100 shadow-lg p-4 z-10 flex justify-between items-center">
        <div className="flex items-center bg-gray-100 p-2 rounded-lg">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-auto max-w-[150px] object-contain"
          />
        </div>

        <div className="text-center flex-1">
          <h2 className="text-xl text-gray-800 hover:text-blue-800 font-semibold">
            Hi, {user?.username}
          </h2>
        </div>
        <div className="flex items-center space-x-4 relative">
          <FaUserCircle
            className="w-8 h-8 text-gray-800 hover:text-blue-800 cursor-pointer"
            onClick={() => setShowPopup(!showPopup)} // Toggle popup visibility
          />
          {showPopup && (
            <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-2 w-40">
              <button
                onClick={handleProfileClick}
                className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
