import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Candidate {
  _id: string;
  candidateName: string;
  position: string;
  client: string;
  workStatus: string;
  dateOfSubmission: string;
}

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const response = await fetch("http://localhost:5003/api/candidates");
    const data = await response.json();
    setCandidates(data);
  };

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:5003/api/candidates/${id}`, { method: "DELETE" });
    fetchCandidates();
  };

  const handleEdit = (id: string) => {
    navigate(`/recruitmentForm/${id}`);
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Candidates Management</h1>
        <button
          onClick={() => navigate("/recruitmentForm")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Candidate
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Position</th>
              <th className="border border-gray-300 p-2">Client</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">{candidate.candidateName}</td>
                <td className="border border-gray-300 p-2">{candidate.position}</td>
                <td className="border border-gray-300 p-2">{candidate.client}</td>
                <td className="border border-gray-300 p-2">{candidate.workStatus}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleEdit(candidate._id)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(candidate._id)}
                    className="text-red-500 hover:underline ml-4"
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
  );
};

export default Candidates;
