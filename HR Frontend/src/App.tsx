import React from "react";
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

const App: React.FC = () => {
  return (
    <Router>
      <Navbar userName={"shiva"} />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/recruitmentForm/:id?" element={<RecruitmentForm />} />
            <Route path="/dropdownsManager" element={<DropdownsManager />} />

            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
