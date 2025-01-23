import React from "react";
import { FaUserCircle } from "react-icons/fa"; // Importing user icon
const Navbar: React.FC = () => {
  return (
    <div className="flex justify-between  bg-white shadow p-4">
      {/* Greeting Section */}
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
          HR
        </div>
        <span className="text-black text-lg font-semibold ml-2">HRFlow</span>
      </div>
      <div className="ml-6">
        <h2 className="text-xl font-semibold">Hi, Sarah</h2>
        <p className="text-gray-500">Tuesday, 15 February 2024</p>
      </div>

      <div className="flex items-center">
        <FaUserCircle className="w-8 h-8 text-gray-500 hover:text-blue-500 cursor-pointer" />
      </div>
    </div>
  );
};
export default Navbar;
