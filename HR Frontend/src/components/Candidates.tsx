import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx"; // Import XLSX library for Excel export

interface Candidate {
  _id: string;
  candidateName: string;
  position: string;
  client: string;
  workStatus: string;
  dateOfSubmission: string;
  offerStatus: string;
}

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [candidatesPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [dateRange, setDateRange] = useState<string>(""); // Store the date range in a single string
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterStatus, dateRange, candidates]);

  const fetchCandidates = async () => {
    const response = await fetch("http://localhost:5003/api/candidates");
    const data = await response.json();
    setCandidates(data);
    setFilteredCandidates(data);
  };

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:5003/api/candidates/${id}`, {
      method: "DELETE",
    });
    fetchCandidates();
  };

  const handleEdit = (id: string) => {
    navigate(`/recruitmentForm/${id}`);
  };

  const applyFilters = () => {
    let filtered = candidates;

    if (searchTerm) {
      filtered = filtered.filter((candidate) =>
        candidate.candidateName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus) {
      filtered = filtered.filter(
        (candidate) => candidate.offerStatus === filterStatus
      );
    }

    if (dateRange) {
      const [start, end] = dateRange.split(" - ").map((date) => date.trim());
      filtered = filtered.filter((candidate) => {
        const submissionDate = new Date(candidate.dateOfSubmission);
        return (
          submissionDate >= new Date(start) && submissionDate <= new Date(end)
        );
      });
    }

    setFilteredCandidates(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterStatus("");
    setDateRange("");
  };

  const exportToExcel = () => {
    const exportData = filteredCandidates.map((candidate) => ({
      "Candidate Name": candidate.candidateName,
      Position: candidate.position,
      Client: candidate.client,
      "Work Status": candidate.workStatus,
      "Offer Status": candidate.offerStatus,
      "Date of Submission": candidate.dateOfSubmission,
    }));

    // Exporting logic (currently commented out)
    // const ws = XLSX.utils.json_to_sheet(exportData);
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Candidates");
    // XLSX.writeFile(wb, "Candidates_Report.xlsx");
  };

  // Pagination logic
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col space-y-4 mb-5">
        <h1 className="text-xl font-bold">Candidates Management</h1>
        <div className="flex flex-wrap gap-4 mb-4">
          {/* Filter Inputs */}
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded w-58"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 p-2 rounded w-59"
          >
            <option value="">Filter By Work Status</option>
            <option value="Released">Released</option>
            <option value="Accepted">Accepted</option>
            <option value="Pending">Pending</option>
            <option value="Declined">Declined</option>
          </select>

          {/* Date Range Picker */}
          <div
            id="date-range-picker"
            date-rangepicker
            className="flex items-center w-80"
          >
            <input
              type="text"
              placeholder="YYYY-MM-DD - YYYY-MM-DD"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <button
            onClick={resetFilters}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-40"
          >
            Reset Filters
          </button>
          <button
            onClick={exportToExcel}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-40"
          >
            Export to Excel
          </button>
          <button
            onClick={() => navigate("/recruitmentForm")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-40"
          >
            + Add Candidate
          </button>
        </div>
      </div>

      {/* Cards or Table Display Section */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Position</th>
              <th className="border border-gray-300 p-2">Client</th>
              <th className="border border-gray-300 p-2">Offer Status</th>
              <th className="border border-gray-300 p-2">Date of Submission</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCandidates.map((candidate) => (
              <tr key={candidate._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-2">
                  {candidate.candidateName}
                </td>
                <td className="border border-gray-300 p-2">
                  {candidate.position}
                </td>
                <td className="border border-gray-300 p-2">
                  {candidate.client}
                </td>
                <td className="border border-gray-300 p-2">
                  {candidate.offerStatus}
                </td>
                <td className="border border-gray-300 p-2">
                  {candidate.dateOfSubmission
                    ? new Date(candidate.dateOfSubmission).toLocaleDateString(
                        "en-GB"
                      )
                    : new Date().toLocaleDateString("en-GB")}
                </td>

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

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <ul className="flex space-x-2">
            {Array.from(
              {
                length: Math.ceil(
                  filteredCandidates.length / candidatesPerPage
                ),
              },
              (_, index) => (
                <li key={index} className="cursor-pointer">
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Candidates;
