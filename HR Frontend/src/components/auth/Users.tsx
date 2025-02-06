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
    // Simulate fetching team leaders from API
    setTeamLeaders([
      { id: 1, username: "leader1" },
      { id: 2, username: "leader2" },
      { id: 3, username: "leader3" },
    ]);
    setTeamMembers([
      { id: 1, username: "member1" },
      { id: 2, username: "member2" },
    ]);
  }, []);

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
      teamLeader:
        selectedRole === "team-member" ? selectedTeamLeader : undefined,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/${
          selectedRole === "team-leader" ? "team-leaders" : "team-members"
        }/create`,
        data,
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success(
          `${
            selectedRole === "team-leader" ? "Team Leader" : "Team Member"
          } created successfully!`
        );
        setFormData({
          username: "",
          email: "",
          password: "",
          selectedRole: "team-member",
          selectedTeamLeader: "",
        });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create user");
    }
  };

  const handleDelete = (id: number, role: "team-leader" | "team-member") => {
    // Handle delete logic here
    console.log(`Deleting ${role} with ID: ${id}`);
  };

  const { username, email, password, selectedRole, selectedTeamLeader } =
    formData;

  return (
    <div className="bg-gray-100 flex flex-wrap gap-6 p-8">
      {/* Form Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Create{" "}
          {selectedRole === "team-leader" ? "Team Leader" : "Team Member"}
        </h3>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dropdown to select role (Team Leader or Team Member) */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Select Role
            </label>
            <select
              name="selectedRole"
              value={selectedRole}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
              required
            >
              <option value="team-leader">Create Team Leader</option>
              <option value="team-member">Create Team Member</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-200 border rounded-lg focus:ring focus:outline-none"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Show Team Leader dropdown only if creating a Team Member */}
          {selectedRole === "team-member" && (
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Select Team Leader
              </label>
              <select
                name="selectedTeamLeader"
                value={selectedTeamLeader}
                onChange={handleChange}
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
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 text-sm"
          >
            Create{" "}
            {selectedRole === "team-leader" ? "Team Leader" : "Team Member"}
          </button>
        </form>
      </div>

      {/* Users List Card */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Users List: Team Leaders & Members
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm text-left text-gray-600">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left border-b">Username</th>
                <th className="px-6 py-3 text-left border-b">Role</th>
                <th className="px-6 py-3 text-left border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamLeaders.map((leader) => (
                <tr key={leader.id} className="border-b">
                  <td className="px-6 py-4">{leader.username}</td>
                  <td className="px-6 py-4">Team Leader</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(leader.id, "team-leader")}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {teamMembers.map((member) => (
                <tr key={member.id} className="border-b">
                  <td className="px-6 py-4">{member.username}</td>
                  <td className="px-6 py-4">Team Member</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(member.id, "team-member")}
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
