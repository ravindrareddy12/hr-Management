// App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import RoutesComponent from "./components/RoutesComponent";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <RoutesComponent />
      </Router>
    </AuthProvider>
  );
};

export default App;
