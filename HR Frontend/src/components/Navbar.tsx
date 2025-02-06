import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa"; // Updated import
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NavbarProps {
  userName: string;
}

const Navbar: React.FC<NavbarProps> = ({ userName }) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");

    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      )
      .then(() => {
        // Clear user data from local storage and session storage
        localStorage.removeItem("authToken");
        sessionStorage.clear();

        // Show success toast
        toast.success("Successfully logged out!");

        // Immediately navigate to the login page
        navigate("/login");
      })
      .catch((err) => {
        // Handle error
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "An unknown error occurred.";
        console.error("Logout failed:", errorMessage);
        toast.error(`Logout failed: ${errorMessage}`);
      });
  };

  return (
    <>
      <div className="flex justify-between bg-gray-100 shadow-lg p-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-lg font-bold">
            HR
          </div>
          <span className="text-gray-800 text-lg font-semibold ml-2 hover:text-blue-800 ">
            HRFlow
          </span>
        </div>

        {/* Greeting Section */}
        <div className="ml-6">
          <h2 className="text-xl  text-gray-800 hover:text-blue-800 font-semibold">
            Hi, {userName}
          </h2>
          <p className="text-gray-600 hover:text-blue-800">{currentDate}</p>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          <FaSignOutAlt className="w-8 h-8 text-gray-800 hover:text-blue-800 cursor-pointer" />
          <button
            onClick={handleLogout}
            className="text-gray-800 hover:text-blue-800 focus:outline-none"
          >
            Logout
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Navbar;
