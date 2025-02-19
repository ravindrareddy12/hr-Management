import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RoutesComponent from "./components/RoutesComponent";
import { FaSpinner } from "react-icons/fa"; // Import FaSpinner

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <FaSpinner className="animate-spin text-blue-800 text-2xl" />
            </div>
          }
        >
          <RoutesComponent />
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
