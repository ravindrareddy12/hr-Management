import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    selectedRole: "team-member",
    selectedTeamLeader: "",
  });

  const [teamLeaders, setTeamLeaders] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
        withCredentials: true,
      });
      const users = res.data;

      setTeamLeaders(users.filter((user: any) => user.role === "team-leader"));
      setTeamMembers(users.filter((user: any) => user.role === "team-member"));
    } catch (err: any) {
      toast.error("Error fetching users");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, email, password, selectedRole, selectedTeamLeader } =
      formData;

    if (
      !username ||
      !email ||
      !password ||
      (selectedRole === "team-member" && !selectedTeamLeader)
    ) {
      setError("Please fill in all fields.");
      return;
    }

    const data = {
      username,
      email,
      password,
      role: selectedRole,
      teamLeader: selectedRole === "team-member" ? selectedTeamLeader : null,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/users/create`, data, {
        withCredentials: true,
      });

      toast.success(
        `${selectedRole === "team-leader" ? "Team Leader" : "Team Member"} created successfully!`
      );

      // Reset form
      setFormData({
        username: "",
        email: "",
        password: "",
        selectedRole: "team-member",
        selectedTeamLeader: "",
      });

      fetchUsers(); // Refresh the user list
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create user");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
        withCredentials: true,
      });

      toast.success("User deleted successfully");
      fetchUsers(); // Refresh the list
    } catch (err: any) {
      toast.error("Error deleting user");
    }
  };

  return (
    <div className="bg-gray-100 flex flex-wrap gap-6 p-8">
      {/* Form Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Create {formData.selectedRole === "team-leader" ? "Team Leader" : "Team Member"}
        </h3>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Select Role
            </label>
            <select
              name="selectedRole"
              value={formData.selectedRole}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 bg-gray-200 border rounded-lg"
              required
            >
              <option value="team-leader">Create Team Leader</option>
              <option value="team-member">Create Team Member</option>
            </select>
          </div>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
            className="w-full px-4 py-2 mt-1 bg-gray-200 border rounded-lg"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
            className="w-full px-4 py-2 mt-1 bg-gray-200 border rounded-lg"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
            className="w-full px-4 py-2 mt-1 bg-gray-200 border rounded-lg"
          />

          {formData.selectedRole === "team-member" && (
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Select Team Leader
              </label>
              <select
                name="selectedTeamLeader"
                value={formData.selectedTeamLeader}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 bg-gray-200 border rounded-lg"
                required
              >
                <option value="">Select a Team Leader</option>
                {teamLeaders.map((leader) => (
                  <option key={leader._id} value={leader._id}>
                    {leader.username}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-blue-800"
          >
            Create {formData.selectedRole === "team-leader" ? "Team Leader" : "Team Member"}
          </button>
        </form>
      </div>

      {/* Users List */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Users List: Team Leaders & Members
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 border-b">Username</th>
                <th className="px-6 py-3 border-b">Role</th>
                <th className="px-6 py-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[...teamLeaders, ...teamMembers].map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-800 bg-transparent hover:bg-gray-200 px-4 py-2 rounded"
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
