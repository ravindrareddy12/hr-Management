import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PageContainer from "./PageContainer";

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

  const [error, setError] = useState<string | null>(null);

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
    <PageContainer title={id ? "Edit Candidate" : "New Candidate"}>
      <div className=" bg-gray-100 min-h-screen">
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <form className="bg-white p-6 rounded-lg " onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-800 "
                htmlFor="tlName"
              >
                <span className="text-red-600">* </span> TL Name
              </label>
              <input
                type="text"
                name="tlName"
                value={formData.tlName || ""}
                onChange={handleChange}
                placeholder="TL Name"
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="taName"
              >
                <span className="text-red-600">* </span> TA Name
              </label>
              <input
                type="text"
                name="taName"
                value={formData.taName || ""}
                onChange={handleChange}
                placeholder="TA Name"
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>
          </div>

          <h1 className="font-bold mt-7">Requirement Details</h1>
          <div className="grid grid-cols-3 gap-4 pt-5">
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
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
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
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
                className="input border p-2 rounded w-full bg-gray-200"
              />
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
                Date of Submission
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

          <h1 className="font-bold mt-7">Candidate Details</h1>
          <div className="grid grid-cols-3 gap-4 pt-5">
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
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
              <input
                type="text"
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                placeholder="Location"
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
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
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-5">
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
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
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
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
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-800"
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
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>
          </div>

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
              <input
                type="text"
                name="noticePeriod"
                value={formData.noticePeriod || ""}
                onChange={handleChange}
                placeholder="Notice Period"
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
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
                className="input border p-2 rounded w-full bg-gray-200"
              />
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
              <input
                type="text"
                name="internalInterviewStatus"
                value={formData.internalInterviewStatus || ""}
                onChange={handleChange}
                placeholder="Internal Interview Status"
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>
          </div>

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
              <input
                type="text"
                name="clientInterviewStatus"
                value={formData.clientInterviewStatus || ""}
                onChange={handleChange}
                placeholder="Client Interview Status"
                className="input border p-2 rounded w-full bg-gray-200"
              />
            </div>
          </div>

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
                <option value="">Filter By Offer Status</option>
                <option value="Released">RELEASED</option>
                <option value="Accepted">ACCEPTED</option>
                <option value="Pending">PENDING</option>
                <option value="Declined">DECLINED</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-800"
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
                className="input border p-2 rounded w-full bg-gray-200"
              />
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

          {/* Submit Button */}
          <div className="pt-5">
            <button
              type="submit"
              // className="bg-gray-400 text-blue-800 px-4 py-2 rounded hover:bg-gray-100 sm:w-40 md:w-40"
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
