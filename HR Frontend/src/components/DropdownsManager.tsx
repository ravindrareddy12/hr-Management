import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DropdownsManager: React.FC = () => {
  const [dropdownData, setDropdownData] = useState<{
    [key: string]: string[];
  }>({
    tlName: [],
    taName: [],
    am: [],
    client: [],
    location: [],
    nationality: [],
    workStatus: [],
    noticePeriod: [],
    workMode: [],
    internalInterviewStatus: [],
    clientInterviewStatus: [],
    offerStatus: [],
    epRequest: [],
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const [editing, setEditing] = useState<{ [field: string]: string | null }>(
    {}
  );

  useEffect(() => {
    // Fetch initial dropdown data from the backend
    axios
      .get("http://localhost:5003/api/dropdowns")
      .then((response) => {
        setDropdownData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dropdown data:", err);
        setError("Failed to load dropdown data.");
        setLoading(false);
      });
  }, []);

  const handleUpdate = (field: string, value: string) => {
    if (value.trim() === "") {
      alert("Option cannot be empty.");
      return;
    }

    setDropdownData((prevData) => ({
      ...prevData,
      [field]: [...(prevData[field] || []), value],
    }));
  };

  const handleEdit = (field: string, index: number) => {
    setEditing((prevEditing) => ({
      ...prevEditing,
      [field]: dropdownData[field][index],
    }));
  };

  const handleSaveIndividual = async (field: string, index: number) => {
    try {
      if (editing[field] !== null) {
        const updatedDropdown = [...dropdownData[field]];
        updatedDropdown[index] = editing[field]; // Update the specific option
        await axios.post("http://localhost:5003/api/dropdowns", {
          [field]: updatedDropdown,
        });

        setDropdownData((prevData) => ({
          ...prevData,
          [field]: updatedDropdown,
        }));

        alert(`Option updated successfully in ${field}`);
        setEditing((prevEditing) => ({
          ...prevEditing,
          [field]: null, // Clear the editing state after saving
        }));
      }
    } catch (err) {
      console.error("Error saving dropdown data:", err);
      setError(`Failed to save dropdown data for ${field}.`);
    }
  };

  const handleSaveAll = async (field: string) => {
    try {
      await axios.post("http://localhost:5003/api/dropdowns", {
        [field]: dropdownData[field],
      });

      alert(`All options in ${field} saved successfully.`);
    } catch (err) {
      console.error("Error saving dropdown data:", err);
      setError(`Failed to save dropdown data for ${field}.`);
    }
  };

  const handleCloseDropdowns = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5">Manage Dropdown Options</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {Object.keys(dropdownData).map((field) => (
          <div key={field} className="mb-6">
            <h2 className="text-lg font-semibold">{field}</h2>
            <ul className="mb-3">
              {dropdownData[field].map((option, index) => (
                <li key={index} className="bg-gray-200 p-2 rounded my-1">
                  {editing[field] === option ? (
                    <div className="flex">
                      <input
                        type="text"
                        value={editing[field] || ""}
                        onChange={(e) => {
                          setEditing((prevEditing) => ({
                            ...prevEditing,
                            [field]: e.target.value,
                          }));
                        }}
                        className="input border p-2 rounded w-full"
                      />
                      <button
                        className="ml-2 bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={() => handleSaveIndividual(field, index)}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      {option}
                      <button
                        className="ml-2 text-blue-500"
                        onClick={() => handleEdit(field, index)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex mb-4">
              <input
                type="text"
                placeholder={`Add option for ${field}`}
                className="input border p-2 rounded w-full"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim()) {
                    handleUpdate(field, e.currentTarget.value.trim());
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => handleSaveAll(field)} // Save all changes for that dropdown
            >
              Save {field} Changes
            </button>
          </div>
        ))}
        <div className="mt-6">
          <button
            onClick={handleCloseDropdowns}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-50"
          >
            Close Dropdowns
          </button>
        </div>
      </div>
    </div>
  );
};

export default DropdownsManager;
