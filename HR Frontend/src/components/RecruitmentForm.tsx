import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface FormData {
  [key: string]: string | null;
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
              value={formData.tlName || ""}
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
              value={formData.taName || ""}
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
              value={formData.am || ""}
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
              value={formData.client || ""}
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
            <input
              type="text"
              name="location"
              value={formData.location || ""}
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
              value={formData.nationality || ""}
              onChange={handleChange}
              placeholder="Nationality"
              className="input border p-2 rounded w-full"
            />
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
            <input
              type="text"
              name="workStatus"
              value={formData.workStatus || ""}
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
              <option value="15">15 days</option>
              <option value="30">30 days</option>
              <option value="45">45 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
            </select>
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
              value={formData.workMode || ""}
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
            <input
              type="text"
              name="internalInterviewStatus"
              value={formData.internalInterviewStatus || ""}
              onChange={handleChange}
              placeholder="Internal Interview Status"
              className="input border p-2 rounded w-full"
            />
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
            <input
              type="text"
              name="clientInterviewStatus"
              value={formData.clientInterviewStatus || ""}
              onChange={handleChange}
              placeholder="Client Interview Status"
              className="input border p-2 rounded w-full"
            />
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
              name="offerStatus"
              value={formData.offerStatus || ""}
              onChange={handleChange}
              className="input border p-2 rounded w-full"
            >
              <option value="">Select Status</option>
              <option value="Released">Released</option>
              <option value="Accepted">Accepted</option>
              <option value="Pending">Pending</option>
              <option value="Declined">Declined</option>
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="epRequest"
            >
              EP Request
            </label>
            <input
              type="text"
              name="epRequest"
              value={formData.epRequest || ""}
              onChange={handleChange}
              placeholder="EP Request"
              className="input border p-2 rounded w-full"
            />
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
              placeholder="Enter your remarks here..."
              className="textarea border p-2 rounded w-full h-32 resize-none"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default RecruitmentForm;
