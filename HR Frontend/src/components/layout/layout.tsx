import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto]">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar  />
      </div>

      {/* Main Content */}
      <div className="flex h-full pt-[64px]">
        {/* Sidebar */}
        <div
          className={`fixed left-0 top-[64px] bottom-0 ${
            isSidebarOpen ? "w-64" : "w-14"
          } transition-all duration-300`}
        >
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        {/* Main Content (Auto-adjusts with sidebar) */}
        <main
          className={`flex-1 overflow-y-auto transition-all duration-300  ${
            isSidebarOpen ? "ml-64" : "ml-14"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
