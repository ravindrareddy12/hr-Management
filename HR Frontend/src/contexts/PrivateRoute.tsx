import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import React from "react";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // Prevent rendering before checking auth

  return user ? <Outlet /> : <Navigate to="/" replace />; // Redirect if not logged in
};

export default PrivateRoute;
