import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface NavbarProps {
  userName: string; // Prop for user's name
}

const Navbar: React.FC<NavbarProps> = ({ userName }) => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    // Update the current date when the component mounts
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      navigate("/login");
      toast.success("Successfully logged out!");
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("An error occurred during logout. Please try again.");
    }
  };

  return (
    <>
      <div className="flex justify-between bg-white shadow p-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
            HR
          </div>
          <span className="text-black text-lg font-semibold ml-2">HRFlow</span>
        </div>

        {/* Greeting Section */}
        <div className="ml-6">
          <h2 className="text-xl font-semibold">Hi, {userName}</h2>
          <p className="text-gray-500">{currentDate}</p>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          <FaUserCircle className="w-8 h-8 text-gray-500 hover:text-blue-500 cursor-pointer" />
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-blue-500 focus:outline-none"
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
