import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users: React.FC = () => {
  const navigate = useNavigate();

  // State for both forms
  const [newLeaderUsername, setNewLeaderUsername] = useState("");
  const [newLeaderEmail, setNewLeaderEmail] = useState("");
  const [newLeaderPassword, setNewLeaderPassword] = useState(""); // Added password for leader
  const [newMemberUsername, setNewMemberUsername] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberPassword, setNewMemberPassword] = useState(""); // Added password for member
  const [selectedTeamLeader, setSelectedTeamLeader] = useState(""); // For storing selected team leader
  const [error, setError] = useState<string | null>(null);

  // States for fetching team leaders and members
  const [teamLeaders, setTeamLeaders] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  // Fetch the current team leader's name from localStorage
  useEffect(() => {
    const role = localStorage.getItem("role");
    const leaderName = localStorage.getItem("username");
    if (role !== "leader") {
      navigate("/users"); // Redirect if user is not a team leader
    }
    setTeamLeaders([]); // Fetch team leaders here (you can update with actual API call)
    setTeamMembers([]); // Fetch team members here (you can update with actual API call)
  }, [navigate]);

  // Handle creating a new team leader
  const handleCreateTeamLeader = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!newLeaderUsername || !newLeaderEmail || !newLeaderPassword) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/team-leaders/create`,
        {
          username: newLeaderUsername,
          email: newLeaderEmail,
          password: newLeaderPassword,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Team Leader created successfully!");
        setNewLeaderUsername("");
        setNewLeaderEmail("");
        setNewLeaderPassword("");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create Team Leader");
      toast.error("Failed to create Team Leader");
    }
  };

  // Handle creating a new team member
  const handleCreateTeamMember = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (
      !newMemberUsername ||
      !newMemberEmail ||
      !newMemberPassword ||
      !selectedTeamLeader
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/team-members/create`,
        {
          username: newMemberUsername,
          email: newMemberEmail,
          password: newMemberPassword,
          teamLeader: selectedTeamLeader,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Team Member created successfully!");
        setNewMemberUsername("");
        setNewMemberEmail("");
        setNewMemberPassword("");
        setSelectedTeamLeader(""); // Reset the selected team leader
        // Automatically login the member after creation (Optional)
        navigate("/login");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create Team Member");
      toast.error("Failed to create Team Member");
    }
  };

  // Handle delete of a team leader
  const handleDeleteTeamLeader = async (leaderId: string) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/team-leaders/${leaderId}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Team Leader deleted successfully!");
        // Update the team leaders list
        setTeamLeaders((prevLeaders) =>
          prevLeaders.filter((leader) => leader.id !== leaderId)
        );
      }
    } catch (err: any) {
      toast.error("Failed to delete Team Leader");
    }
  };

  // Handle delete of a team member
  const handleDeleteTeamMember = async (memberId: string) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/team-members/${memberId}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Team Member deleted successfully!");
        // Update the team members list
        setTeamMembers((prevMembers) =>
          prevMembers.filter((member) => member.id !== memberId)
        );
      }
    } catch (err: any) {
      toast.error("Failed to delete Team Member");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Create Team Leader Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Create Team Leader
          </h3>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleCreateTeamLeader} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                value={newLeaderUsername}
                onChange={(e) => setNewLeaderUsername(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
                placeholder="Enter Team Leader username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={newLeaderEmail}
                onChange={(e) => setNewLeaderEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
                placeholder="Enter Team Leader email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                value={newLeaderPassword}
                onChange={(e) => setNewLeaderPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
                placeholder="Enter Team Leader password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 text-sm"
            >
              Create Team Leader
            </button>
          </form>
        </div>

        {/* Create Team Member Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Create Team Member
          </h3>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleCreateTeamMember} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Username
              </label>
              <input
                type="text"
                value={newMemberUsername}
                onChange={(e) => setNewMemberUsername(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
                placeholder="Enter Team Member username"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
                placeholder="Enter Team Member email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                value={newMemberPassword}
                onChange={(e) => setNewMemberPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
                placeholder="Enter Team Member password"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Select Team Leader
              </label>
              <select
                value={selectedTeamLeader}
                onChange={(e) => setSelectedTeamLeader(e.target.value)}
                className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
                required
              >
                <option value="">Select a Team Leader</option>
                {teamLeaders.map((leader) => (
                  <option key={leader.id} value={leader.username}>
                    {leader.username}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 text-sm"
            >
              Create Team Member
            </button>
          </form>
        </div>

        {/* Team Members List Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Team Leaders And Team Members
          </h3>
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Display Team Leaders */}
              {teamLeaders.map((leader) => (
                <tr key={leader.id}>
                  <td className="px-6 py-4">{leader.username}</td>
                  <td className="px-6 py-4">Team Leader</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteTeamLeader(leader.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {/* Display Team Members */}
              {teamMembers.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4">{member.username}</td>
                  <td className="px-6 py-4">Team Member</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteTeamMember(member.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
