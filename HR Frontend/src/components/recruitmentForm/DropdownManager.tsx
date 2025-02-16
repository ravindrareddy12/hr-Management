import React, { useState, useEffect } from "react";
import axios from "axios";

const AddDropdown = () => {
  const [name, setName] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [options, setOptions] = useState("");
  const [dropdowns, setDropdowns] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch dropdowns
  const fetchDropdowns = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/dropdowns"
      );
      setDropdowns(response.data);
    } catch (error) {
      console.error("Error fetching dropdowns:", error);
    }
  };

  useEffect(() => {
    fetchDropdowns();
  }, []);

  // Handle form submission (Create & Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const optionsArray = options.split(",").map((opt) => opt.trim());

    try {
      if (editingId) {
        // Update existing dropdown
        await axios.put(
          import.meta.env.VITE_API_URL + `/api/dropdowns/${editingId}`,
          {
            name,
            placeholder,
            options: optionsArray,
          }
        );
        setEditingId(null);
      } else {
        // Create new dropdown
        await axios.post(import.meta.env.VITE_API_URL + "/api/dropdowns", {
          name,
          placeholder,
          options: optionsArray,
        });
      }
      setName("");
      setPlaceholder("");
      setOptions("");
      fetchDropdowns();
    } catch (error) {
      console.error("Error saving dropdown:", error);
    }
  };

  // Handle edit
  const handleEdit = (dropdown) => {
    setEditingId(dropdown._id);
    setName(dropdown.name);
    setPlaceholder(dropdown.placeholder);
    setOptions(dropdown.options.join(", "));
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this dropdown?")) {
      try {
        await axios.delete(
          import.meta.env.VITE_API_URL + `/api/dropdowns/${id}`
        );
        fetchDropdowns();
      } catch (error) {
        console.error("Error deleting dropdown:", error);
      }
    }
  };

  return (
    <div className="p-4">
      {/* Form to Add/Edit Dropdown */}
      <h2 className="text-xl font-bold mb-4">
        {editingId ? "Edit Dropdown" : "Add Dropdown"}
      </h2>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Dropdown Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Placeholder Text"
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Options (comma separated)"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {editingId ? "Update Dropdown" : "Add Dropdown"}
        </button>
      </form>

      {/* List of Dropdowns */}
      <h2 className="text-xl font-bold mb-4">Dropdown List</h2>
      {dropdowns.length === 0 ? (
        <p>No dropdowns available.</p>
      ) : (
        <ul className="space-y-4">
          {dropdowns.map((dropdown) => (
            <li
              key={dropdown._id}
              className="border p-4 rounded flex justify-between items-center"
            >
              <div>
                <strong>{dropdown.name}</strong> ({dropdown.placeholder})
                <ul className="text-sm text-gray-600">
                  {dropdown.options.map((option, index) => (
                    <li key={index}>- {option}</li>
                  ))}
                </ul>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(dropdown)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(dropdown._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddDropdown;
