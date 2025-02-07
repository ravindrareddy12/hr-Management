import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Candidates from "./components/Candidates";
import RecruitmentForm from "./components/RecruitmentForm";
import Dashboard from "./components/Dashboard";
import DropdownsManager from "./components/DropdownsManager";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Users from "./components/auth/Users";
import Layout from "../src/components/layout"; // Import the Layout
import { AuthProvider } from "./contexts/AuthContext";

const App: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the username from localStorage when the app loads
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes without Navbar and Sidebar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes with Navbar, Sidebar, and Footer */}
          <Route
            path="/*"
            element={
              <Layout userName={userName || "User"}>
                <Routes>
                  <Route path="/" element={<Navigate to="/candidates" />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/candidates" element={<Candidates />} />
                  <Route path="/users" element={<Users />} />
                  <Route
                    path="/recruitmentForm/:id?"
                    element={<RecruitmentForm />}
                  />
                  <Route
                    path="/dropdownsManager"
                    element={<DropdownsManager />}
                  />
                  <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
