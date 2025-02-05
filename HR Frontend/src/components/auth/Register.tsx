import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        { username, email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        localStorage.setItem("userName", username); // Store username
        navigate("/login"); // Redirect to login page
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during registration");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
          <p className="text-sm text-gray-600">Register to access your account</p>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Register
          </button>
        </form>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-blue-600 hover:underline">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
