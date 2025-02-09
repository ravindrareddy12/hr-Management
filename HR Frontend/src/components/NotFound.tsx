import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      {/* Exclamation Triangle Icon in Gray-800 */}
      <FontAwesomeIcon
        icon={faExclamationTriangle}
        className="text-gray-800 text-6xl mb-4 hover:text-blue-800"
      />

      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-2">
        The page you are looking for does not exist.
      </p>

      {/* Home Button with Icon in Blue-800 */}
      <Link
        to="/"
        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-800 flex items-center gap-2"
      >
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-white" />
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
