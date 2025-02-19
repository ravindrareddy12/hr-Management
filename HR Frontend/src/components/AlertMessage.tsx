import React, { useEffect } from "react";

interface AlertMessagesProps {
  message: string;
  type: "success" | "error" | "info" | "warning" | "dark";
  onClose: () => void;
}

// Heroicons paths for each type
const iconPaths: Record<string, string> = {
  success:
    "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", // Checkmark icon
  error:
    "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z", // Cross icon
  info: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 102 0V6zm-1 7a1 1 0 100-2 1 1 0 000 2z", // Info icon
  warning:
    "M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 112 0v2a1 1 0 11-2 0v-2zm1-4a1 1 0 100-2 1 1 0 000 2z", // Warning triangle icon
  dark: "M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 110-12 6 6 0 010 12z", // Neutral circle icon
};

// Tailwind CSS classes for each type (light and dark mode)
const alertStyles: Record<string, string> = {
  success:
    "text-green-700 bg-green-50 border-green-200 dark:bg-green-800 dark:text-green-100 dark:border-green-700",
  error:
    "text-red-700 bg-red-50 border-red-200 dark:bg-red-800 dark:text-red-100 dark:border-red-700",
  info: "text-blue-700 bg-blue-50 border-blue-200 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-700",
  warning:
    "text-yellow-700 bg-yellow-50 border-yellow-200 dark:bg-yellow-800 dark:text-yellow-100 dark:border-yellow-700",
  dark: "text-gray-700 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700",
};

const AlertMessages: React.FC<AlertMessagesProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Automatically close the notification after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [onClose]);

  return (
    <div
      className={`flex items-center p-4 mb-4 text-sm rounded-lg border ${alertStyles[type]} fixed top-5 left-1/2 transform -translate-x-1/2 z-50 shadow-lg`}
      role="alert"
    >
      <svg
        className="shrink-0 inline w-5 h-5 mr-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d={iconPaths[type]} />
      </svg>
      <div>
        <span className="font-medium">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg focus:ring-2 focus:ring-opacity-50 hover:bg-opacity-25 transition-colors"
        aria-label="Close"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default AlertMessages;
