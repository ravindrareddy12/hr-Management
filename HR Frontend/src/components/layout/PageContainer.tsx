import React from "react";
import Footer from "./Footer"; // Import the Footer component

interface PageContainerProps {
  title: string; // Page heading
  description?: string; // Optional description
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Page Content */}
      <main className="flex-1 p-6">
        {/* Page Heading */}
        <header className="mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
          {description && <p className="text-gray-600">{description}</p>}
        </header>

        {/* Page Content */}
        <div className="bg-white p-4 shadow-md rounded-lg">{children}</div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PageContainer;
