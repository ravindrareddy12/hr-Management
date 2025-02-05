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
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DropdownsManager from "./components/DropdownsManager";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Users from "./components/auth/Users";


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
    <Router>
      <Routes>
        {/* Routes without Navbar and Sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes with Navbar and Sidebar */}
        <Route
          path="/*"
          element={
            <>
              <Navbar userName={userName || "User"} />
              <div className="flex">
                <Sidebar />
                <div className="flex-1 p-4">
                  <Routes>
                    <Route path="/" element={<Navigate to="/candidates" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/candidates" element={<Candidates />} />
                    <Route path="/users" element={<Users/>} />

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
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
