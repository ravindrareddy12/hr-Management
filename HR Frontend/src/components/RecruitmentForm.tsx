import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
interface FormData {
  tlName: string;
  taName: string;
  am: string;
  client: string;
  position: string;
  dateOfRequirement: string;
  dateOfSubmission: string;
  candidateName: string;
  location: string;
  nationality: string;
  workStatus: string;
  phoneNumber: string;
  email: string;
  noticePeriod: string;
  workMode: string;
  currentSalary: string;
  expectedSalary: string;
  firstInterviewDate: string;
  firstInterviewStatus: string;
  secondInterviewDate: string;
  secondInterviewStatus: string;
  selectionDate: string;
  salaryOffered: string;
  offerDate: string;
  offerStatus: string;
  epRequest: string;
  joiningDate: string;
}


const RecruitmentForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    tlName: "",
    taName: "",
    am: "",
    client: "",
    position: "",
    dateOfRequirement: "",
    dateOfSubmission: "",
    candidateName: "",
    location: "",
    nationality: "",
    workStatus: "",
    phoneNumber: "",
    email: "",
    noticePeriod: "",
    workMode: "",
    currentSalary: "",
    expectedSalary: "",
    firstInterviewDate: "",
    firstInterviewStatus: "",
    secondInterviewDate: "",
    secondInterviewStatus: "",
    selectionDate: "",
    salaryOffered: "",
    offerDate: "",
    offerStatus: "",
    epRequest: "",
    joiningDate: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5003/api/candidates/${id}`)
        .then((response) => {
          const data = response.data;
  
          // Format the date fields to "YYYY-MM-DD"
          const formattedData = {
            ...data,
            dateOfRequirement: data.dateOfRequirement
              ? new Date(data.dateOfRequirement).toISOString().split("T")[0]
              : "",
            dateOfSubmission: data.dateOfSubmission
              ? new Date(data.dateOfSubmission).toISOString().split("T")[0]
              : "",
          };
  
          setFormData(formattedData);
        })
        .catch((error) => {
          console.error("Error fetching candidate data:", error);
        });
    }
  }, [id]);
  
  

  const [error, setError] = useState<string | null>(null);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const url = id
      ? `http://localhost:5003/api/candidates/${id}` // URL for updating a candidate
      : "http://localhost:5003/api/candidates"; // URL for creating a new candidate
  
    const requestData = {
      ...formData,
      // Convert date fields to ISO format if necessary for the backend
      dateOfRequirement: formData.dateOfRequirement
        ? new Date(formData.dateOfRequirement).toISOString()
        : null,
      dateOfSubmission: formData.dateOfSubmission
        ? new Date(formData.dateOfSubmission).toISOString()
        : null,
    };
  
    try {
      if (id) {
        // Update existing candidate (PUT request)
        await axios.put(url, requestData);
      } else {
        // Create new candidate (POST request)
        await axios.post(url, requestData);
      }
  
      // Navigate back to the candidates list
      navigate("/candidates");
    } catch (error) {
      console.error("Error saving candidate data:", error);
      alert("An error occurred while saving the candidate data. Please try again.");
    }
  };
  

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5">Recruitment Tracking Form</h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}
      <form
        className="bg-white p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        {/* Form Fields */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="tlName"
            >
              TL Name
            </label>
            <input
              type="text"
              name="tlName"
              value={formData.tlName}
              onChange={handleChange}
              placeholder="TL Name"
              className="input border p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="taName"
            >
              TA Name
            </label>
            <input
              type="text"
              name="taName"
              value={formData.taName}
              onChange={handleChange}
              placeholder="TA Name"
              className="input border p-2 rounded w-full"
            />
          </div>
        </div>

        <h1 className="font-bold mt-7">Requirement Details</h1>
        <div className="grid grid-cols-3 gap-4 pt-5">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="am"
            >
              AM
            </label>
            <input
              type="text"
              name="am"
              value={formData.am}
              onChange={handleChange}
              placeholder="AM"
              className="input border p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="client"
            >
              Client
            </label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              placeholder="Client"
              className="input border p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="position"
            >
              Position
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Position"
              className="input border p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Date Fields */}
        <div className="grid grid-cols-2 gap-4 pt-5">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="dateOfRequirement"
            >
              Date of Requirement
            </label>
            <input
              type="date"
              name="dateOfRequirement"
              value={formData.dateOfRequirement}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="dateOfSubmission"
            >
              Date of Submission
            </label>
            <input
              type="date"
              name="dateOfSubmission"
              value={formData.dateOfSubmission}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            />
          </div>
        </div>

        <h1 className="font-bold mt-7">Candidate Details</h1>
        <div className="grid grid-cols-3 gap-4 pt-5">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="candidateName"
            >
              Candidate Name
            </label>
            <input
              type="text"
              name="candidateName"
              value={formData.candidateName}
              onChange={handleChange}
              placeholder="Candidate Name"
              className="input border p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="input border p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="nationality"
            >
              Nationality
            </label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              placeholder="Nationality"
              className="input border p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Additional Fields and Labels */}
        <div className="grid grid-cols-3 gap-4 pt-5">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="workStatus"
            >
              Work Status
            </label>
            <input
              type="text"
              name="workStatus"
              value={formData.workStatus}
              onChange={handleChange}
              placeholder="Work Status"
              className="input border p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="input border p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email Id
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Id"
              className="input border p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Remaining Fields and Labels */}
        <div className="grid grid-cols-3 gap-4 pt-5">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="noticePeriod"
            >
              Notice Period
            </label>
            <input
              type="text"
              name="noticePeriod"
              value={formData.noticePeriod}
              onChange={handleChange}
              placeholder="Notice Period"
              className="input border p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="workMode"
            >
              Work Mode
            </label>
            <input
              type="text"
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              placeholder="Work Mode"
              className="input border p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="currentSalary"
            >
              Current Salary
            </label>
            <input
              type="text"
              name="currentSalary"
              value={formData.currentSalary}
              onChange={handleChange}
              placeholder="Current Salary"
              className="input border p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="currentSalary"
            >
              Expected Salary
            </label>
            <input
              type="text"
              name="expectedSalary"
              value={formData.expectedSalary}
              onChange={handleChange}
              placeholder="Expected Salary"
              className="input border p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RecruitmentForm;
