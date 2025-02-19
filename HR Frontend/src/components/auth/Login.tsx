import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import AlertMessages from "../AlertMessage";
import { FaSpinner } from "react-icons/fa"; // Spinner for loading state

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Start loading state

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setUser(res.data.user);
        localStorage.setItem("userName", res.data.user.username);

        // ✅ Store success alert before navigation
        localStorage.setItem(
          "alertMessage",
          JSON.stringify({
            message: "Login successful! Redirecting...",
            type: "success",
          })
        );

        navigate("/dashboard"); // 🚀 Navigate to Dashboard
      }
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMsg);
      setShowAlert(true); // Show alert
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Show alert for errors */}
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
          <button
            className={`w-full px-4 py-2 mt-6 text-white rounded-lg flex items-center justify-center ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gray-800 hover:bg-blue-800"
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Logging in...
              </>
            ) : (
              "Login"
            )}
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
