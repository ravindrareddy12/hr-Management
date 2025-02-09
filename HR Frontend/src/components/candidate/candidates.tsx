import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx"; // Correct import
import AlertMessage from "../AlertMessage";
import PageContainer from "../layout/PageContainer";
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth

interface Candidate {
  totalYearsOfExperience: string;
  noticePeriod: string;
  workMode: string;
  currentSalary: string;
  expectedSalary: string;
  internalInterviewDate: any;
  internalInterviewStatus: string;
  clientInterviewDate: any;
  clientInterviewStatus: string;
  selectionDate: any;
  salaryOffered: string;
  offerDate: any;
  epRequest: string;
  joiningDate: any;
  remarks: string;
  createdAt: any;
  updatedAt: any;
  nationality: string;
  location: string;
  dateOfRequirement: any;
  am: string;
  taName: string;
  tlName: string;
  phoneNumber: any;
  email: any;
  _id: string;
  candidateName: string;
  position: string;
  client: string;
  workStatus: string;
  dateOfSubmission: any;
  offerStatus: string;
}

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>(""); // State for error message

  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [candidatesPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [dateRange, setDateRange] = useState<string>("");
  const navigate = useNavigate();
  const { user } = useAuth(); // Get the logged-in user

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
  const handleView = (id: string) => {
    navigate(`/candidateDetails/${id}`); // Redirects to the candidate details page
  };

  const applyFilters = () => {
    let filtered = candidates;

    // Filter by name, email, or phone number
    if (searchTerm) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.candidateName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.phoneNumber.includes(searchTerm)
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
    if (filteredCandidates.length === 0) {
      setErrorMessage("No data available to export!");
      return;
    }

    // Define all headers based on the API response
    const headers = [
      "TL Name",
      "TA Name",
      "AM",
      "Client",
      "Position",
      "Date of Requirement",
      "Date of Submission",
      "Candidate Name",
      "Location",
      "Nationality",
      "Work Status",
      "Phone Number",
      "Email",
      "Total Years of Experience",
      "Notice Period",
      "Work Mode",
      "Current Salary",
      "Expected Salary",
      "Internal Interview Date",
      "Internal Interview Status",
      "Client Interview Date",
      "Client Interview Status",
      "Selection Date",
      "Salary Offered",
      "Offer Date",
      "Offer Status",
      "EP Request",
      "Joining Date",
      "Remarks",
      "Created At",
      "Updated At",
    ];

    // Prepare the data
    const formatDateForExcel = (date) => {
      return date && new Date(date).getTime() !== 0
        ? new Date(date).toISOString().split("T")[0] // Convert to YYYY-MM-DD
        : "";
    };

    const exportData = filteredCandidates.map((candidate) => [
      candidate.tlName || "",
      candidate.taName || "",
      candidate.am || "",
      candidate.client || "",
      candidate.position || "",
      formatDateForExcel(candidate.dateOfRequirement),
      formatDateForExcel(candidate.dateOfSubmission),
      candidate.candidateName || "",
      candidate.location || "",
      candidate.nationality || "",
      candidate.workStatus || "",
      candidate.phoneNumber || "",
      candidate.email || "",
      candidate.totalYearsOfExperience || "",
      candidate.noticePeriod || "",
      candidate.workMode || "",
      candidate.currentSalary || "",
      candidate.expectedSalary || "",
      formatDateForExcel(candidate.internalInterviewDate),
      candidate.internalInterviewStatus || "",
      formatDateForExcel(candidate.clientInterviewDate),
      candidate.clientInterviewStatus || "",
      formatDateForExcel(candidate.selectionDate),
      candidate.salaryOffered || "",
      formatDateForExcel(candidate.offerDate),
      candidate.offerStatus || "",
      candidate.epRequest || "",
      formatDateForExcel(candidate.joiningDate),
      candidate.remarks || "",
      formatDateForExcel(candidate.createdAt),
      formatDateForExcel(candidate.updatedAt),
    ]);

    // Add headers as the first row
    const finalData = [headers, ...exportData];

    // Create worksheet and workbook
    const ws = XLSX.utils.aoa_to_sheet(finalData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "All Candidates Data");

    // Apply styles to the headers
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } }, // White font color
      fill: { fgColor: { rgb: "007ACC" } }, // Blue background
      alignment: { horizontal: "center" },
    };

    // Apply styles only to header row
    const range = XLSX.utils.decode_range(ws["!ref"] || "");
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cell = ws[XLSX.utils.encode_cell({ r: 0, c: col })];
      if (cell) {
        cell.s = headerStyle; // Apply headerStyle to each header cell
      }
    }

    // Auto-fit columns for better readability
    const maxColWidths = headers.map((header, i) =>
      Math.max(
        header.length,
        ...exportData.map((row) => (row[i] ? row[i].toString().length : 0))
      )
    );

    ws["!cols"] = maxColWidths.map((width) => ({ wch: width + 5 }));

    // Trigger download
    XLSX.writeFile(wb, "Candidates_Report.xlsx");
  };

  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <PageContainer
      title={"Candidates"}
      description="Manage and view all candidates."
    >
      <div>
        {errorMessage && (
          <AlertMessage
            message={errorMessage}
            onClose={() => setErrorMessage("")}
            type={"info"}
          />
        )}

        <div className="flex flex-col space-y-4 mb-5">
          <div className="flex flex-wrap gap-4 mb-4 pt-4">
            <input
              type="text"
              placeholder="Search ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 p-2 rounded w-70 sm:w-70 md:w-70"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 p-2 rounded w-70 sm:w-70 md:w-70"
            >
              <option value="">Filter By Offer Status</option>
              <option value="Released">RELEASED</option>
              <option value="Accepted">ACCEPTED</option>
              <option value="Pending">PENDING</option>
              <option value="Declined">DECLINED</option>
            </select>

            <button
              onClick={resetFilters}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-800 hover:text-white sm:w-40 md:w-40"
            >
              Reset Filters
            </button>
            <button
              onClick={exportToExcel}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-800 hover:text-white sm:w-40 md:w-40"
            >
              Export to Excel
            </button>
            <button
              onClick={() => navigate("/recruitmentForm")}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-800 hover:text-white sm:w-40 md:w-40"
            >
              + Add Candidate
            </button>
          </div>
        </div>

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
              <tr key={candidate._id} className="hover:bg-gray-100 text-center">
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
                  {candidate.dateOfSubmission &&
                  new Date(candidate.dateOfSubmission).getTime() !== 0
                    ? new Date(candidate.dateOfSubmission).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )
                    : ""}
                </td>

                <td className="border border-gray-300 p-2 text-center">
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
                        ? "bg-gray-800 text-white"
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
    </PageContainer>
  );
};

export default Candidates;
