// RoutesComponent.tsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Candidates from "./candidate/candidates";
import RecruitmentForm from "./recruitmentForm/RecruitmentForm";
import Dashboard from "./dashboard/Dashboard";
import DropdownsManager from "./recruitmentForm/DropdownsManager";
import Login from "./auth/Login";
import Users from "./auth/Users";
import CandidateDetails from "./candidate/CandidateDetails";
import Layout from "./layout/layout";



const RoutesComponent: React.FC = () => {

  
  
  return (
    <Routes>
      {/* Routes without Navbar and Sidebar */}
      <Route path="/login" element={<Login />} />

      {/* Routes with Layout */}
      <Route
        path="/*"
        element={
          <Layout >
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route
                path="/candidateDetails/:id"
                element={<CandidateDetails />}
              />
              <Route path="/users" element={<Users />} />
              <Route
                path="/recruitmentForm/:id?"
                element={<RecruitmentForm />}
              />
              <Route path="/dropdownsManager" element={<DropdownsManager />} />
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
};

export default RoutesComponent;
