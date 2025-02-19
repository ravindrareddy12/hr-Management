import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AlertMessages from "../AlertMessage";
import { FaSpinner } from "react-icons/fa";
const API_URL = import.meta.env.VITE_API_URL;

interface Candidate {
  candidateName: string;
  position: string;
  _id: string;
  workStatus: string;
  offerStatus: string;
  internalInterviewDate: string;
}

interface RecentCandidatesProps {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
}

const getStatusColor = (status: string | null) => {
  switch (status) {
    case "Accepted":
      return "bg-green-800 text-white";
    case "Released":
      return "bg-yellow-800 text-white";
    case "Declined":
      return "bg-red-800 text-white";
    case "Pending":
      return "bg-blue-800 text-white";
    default:
      return "text-white";
  }
};

const RecentCandidates: React.FC<RecentCandidatesProps> = ({
  candidates,
  loading,
  error,
  fetchCandidates,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [alert, setAlert] = useState<{ message: string; type: any } | null>(
    null
  );

  const handleDelete = async (id: string) => {
    await fetch(API_URL + `/api/candidates/${id}`, {
      method: "DELETE",
    });
    fetchCandidates();
    setAlert({ message: "Candidate deleted successfully!", type: "error" });
  };

  const handleEdit = (id: string) => {
    navigate(`/recruitmentForm/${id}`);
    setAlert({ message: "Candidate edited successfully!", type: "info" });
  };

  const handleView = (id: string) => {
    navigate(`/candidateDetails/${id}`);
  };

  return (
    <div className="bg-white p-4 rounded shadow overflow-x-auto">
      {alert && (
        <AlertMessages
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <h3 className="text-xl font-bold mb-4">Recent Candidates</h3>
      {loading ? (
        <div className="flex items-center justify-center">
          <FaSpinner className="animate-spin text-blue-800 text-2xl" />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full text-left border border-gray-300">
          <thead className="bg-gray-200 shadow-md">
            <tr className="border-b ">
              <th className="p-2 border border-gray-400">Candidate Name</th>
              <th className="p-2 border border-gray-400">Position</th>
              <th className="p-2 border border-gray-400">Offer Status</th>
              <th className="p-2 border border-gray-400">Interview Date</th>
              <th className="p-2 border border-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id} className="border-b text-center">
                <td className="p-2 border border-gray-400">
                  {candidate.candidateName}
                </td>
                <td className="p-2 border border-gray-400">
                  {candidate.position}
                </td>
                <td className="p-2 border border-gray-400">
                  <span
                    className={`px-4 py-1 rounded-full ${getStatusColor(
                      candidate.offerStatus
                    )}`}
                  >
                    {candidate.offerStatus}
                  </span>
                </td>
                <td className="p-2 border border-gray-400">
                  {candidate.internalInterviewDate &&
                  new Date(candidate.internalInterviewDate).getTime() !== 0
                    ? new Date(
                        candidate.internalInterviewDate
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : ""}
                </td>
                <td className="border border-gray-400 p-2">
                  {user?.role !== "team-member" ? (
                    <>
                      <button
                        onClick={() => handleEdit(candidate._id)}
                        className="px-4 py-2 rounded bg-transparent text-blue-600 hover:text-white hover:bg-gray-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(candidate._id)}
                        className="px-4 py-2 rounded bg-transparent text-red-600 hover:text-white hover:bg-blue-800"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleView(candidate._id)}
                        className="px-4 py-2 rounded bg-transparent text-gray-800 hover:text-white hover:bg-blue-800"
                      >
                        View
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleView(candidate._id)}
                      className="px-4 py-2 rounded bg-transparent text-gray-800 hover:text-white hover:bg-blue-800"
                    >
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentCandidates;
