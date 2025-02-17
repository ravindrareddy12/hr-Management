import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AlertMessages from "../AlertMessage";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.jpg";
const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [alert, setAlert] = useState({
    message: "",
    type: "success" as "success" | "error" | "info" | "warning" | "dark",
    show: false,
  });
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
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>

        <div className="text-center flex-1">
          <h2 className="text-xl text-gray-800 hover:text-blue-800 font-semibold">
            Hi, {user?.username}
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <FaSignOutAlt
            className="w-8 h-8 text-gray-800 hover:text-blue-800 cursor-pointer"
            onClick={handleLogout}
          />
          <button
            onClick={handleLogout}
            className="text-gray-800 hover:text-blue-800 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
