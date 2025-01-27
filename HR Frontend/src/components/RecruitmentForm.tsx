import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface FormData {
  [key: string]: string | null;
}

const RecruitmentForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dropdowns, setDropdowns] = useState<{
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
    internalInterviewDate: "",
    internalInterviewStatus: "",
    clientInterviewDate: "",
    clientInterviewStatus: "",
    selectionDate: "",
    salaryOffered: "",
    offerDate: "",
    offerStatus: "",
    epRequest: "",
    joiningDate: "",
    remarks: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      // Navigate to the dropdown form route
      navigate("/dropdownsManager"); // Replace "/dropdowns" with the appropriate route for your dropdown form
    }
  };

  // Fetch dropdown options
  useEffect(() => {
    axios
      .get("http://localhost:5003/api/dropdowns")
      .then((response) => {
        setDropdowns(response.data);
      })
      .catch((err) => {
        console.error("Error fetching dropdowns:", err);
        setError("Failed to load dropdown options.");
      });
  }, []);

  // Fetch candidate data
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5003/api/candidates/${id}`)
        .then((response) => {
          const data = response.data;
          const formattedData = {
            ...data,
            dateOfRequirement: data.dateOfRequirement
              ? new Date(data.dateOfRequirement).toISOString().split("T")[0]
              : "",
            dateOfSubmission: data.dateOfSubmission
              ? new Date(data.dateOfSubmission).toISOString().split("T")[0]
              : "",
            internalInterviewDate: data.internalInterviewDate
              ? new Date(data.internalInterviewDate).toISOString().split("T")[0]
              : "",
            clientInterviewDate: data.clientInterviewDate
              ? new Date(data.clientInterviewDate).toISOString().split("T")[0]
              : "",
            selectionDate: data.selectionDate
              ? new Date(data.selectionDate).toISOString().split("T")[0]
              : "",
            offerDate: data.offerDate
              ? new Date(data.offerDate).toISOString().split("T")[0]
              : "",
            joiningDate: data.joiningDate
              ? new Date(data.joiningDate).toISOString().split("T")[0]
              : "",
          };
          setFormData(formattedData);
        })
        .catch((err) => {
          console.error("Error fetching candidate data:", err);
          setError("Failed to load candidate data.");
        });
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = id
      ? `http://localhost:5003/api/candidates/${id}`
      : "http://localhost:5003/api/candidates";

    try {
      if (id) {
        await axios.put(url, formData);
      } else {
        await axios.post(url, formData);
      }
      navigate("/candidates");
    } catch (err) {
      console.error("Error saving candidate data:", err);
      setError("Failed to save candidate data.");
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-5">
        {id ? "Edit Candidate" : "New Candidate"}
      </h1>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form
        className="bg-white p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={handleDropdownClick}
          >
            {isDropdownOpen ? "Close Dropdowns Form" : "Manage Dropdowns"}
          </button>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="tlName"
            >
              <span className="text-red-600">* </span> TL Name
            </label>

            <select
              name="tlName"
              value={formData.tlName || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            >
              <option value="">Select TL Name</option>
              {dropdowns.tlName.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="taName"
            >
              <span className="text-red-600">* </span>
              TA Name
            </label>
            <select
              name="taName"
              value={formData.taName || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            >
              <option value="">Select TA Name</option>
              {dropdowns.taName.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
            <select
              name="am"
              value={formData.am || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            >
              <option value="">Select AM</option>
              {dropdowns.am.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="client"
            >
              Client
            </label>
            <select
              name="client"
              value={formData.client || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            >
              <option value="">Select Client</option>
              {dropdowns.client.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
              value={formData.position || ""}
              onChange={handleChange}
              placeholder="Position"
              className="input border p-2 rounded w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-5">
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
              value={formData.dateOfRequirement || ""}
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
              value={formData.dateOfSubmission || ""}
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
              value={formData.candidateName || ""}
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
            <select
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            >
              <option value="">Select Location</option>
              {dropdowns.location.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="nationality"
            >
              Nationality
            </label>
            <select
              name="nationality"
              value={formData.nationality || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            >
              <option value="">Select Nationality</option>
              {dropdowns.nationality.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-5">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="workStatus"
            >
              Work Status
            </label>
            <select
              name="workStatus"
              value={formData.workStatus || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            >
              <option value="">Select Work Status</option>
              {dropdowns.workStatus.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
              value={formData.phoneNumber || ""}
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
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Email Id"
              className="input border p-2 rounded w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-5">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="noticePeriod"
            >
              Notice Period
            </label>
            <select
              name="noticePeriod"
              value={formData.noticePeriod || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            >
              <option value="">Select Notice Period</option>
              {dropdowns.noticePeriod.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="workMode"
            >
              Work Mode
            </label>
            <select
              name="workMode"
              value={formData.workMode || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            >
              <option value="">Select Work Mode</option>
              {dropdowns.workMode.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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
              value={formData.currentSalary || ""}
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
              value={formData.expectedSalary || ""}
              onChange={handleChange}
              placeholder="Expected Salary"
              className="input border p-2 rounded w-full"
            />
          </div>
        </div>
        <h1 className="font-bold mt-7">Internal Assessment Details</h1>
        <div className="grid grid-cols-3 gap-4 pt-5">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="internalInterviewDate"
            >
              I/W Date
            </label>
            <input
              type="date"
              name="internalInterviewDate"
              value={formData.internalInterviewDate || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="internalInterviewStatus"
            >
              Status
            </label>
            <select
              name="internalInterviewStatus"
              value={formData.internalInterviewStatus || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            >
              <option value="">Select Internal Interview Status</option>
              {dropdowns.internalInterviewStatus.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h1 className="font-bold mt-7">Client Interview</h1>
        <div className="grid grid-cols-3 gap-4 pt-5">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="clientInterviewDate"
            >
              I/W Date
            </label>
            <input
              type="date"
              name="clientInterviewDate"
              value={formData.clientInterviewDate || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="clientInterviewStatus"
            >
              Status
            </label>
            <select
              name="clientInterviewStatus"
              value={formData.clientInterviewStatus || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            >
              <option value="">Select Client Interview Status</option>
              {dropdowns.clientInterviewStatus.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h1 className="font-bold mt-7">Offer Details</h1>
        <div className="grid grid-cols-3 gap-4 pt-5">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="selectionDate"
            >
              Selection Date
            </label>
            <input
              type="date"
              name="selectionDate"
              value={formData.selectionDate || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="salaryOffered"
            >
              Salary Offered
            </label>
            <input
              type="text"
              name="salaryOffered"
              value={formData.salaryOffered || ""}
              onChange={handleChange}
              placeholder="Salary Offered"
              className="input border p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="offerDate"
            >
              Offer Date
            </label>
            <input
              type="date"
              name="offerDate"
              value={formData.offerDate || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="offerStatus"
            >
              Offer Status
            </label>
            <select
              name="workMode"
              value={formData.offerStatus || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            >
              <option value="">Select Offer Status</option>
              {dropdowns.offerStatus.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="epRequest"
            >
              EP Request
            </label>
            <select
              name="epRequest"
              value={formData.epRequest || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            >
              <option value="">Select EP Request</option>
              {dropdowns.epRequest.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="joiningDate"
            >
              Joining Date
            </label>
            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="remarks"
            >
              Remarks
            </label>
            <textarea
              name="remarks"
              value={formData.remarks || ""}
              onChange={handleChange}
              placeholder="Remarks"
              className="input border p-2 rounded w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-5">
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            {id ? "Update Candidate" : "Add Candidate"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecruitmentForm;
