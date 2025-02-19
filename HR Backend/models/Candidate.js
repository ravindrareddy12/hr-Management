const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    tlName: String,
    taName: String,
    am: String,
    position: String,
    dateOfRequirement: Date,
    candidateName: String,
    location: String,
    nationality: String,
    workStatus: String,
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    client: { type: String, required: true },
    dateOfSubmission: { type: Date, default: Date.now },  
    totalYearsOfExperience: String,
    noticePeriod: String,
    workMode: String,
    currentSalary: String,
    expectedSalary: String,
    internalInterviewDate: Date,
    internalInterviewStatus: String,
    clientInterviewDate: Date,
    clientInterviewStatus: String,
    selectionDate: Date,
    salaryOffered: String,
    offerDate: Date,
    offerStatus: String,
    epRequest: String,
    joiningDate: Date,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    remarks: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);
