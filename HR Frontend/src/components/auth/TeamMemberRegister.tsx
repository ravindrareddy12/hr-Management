import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

const TeamMemberRegister = () => {
  const [teamLeaders, setTeamLeaders] = useState<any[]>([]); // List of team leaders
  const [selectedLeader, setSelectedLeader] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch team leaders from the server
  useEffect(() => {
    const fetchTeamLeaders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/teams/leaders`
        );
        setTeamLeaders(res.data); // Assuming the response contains a list of team leaders
      } catch (err) {
        setError("Failed to fetch team leaders.");
      }
    };
    fetchTeamLeaders();
  }, []);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedLeader) {
      setError("Please select a team leader.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        { username, email, password, teamLeaderId: selectedLeader },
        { withCredentials: true }
      );

      if (res.status === 200) {
        navigate("/dashboard"); // Redirect to dashboard or another page
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred during registration."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Register Team Member
          </h2>
          <p className="text-sm text-gray-600">
            Register a new member under your team
          </p>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-6">
          {/* Team Leader Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Select Team Leader
            </label>
            <select
              value={selectedLeader || ""}
              onChange={(e) => setSelectedLeader(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
              required
            >
              <option value="" disabled>
                Select Team Leader
              </option>
              {teamLeaders.map((leader) => (
                <option key={leader.id} value={leader.id}>
                  {leader.username}
                </option>
              ))}
            </select>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
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
      </div>
    </div>
  );
};

export default TeamMemberRegister;
