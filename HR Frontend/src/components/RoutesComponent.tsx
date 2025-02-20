import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Candidates from "./candidate/candidates";
import RecruitmentForm from "./recruitmentForm/RecruitmentForm";
import Dashboard from "./dashboard/Dashboard";
import DropdownManager from "./recruitmentForm/DropdownManager";
import Login from "./auth/Login";
import Users from "./auth/Users";
import CandidateDetails from "./candidate/CandidateDetails";
import Layout from "./layout/layout";
import { useAuth } from "../contexts/AuthContext";
import { FaLock } from "react-icons/fa";
import NotFound from "./NotFound";
import { FaSpinner } from "react-icons/fa";
import ProfilePage from "./layout/ProfilePage";

const AccessDenied: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <FaLock className="text-red-600 text-6xl mb-4" />
    <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
    <p className="text-gray-800 mt-2">
      You do not have permission to view this page.
    </p>
    <a
      href="/"
      className="mt-4 px-6 py-2 bg-gray-800 text-white rounded hover:bg-blue-800 transition"
    >
      Go to Home
    </a>
  </div>
);

const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <FaSpinner className="animate-spin text-blue-800 text-4xl" />
      </div>
    );

  return user ? <>{element}</> : <Navigate to="/login" replace />;
};

const RoutesComponent: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Route - Login */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes - Require Authentication */}
      <Route
        path="/*"
        element={
          <ProtectedRoute
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/profile" element={<ProfilePage />} />{" "}
                  {/* Add the Profile route */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/candidates" element={<Candidates />} />
                  <Route
                    path="/candidateDetails/:id"
                    element={<CandidateDetails />}
                  />
                  <Route
                    path="/recruitmentForm/:id?"
                    element={<RecruitmentForm />}
                  />
                  <Route
                    path="/dropdownManager"
                    element={<DropdownManager />}
                  />
                  {/* Restrict /users route for team members */}
                  {user?.role === "team-member" ? (
                    <Route path="/users" element={<AccessDenied />} />
                  ) : (
                    <Route path="/users" element={<Users />} />
                  )}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            }
          />
        }
      />
    </Routes>
  );
};

export default RoutesComponent;
