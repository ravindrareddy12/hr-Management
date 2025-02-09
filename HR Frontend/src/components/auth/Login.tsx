import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import AlertMessages from "../AlertMessage"; // Import the alert component

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setUser(res.data.user);
        localStorage.setItem("userName", res.data.user.username);
        navigate("/dashboard");
      }
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "An error occurred";
      setError(errorMsg);
      setShowAlert(true); // Show alert when there's an error
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Show alert if there's an error */}
      {showAlert && error && (
        <AlertMessages
          message={error}
          type="error"
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
        <form onSubmit={handleLogin} className="mt-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
              required
            />
          </div>
          <button className="w-full px-4 py-2 mt-6 text-white bg-gray-800 rounded-lg hover:bg-blue-800">
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <button className="text-gray-800 hover:text-blue-800">
            Contact Administrator or Team Leader for Registration
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
