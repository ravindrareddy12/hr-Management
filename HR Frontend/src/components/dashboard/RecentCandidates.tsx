import React from "react";

const RecentCandidates = ({
  candidates,
  handleEdit,
  handleDelete,
  handleView,
  user,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-bold mb-4">Recent Candidates</h3>
      <table className="w-full text-left border border-gray-300">
        <thead className="bg-gray-200 shadow-md">
          <tr className="border-b">
            <th className="p-2">Candidate Name</th>
            <th className="p-2">Position</th>
            <th className="p-2">Offer Status</th>
            <th className="p-2">Interview Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate._id} className="border-b">
              <td className="p-2">{candidate.candidateName}</td>
              <td className="p-2">{candidate.position}</td>
              <td className="p-2">{candidate.offerStatus}</td>
              <td className="p-2">{candidate.internalInterviewDate}</td>
              <td className="p-2">
                {user?.role !== "team-member" ? (
                  <div className="flex space-x-2">
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
                  </div>
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
    </div>
  );
};

export default RecentCandidates;
