import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PageContainer from "../layout/PageContainer";
import { useAuth } from "../../contexts/AuthContext"; // Import useAuth
const API_URL = import.meta.env.VITE_API_URL;
import AlertMessage from "../AlertMessage";

interface FormData {
  [key: string]: string | null;
}

interface DropdownOptions {
  [key: string]: string[];
}

const RecruitmentForm: React.FC = () => {
  const { user } = useAuth(); // Get the logged-in user
  const { id } = useParams();
  const navigate = useNavigate();
  const [unmatchedFields, setUnmatchedFields] = useState<string[]>([]);
  const [alert, setAlert] = useState<{ message: string; type: any } | null>(
    null
  );

  const [dropdownOptions, setDropdownOptions] = useState<DropdownOptions>({});
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
    totalYearsOfExperience: "",
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
  const mandatoryFields = [
    "tlName",
    "taName",
    "candidateName",
    "phoneNumber",
    "email",
    "client",
    "dateOfSubmission",
  ]; // Add other mandatory fields as needed
  const [error, setError] = useState<string | null>(null);

  // Fetch dropdown options
  useEffect(() => {
    axios
      .get(`${API_URL}/api/dropdowns`)
      .then((response) => {
        const options: DropdownOptions = {};
        const unmatched: string[] = [];

        response.data.forEach((dropdown) => {
          options[dropdown.name] = dropdown.options;

          // Add to unmatchedFields if the field is not in formData
          if (!formData.hasOwnProperty(dropdown.name)) {
            unmatched.push(dropdown.name);
          }
        });

        setDropdownOptions(options);
        setUnmatchedFields(unmatched); // Set unmatched fields only once
      })
      .catch((error) => console.error(error));
  }, []); // Empty dependency array to run only once

  // Fetch candidate data if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/api/candidates/${id}`)
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

    // Check for mandatory fields
    const missingFields = mandatoryFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setAlert({
        message: `Please fill out the following mandatory fields: ${missingFields.join(
          ", "
        )}`,
        type: "error",
      });
      return; // Stop form submission if mandatory fields are missing
    }

    // Cooling period check based on phone number or email
    try {
      const response = await axios.get(
        `${API_URL}/api/candidates/colingPeriodCheck/cool`,
        {
          params: {
            phoneNumber: formData.phoneNumber, // Use phone number or email
            email: formData.email,
            client: formData.client,
          },
        }
      );

      const submissions = response.data;
      console.log("Submissions from backend:", submissions);

      // Check if there is any submission within the last 30 days
      const coolingPeriodActive = submissions.some((submission: any) => {
        const submissionDate = new Date(submission.dateOfSubmission);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - submissionDate.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24);

        console.log("Submission Date:", submissionDate);
        console.log("Current Date:", currentDate);
        console.log("Days Difference:", daysDifference);

        return daysDifference < 30;
      });

      if (coolingPeriodActive) {
        setAlert({
          message:
            "Candidate cannot be submitted to the same client within 30 days of the last submission.",
          type: "error",
        });
        return; // Stop form submission if cooling period is active
      }
    } catch (err) {
      console.error("Error fetching submission history:", err);
      setAlert({
        message: "Failed to check cooling period. Please try again.",
        type: "error",
      });
      return; // Stop form submission if there's an error
    }

    // Proceed with submission if cooling period is not active
    const url = id
      ? `${API_URL}/api/candidates/${id}`
      : `${API_URL}/api/candidates`;

    try {
      if (id) {
        await axios.put(url, formData, {
          withCredentials: true,
        });
        setAlert({
          message: "Candidate updated successfully!",
          type: "success",
        });
      } else {
        await axios.post(url, formData, {
          withCredentials: true,
        });
        setAlert({ message: "Candidate added successfully!", type: "info" });
      }

      // Keep alert visible for 5 seconds before navigating
      setTimeout(() => {
        setAlert(null);
        navigate("/candidates");
      }, 5000); // Wait 5 seconds before navigating
    } catch (err) {
      console.error("Error saving candidate data:", err);
      setAlert({ message: "Failed to save candidate data.", type: "error" });

      // Hide error message after 5 seconds
      setTimeout(() => setAlert(null), 5000);
    }
  };
  const handleNavigateToDropdownManager = () => {
    navigate("/dropdownManager"); // Navigate to the DropdownManager page
  };
  return (
    <PageContainer title={id ? "Edit Candidate" : "New Candidate"}>
      <button
        onClick={handleNavigateToDropdownManager}
        className="text-gray-800 hover:text-blue-800"
      >
        Dropdown Manager
      </button>
      <div className="bg-gray-100 min-h-screen">
        {alert && (
          <AlertMessage
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <form className="bg-white p-6 rounded-lg" onSubmit={handleSubmit}>
          {/* TL Name */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="tlName"
              >
                <span className="text-red-600">* </span> TL Name
              </label>
              <select
                name="tlName"
                value={formData.tlName || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              >
                <option value="">Select TL Name</option>
                {dropdownOptions.tlName?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* TA Name */}
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="taName"
              >
                <span className="text-red-600">* </span> TA Name
              </label>
              <select
                name="taName"
                value={formData.taName || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              >
                <option value="">Select TA Name</option>
                {dropdownOptions.taName?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Requirement Details */}
          <h1 className="font-bold mt-7">Requirement Details</h1>
          <div className="grid grid-cols-3 gap-4 pt-5">
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="am"
              >
                AM
              </label>
              <select
                name="am"
                value={formData.am || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              >
                <option value="">Select AM</option>
                {dropdownOptions.am?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="client"
              >
                <span className="text-red-600">* </span> Client
              </label>
              <select
                name="client"
                value={formData.client || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              >
                <option value="">Select Client</option>
                {dropdownOptions.client?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
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
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-3 gap-4 pt-5">
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="dateOfRequirement"
              >
                Date of Requirement
              </label>
              <input
                type="date"
                name="dateOfRequirement"
                value={formData.dateOfRequirement || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="dateOfSubmission"
              >
                <span className="text-red-600">* </span>Date of Submission
              </label>
              <input
                type="date"
                name="dateOfSubmission"
                value={formData.dateOfSubmission || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>
          </div>

          {/* Candidate Details */}
          <h1 className="font-bold mt-7">Candidate Details</h1>
          <div className="grid grid-cols-3 gap-4 pt-5">
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="candidateName"
              >
                <span className="text-red-600">* </span> Candidate Name
              </label>

              <input
                type="text"
                name="candidateName"
                value={formData.candidateName || ""}
                onChange={handleChange}
                placeholder="Candidate Name"
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="location"
              >
                Location
              </label>
              <select
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              >
                <option value="">Select Location</option>
                {dropdownOptions.location?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="nationality"
              >
                Nationality
              </label>
              <select
                name="nationality"
                value={formData.nationality || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              >
                <option value="">Select Nationality</option>
                {dropdownOptions.nationality?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Work Details */}
          <div className="grid grid-cols-3 gap-4 pt-5">
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="workStatus"
              >
                Work Status
              </label>
              <select
                name="workStatus"
                value={formData.workStatus || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              >
                <option value="">Select Work Status</option>
                {dropdownOptions.workStatus?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="phoneNumber"
              >
                <span className="text-red-600">* </span> Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                placeholder="Phone Number"
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="email"
              >
                <span className="text-red-600">* </span> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                placeholder="Email Id"
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>
          </div>

          {/* Experience and Salary */}
          <div className="grid grid-cols-3 gap-4 pt-5">
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="totalYearsOfExperience"
              >
                Total Years Of Experience
              </label>
              <input
                type="text"
                name="totalYearsOfExperience"
                value={formData.totalYearsOfExperience || ""}
                onChange={handleChange}
                placeholder="Total Years Of Experience"
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="noticePeriod"
              >
                Notice Period
              </label>
              <select
                name="noticePeriod"
                value={formData.noticePeriod || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              >
                <option value="">Select Notice Period</option>
                {dropdownOptions.noticePeriod?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="workMode"
              >
                Work Mode
              </label>
              <select
                name="workMode"
                value={formData.workMode || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              >
                <option value="">Select Work Mode</option>
                {dropdownOptions.workMode?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
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
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="expectedSalary"
              >
                Expected Salary
              </label>
              <input
                type="text"
                name="expectedSalary"
                value={formData.expectedSalary || ""}
                onChange={handleChange}
                placeholder="Expected Salary"
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>
          </div>

          {/* Internal Assessment Details */}
          <h1 className="font-bold mt-7">Internal Assessment Details</h1>
          <div className="grid grid-cols-3 gap-4 pt-5">
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="internalInterviewDate"
              >
                I/W Date
              </label>
              <input
                type="date"
                name="internalInterviewDate"
                value={formData.internalInterviewDate || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="internalInterviewStatus"
              >
                Status
              </label>
              <select
                name="internalInterviewStatus"
                value={formData.internalInterviewStatus || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              >
                <option value="">Select Status</option>
                {dropdownOptions.internalInterviewStatus?.map(
                  (option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* Client Interview */}
          <h1 className="font-bold mt-7">Client Interview</h1>
          <div className="grid grid-cols-3 gap-4 pt-5">
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="clientInterviewDate"
              >
                I/W Date
              </label>
              <input
                type="date"
                name="clientInterviewDate"
                value={formData.clientInterviewDate || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="clientInterviewStatus"
              >
                Status
              </label>
              <select
                name="clientInterviewStatus"
                value={formData.clientInterviewStatus || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              >
                <option value="">Select Status</option>
                {dropdownOptions.clientInterviewStatus?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Offer Details */}
          <h1 className="font-bold mt-7">Offer Details</h1>
          <div className="grid grid-cols-3 gap-4 pt-5">
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="selectionDate"
              >
                Selection Date
              </label>
              <input
                type="date"
                name="selectionDate"
                value={formData.selectionDate || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
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
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="offerDate"
              >
                Offer Date
              </label>
              <input
                type="date"
                name="offerDate"
                value={formData.offerDate || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="offerStatus"
              >
                Offer Status
              </label>
              <select
                name="offerStatus"
                value={formData.offerStatus || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              >
                <option value="">Offer Status</option>
                {dropdownOptions.offerStatus?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="epRequest"
              >
                EP Request
              </label>
              <select
                name="epRequest"
                value={formData.epRequest || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              >
                <option value="">EP Request</option>
                {dropdownOptions.epRequest?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="joiningDate"
              >
                Joining Date
              </label>
              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate || ""}
                onChange={handleChange}
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="remarks"
              >
                Remarks
              </label>
              <textarea
                name="remarks"
                value={formData.remarks || ""}
                onChange={handleChange}
                placeholder="Remarks"
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>
          </div>
          {/* Unmatched Fields */}
          <div className="grid grid-cols-3 gap-4 mt-7">
            {unmatchedFields.map((field) => (
              <div key={field}>
                <label
                  className="block text-sm font-medium text-gray-800"
                  htmlFor={field}
                >
                  {field}
                </label>
                <select
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  className="input border p-2 rounded w-full bg-gray-200"
                >
                  <option value="">Select {field}</option>
                  {dropdownOptions[field]?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="pt-5">
            <button
              type="submit"
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-800 hover:text-white sm:w-40 md:w-40"
            >
              {id ? "Update Candidate" : "Add Candidate"}
            </button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
};

export default RecruitmentForm;
