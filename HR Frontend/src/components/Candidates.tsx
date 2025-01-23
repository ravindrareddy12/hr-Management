import React from "react";
import { useNavigate } from "react-router-dom";

// Define the type for a candidate
interface Candidate {
  name: string;
  position: string;
  client: string;
  status: "Interview" | "Offer" | "Hired"; // Define specific statuses as a union type
  date: string; // ISO date string format
}

// Sample candidates data
const candidates: Candidate[] = [
  {
    name: "John Smith",
    position: "Software Engineer",
    client: "Tech Corp",
    status: "Interview",
    date: "2024-02-15",
  },
  {
    name: "Sarah Johnson",
    position: "Product Manager",
    client: "Innovation Inc",
    status: "Offer",
    date: "2024-02-14",
  },
  // Add more candidates here...
];

const Candidates: React.FC = () => {
  const navigate = useNavigate();

  const handleAddCandidate = () => {
    navigate("/recruitmentForm"); // Navigate to the recruitment form page
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Candidates Management</h1>
        <button
          onClick={handleAddCandidate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Candidate
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search candidates..."
            className="input w-1/3 border border-gray-300 rounded px-2 py-1" // Added border classes
          />
          <button className="bg-gray-200 px-4 py-2 rounded">Filters</button>
        </div>
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Position</th>
              <th className="border border-gray-300 p-2">Client</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{candidate.name}</td>
                <td className="border border-gray-300 p-2">
                  {candidate.position}
                </td>
                <td className="border border-gray-300 p-2">
                  {candidate.client}
                </td>
                <td className="border border-gray-300 p-2">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      candidate.status === "Interview"
                        ? "bg-blue-500"
                        : candidate.status === "Offer"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  >
                    {candidate.status}
                  </span>
                </td>
                <td className="border border-gray-300 p-2">{candidate.date}</td>
                <td className="border border-gray-300 p-2 flex gap-2">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button className="text-red-500 hover:underline pl-2">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Candidates;
