import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import React from "react";
import { FaSpinner } from "react-icons/fa";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <FaSpinner className="animate-spin text-blue-800 text-2xl" />
      </div>
    ); // Prevent rendering before checking auth

  return user ? <Outlet /> : <Navigate to="/" replace />; // Redirect if not logged in
};

export default PrivateRoute;
