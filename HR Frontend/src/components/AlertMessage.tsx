import React, { useEffect } from "react";

interface AlertMessagesProps {
  message: string;
  type: "success" | "error" | "info" | "warning" | "dark";
  onClose: () => void;
}

const iconPaths: Record<string, string> = {
  success:
    "M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 17C7.24 17 5 14.76 5 12H7C7 13.1 7.9 14 9 14C10.1 14 11 13.1 11 12C11 10.9 10.1 10 9 10C7.9 10 7 10.9 7 12H5C5 9.24 7.24 7 10 7C12.76 7 15 9.24 15 12C15 14.76 12.76 17 10 17Z", // Success icon
  error:
    "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z", // Error icon
  info: "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z", // Info icon
  warning:
    "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z", // Warning icon
  dark: "M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z", // Dark icon (same as error for now, could be changed)
};

const alertStyles: Record<string, string> = {
  success: "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400",
  error: "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400",
  info: "text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400",
  warning: "text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300",
  dark: "text-gray-800 bg-gray-50 dark:bg-gray-800 dark:text-gray-300",
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
      className={`flex items-center p-4 mb-4 text-sm rounded-lg ${alertStyles[type]} fixed top-5 left-1/2 transform -translate-x-1/2 z-50`}
      role="alert"
    >
      <svg
        className="shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d={iconPaths[type]} />
      </svg>
      <span className="sr-only"></span>
      <div>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};

export default AlertMessages;
