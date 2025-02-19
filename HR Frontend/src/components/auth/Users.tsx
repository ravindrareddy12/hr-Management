import React, { useState, useEffect } from "react";
import axios from "axios";
import PageContainer from "../layout/PageContainer";
import AlertMessages from "../AlertMessage";
import { useAuth } from "../../contexts/AuthContext";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

const Users: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "team-member",
    teamLeader: "",
  });

  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // Loading state added
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState({
    message: "",
    type: "success" as "success" | "error" | "info" | "warning" | "dark",
    show: false,
  });

  const showAlert = (
    message: string,
    type: "success" | "error" | "info" | "warning" | "dark"
  ) => {
    setAlert({ message, type, show: true });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true); // Show loading before fetching users
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      showAlert("Error fetching users", "error");
    } finally {
      setLoading(false); // Hide loading after fetching users
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
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      (formData.role === "team-member" && !formData.teamLeader)
    ) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true); // Show loading during user creation
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/create`,
        formData,
        { withCredentials: true }
      );
      showAlert(`${formData.role} created successfully!`, "success");
      setFormData({
        username: "",
        email: "",
        password: "",
        role: "team-member",
        teamLeader: "",
      });
      fetchUsers();
    } catch (err) {
      showAlert("Failed to create user", "error");
    } finally {
      setLoading(false); // Hide loading after user creation
    }
  };

  const handleDelete = async (id: string, _role: string) => {
    if (user?.role !== "admin") {
      showAlert("Only admins can delete users!", "error");
      return;
    }

    setLoading(true); // Show loading during deletion
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
        withCredentials: true,
      });
      showAlert("User deleted successfully", "success");
      fetchUsers();
    } catch (err) {
      showAlert("Error deleting user", "error");
    } finally {
      setLoading(false); // Hide loading after deletion
    }
  };

  return (
    <PageContainer
      title="Users"
      description="Manage users and set permissions within the system."
    >
      {alert.show && (
        <AlertMessages
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <div className="flex flex-wrap gap-6 p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border-2 border-gray-400">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Create {formData.role}
          </h3>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-200 border rounded-lg"
            >
              <option value="admin">Admin</option>
              <option value="team-leader">Team Leader</option>
              <option value="team-member">Team Member</option>
            </select>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="w-full px-4 py-2 bg-gray-200 border rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 bg-gray-200 border rounded-lg"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full px-4 py-2 bg-gray-200 border rounded-lg"
              required
            />
            {formData.role === "team-member" && (
              <select
                name="teamLeader"
                value={formData.teamLeader}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-200 border rounded-lg"
                required
              >
                <option value="">Select a Team Leader</option>
                {users
                  .filter((user) => user.role === "team-leader")
                  .map((leader) => (
                    <option key={leader._id} value={leader._id}>
                      {leader.username}
                    </option>
                  ))}
              </select>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-gray-800 rounded-lg hover:bg-blue-800"
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin inline-block mr-2" />
              ) : (
                `Create ${formData.role}`
              )}
            </button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg border-2 border-gray-400">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Users List
          </h3>
          {loading ? (
            <div className="flex justify-center py-4">
              <FaSpinner className="animate-spin text-blue-800 text-4xl" />
            </div>
          ) : (
            <div className="max-h-[400px] overflow-y-auto border border-gray-300 rounded-lg shadow-md">
              <table className="min-w-full text-sm text-left table-fixed">
                <thead className="bg-gray-200 sticky top-0 shadow-md">
                  <tr>
                    <th className="px-4 py-3 border-b w-1/3">Username</th>
                    <th className="px-4 py-3 border-b w-1/3">Role</th>
                    <th className="px-4 py-3 border-b w-1/3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-100">
                      <td className="px-4 py-3 truncate">{user.username}</td>
                      <td className="px-4 py-3 truncate">{user.role}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDelete(user._id, user.role)}
                          className="text-red-600 px-3 py-1 rounded hover:text-blue-800"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Users;
