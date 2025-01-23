import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        navigate('/home'); // Redirect to the home page after successful login
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-600">Login to access your account</p>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Login
          </button>
        </form>
        <div className="text-sm text-center text-gray-600">
          <p>
            Forgot your password?{' '}
            <a href="/reset-password" className="text-blue-600 hover:underline">
              Reset here
            </a>
          </p>
          <p className="mt-2">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Or sign in with</p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <button className="p-2 text-gray-500 bg-gray-200 rounded-full hover:bg-gray-300">
              <i className="pi pi-google text-xl"></i>
            </button>
            <button className="p-2 text-gray-500 bg-gray-200 rounded-full hover:bg-gray-300">
              <i className="pi pi-facebook text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
