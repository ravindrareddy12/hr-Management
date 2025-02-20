import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageContainer from "../layout/PageContainer";
import AlertMessage from "../AlertMessage";
const API_URL = import.meta.env.VITE_API_URL;
import { FaSpinner } from "react-icons/fa";

interface Candidate {
  candidateName: string;
  position: string;
  client: string;
  workStatus: string;
  phoneNumber: string;
  email: string;
  totalYearsOfExperience: string;
  noticePeriod: string;
  workMode: string;
  currentSalary: string;
  expectedSalary: string;
  internalInterviewDate: string;
  internalInterviewStatus: string;
  clientInterviewDate: string;
  clientInterviewStatus: string;
  selectionDate: string;
  salaryOffered: string;
  offerDate: string;
  offerStatus: string;
  epRequest: string;
  joiningDate: string;
  remarks: string;
  createdAt: string;
  updatedAt: string;
  nationality: string;
  location: string;
  dateOfRequirement: string;
  am: string;
  taName: string;
  tlName: string;
  dateOfSubmission: string;
}

const CandidateDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCandidateDetails();
  }, []);

  const fetchCandidateDetails = async () => {
    try {
      const response = await fetch(API_URL + `/api/candidates/${id}`);
      if (!response.ok) throw new Error("Failed to fetch candidate details.");
      const data = await response.json();
      setCandidate(data);
    } catch (error) {
      setErrorMessage("Error fetching candidate details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageContainer
        title="Candidate Details"
        description="Loading candidate information..."
      >
        <div className="flex items-center justify-center h-screen">
          <FaSpinner className="animate-spin text-blue-800 text-4xl" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title="Candidate Details"
      description="View candidate information"
    >
      {errorMessage && (
        <AlertMessage
          message={errorMessage}
          onClose={() => setErrorMessage("")}
          type="error"
        />
      )}

      {candidate ? (
        <div className="bg-white p-6  rounded-lg">
          <h2 className="text-2xl font-bold mb-4">{candidate.candidateName}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Assignment & Timeline Details
              </h3>

              <p>
                <strong>TA Name:</strong> {candidate.taName}
              </p>
              <p>
                <strong>TL Name:</strong> {candidate.tlName}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {candidate.createdAt
                  ? new Date(candidate.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {candidate.updatedAt
                  ? new Date(candidate.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Requirement Details
              </h3>
              <p>
                <strong>AM:</strong> {candidate.am}
              </p>

              <p>
                <strong>Client:</strong> {candidate.client}
              </p>
              <p>
                <strong>Position:</strong> {candidate.position}
              </p>
              <p>
                <strong>Date of Requirement:</strong>{" "}
                {candidate.dateOfRequirement &&
                new Date(candidate.dateOfRequirement).getTime() !== 0
                  ? new Date(candidate.dateOfRequirement).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )
                  : ""}
              </p>
              <p>
                <strong>Date of Submission:</strong>{" "}
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
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Candidate Details
              </h3>

              <p>
                <strong>Location:</strong> {candidate.location}
              </p>
              <p>
                <strong>Nationality:</strong> {candidate.nationality}
              </p>
              <p>
                <strong>Work Status:</strong> {candidate.workStatus}
              </p>
              <p>
                <strong>Phone Number:</strong> {candidate.phoneNumber}
              </p>
              <p>
                <strong>Email:</strong> {candidate.email}
              </p>
              <p>
                <strong>Total Experience:</strong>{" "}
                {candidate.totalYearsOfExperience}
              </p>
              <p>
                <strong>Notice Period:</strong> {candidate.noticePeriod}
              </p>
              <p>
                <strong>Work Mode:</strong> {candidate.workMode}
              </p>
              <p>
                <strong>Current Salary:</strong> {candidate.currentSalary}
              </p>
              <p>
                <strong>Expected Salary:</strong> {candidate.expectedSalary}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Offer Details
              </h3>

              <p>
                <strong>Selection Date:</strong>{" "}
                {candidate.selectionDate &&
                new Date(candidate.selectionDate).getTime() !== 0
                  ? new Date(candidate.selectionDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )
                  : ""}
              </p>
              <p>
                <strong>Salary Offered:</strong> {candidate.salaryOffered}
              </p>
              <p>
                <strong>Offer Date:</strong>{" "}
                {candidate.offerDate &&
                new Date(candidate.offerDate).getTime() !== 0
                  ? new Date(candidate.offerDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : ""}
              </p>
              <p>
                <strong>Offer Status:</strong> {candidate.offerStatus}
              </p>
              <p>
                <strong>EP Request:</strong> {candidate.epRequest}
              </p>
              <p>
                <strong>Joining Date:</strong>
                {candidate.joiningDate &&
                new Date(candidate.joiningDate).getTime() !== 0
                  ? new Date(candidate.joiningDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )
                  : ""}{" "}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Internal Assessment Details
              </h3>

              <p>
                <strong>Internal Interview Date:</strong>
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
              </p>
              <p>
                <strong>Internal Interview Status:</strong>
                {candidate.internalInterviewStatus}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Client Assessment Details
              </h3>

              <p>
                <strong>Client Interview Date:</strong>
                {candidate.clientInterviewDate &&
                new Date(candidate.clientInterviewDate).getTime() !== 0
                  ? new Date(candidate.clientInterviewDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )
                  : ""}
              </p>
              <p>
                <strong>Client Interview:</strong>
                {candidate.clientInterviewStatus}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">
                Remarks
              </h3>

              <p> {candidate.remarks}</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <p>No candidate data found.</p>
      )}
    </PageContainer>
  );
};

export default CandidateDetails;
