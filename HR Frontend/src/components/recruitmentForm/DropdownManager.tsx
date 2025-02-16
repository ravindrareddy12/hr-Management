import React, { useState, useEffect } from "react";
import axios from "axios";
import PageContainer from "../layout/PageContainer";
import { useNavigate } from "react-router-dom";
import AlertMessages from "../AlertMessage";

const AddDropdown = () => {
  const [name, setName] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [options, setOptions] = useState("");
  const [dropdowns, setDropdowns] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [alert, setAlert] = useState(null);

  const fields = [
    "tlName",
    "taName",
    "am",
    "client",
    "location",
    "nationality",
    "workStatus",
    "noticePeriod",
    "workMode",
    "internalInterviewStatus",
    "clientInterviewStatus",
    "offerStatus",
    "epRequest",
  ];

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

  const navigate = useNavigate();
  const onBack = () => navigate(-1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const optionsArray = options.split(",").map((opt) => opt.trim());

    try {
      if (editingId) {
        await axios.put(
          import.meta.env.VITE_API_URL + `/api/dropdowns/${editingId}`,
          {
            name,
            placeholder,
            options: optionsArray,
          }
        );
        setAlert({
          message: "Dropdown updated successfully!",
          type: "success",
        });
        setEditingId(null);
      } else {
        await axios.post(import.meta.env.VITE_API_URL + "/api/dropdowns", {
          name,
          placeholder,
          options: optionsArray,
        });
        setAlert({ message: "Dropdown added successfully!", type: "success" });
      }
      setName("");
      setPlaceholder("");
      setOptions("");
      fetchDropdowns();
    } catch (error) {
      setAlert({ message: "Error saving dropdown", type: "error" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(import.meta.env.VITE_API_URL + `/api/dropdowns/${id}`);
      fetchDropdowns();
      setAlert({ message: "Dropdown deleted successfully!", type: "success" });
    } catch (error) {
      setAlert({ message: "Error deleting dropdown", type: "error" });
    }
  };

  return (
    <PageContainer title={"DropDown Manager"}>
      {alert && (
        <AlertMessages
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <button
        onClick={onBack}
        className="mb-4 text-gray-800 hover:text-blue-800 p-2 rounded"
      >
        Back
      </button>
      <div className="p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Dropdown" : "Add Dropdown"}
            </h2>
            <form onSubmit={handleSubmit} className="mb-6 space-y-4">
              <input
                type="text"
                placeholder="Dropdown Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-2 w-full bg-gray-100"
                required
              />
              <input
                type="text"
                placeholder="Placeholder Text"
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
                className="border p-2 w-full bg-gray-100"
                required
              />
              <input
                type="text"
                placeholder="Options (comma separated)"
                value={options}
                onChange={(e) => setOptions(e.target.value)}
                className="border p-2 w-full bg-gray-100"
                required
              />
              <button
                type="submit"
                className="bg-gray-800 hover:bg-blue-800 text-white p-2 rounded w-full"
              >
                {editingId ? "Update Dropdown" : "Add Dropdown"}
              </button>
            </form>
          </div>
        </div>
        <div>
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
                      onClick={() => {
                        setEditingId(dropdown._id);
                        setName(dropdown.name);
                        setPlaceholder(dropdown.placeholder);
                        setOptions(dropdown.options.join(", "));
                      }}
                      className="bg-gray-800 text-white hover:bg-blue-800 px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dropdown._id)}
                      className="bg-gray-800 text-white hover:bg-blue-800 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {fields.map((field, index) => (
            <p
              key={index}
              className="border p-2 bg-white text-center shadow rounded"
            >
              {field}
            </p>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default AddDropdown;
