import axios from "axios";
import React, { useState, useEffect } from "react";
import PageContainer from "../layout/PageContainer"; // Import PageContainer
const API_URL = import.meta.env.VITE_API_URL;

interface DropdownOptions {
  [key: string]: string[];
}

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

const DropdownManager: React.FC = () => {
  const [fieldName, setFieldName] = useState("");
  const [newOption, setNewOption] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions>({});
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Fetch dropdown options from backend
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/dropdowns`);
        console.log(response.data, "Fetched Dropdown Data"); // Debugging Log

        // Filter only predefined fields
        const filteredOptions: DropdownOptions = {};
        fields.forEach((field) => {
          if (response.data[field]) {
            filteredOptions[field] = response.data[field];
          } else {
            filteredOptions[field] = []; // Ensure all fields exist
          }
        });

        setDropdownOptions(filteredOptions);
      } catch (err) {
        console.error("Error fetching dropdown options:", err);
        setError("Failed to load dropdown options.");
      }
    };

    fetchDropdownOptions();
  }, []);

  // Add new option
  const handleAddOption = async () => {
    if (!fieldName || !newOption.trim()) {
      alert("Please select a field and enter a valid option.");
      return;
    }

    try {
      console.log(
        `Adding option "${newOption.trim()}" to field "${fieldName}"`
      );

      const response = await axios.post(
        `${API_URL}/api/dropdowns/${fieldName}`,
        {
          option: newOption.trim(),
        }
      );

      console.log("Response from server:", response.data);

      // Update state to reflect the added option
      setDropdownOptions((prev) => ({
        ...prev,
        [fieldName]: [...(prev[fieldName] || []), newOption.trim()],
      }));

      setNewOption(""); // Clear input field
      alert("Option added successfully!");
    } catch (err: any) {
      console.error("Error adding option:", err.response?.data || err);
      setError(err.response?.data?.message || "Failed to add option.");
    }
  };

  // Enable editing mode
  const handleEditOption = (index: number, value: string) => {
    setEditingIndex(index);
    setEditingValue(value);
  };

  // Save updated option
  const handleSaveEdit = async () => {
    if (editingIndex === null || !editingValue.trim()) return;

    const oldValue = dropdownOptions[fieldName][editingIndex];
    console.log("Updating:", {
      fieldName,
      oldValue,
      newValue: editingValue.trim(),
    });

    try {
      const response = await axios.put(
        `${API_URL}/api/dropdowns/${fieldName}`,
        {
          oldValue,
          newValue: editingValue.trim(),
        }
      );

      console.log("Update Response:", response.data);

      // Update UI state
      setDropdownOptions((prev) => ({
        ...prev,
        [fieldName]: prev[fieldName].map((opt, i) =>
          i === editingIndex ? editingValue.trim() : opt
        ),
      }));

      setEditingIndex(null);
      setEditingValue("");
      alert("Option updated successfully!");
    } catch (err) {
      console.error(
        "Error updating option:",
        err.response?.data || err.message
      );
      setError("Failed to update option.");
    }
  };

  return (
    <PageContainer title="Manage Dropdowns">
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Field Name Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Select Field
          </label>
          <select
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a Field</option>
            {fields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>

        {/* New Option Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Add New Option
          </label>
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Enter a new option"
            className="w-full p-2 border rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Add Option Button */}
        <button
          onClick={handleAddOption}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
        >
          Add Option
        </button>

        {/* Display Existing Options */}
        {fieldName && dropdownOptions[fieldName]?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Existing Options</h3>
            <ul className="space-y-2">
              {dropdownOptions[fieldName].map((option, index) => (
                <li
                  key={index}
                  className="bg-gray-50 p-2 rounded-lg flex justify-between items-center"
                >
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      className="p-1 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span>{option}</span>
                  )}
                  <div>
                    {editingIndex === index ? (
                      <button
                        onClick={handleSaveEdit}
                        className="ml-2 bg-green-600 text-white px-2 py-1 rounded-lg hover:bg-green-800 transition-colors"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditOption(index, option)}
                        className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default DropdownManager;
