const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    tlName: String,
    taName: String,
    am: String,
    client: String,
    position: String,
    dateOfRequirement: Date,
    dateOfSubmission: Date,
    candidateName: String,
    location: String,
    nationality: String,
    workStatus: String,
    phoneNumber: String,
    email: String,
    noticePeriod: String,
    workMode: String,
    currentSalary: String,
    expectedSalary: String,
    firstInterviewDate: Date,
    firstInterviewStatus: String,
    secondInterviewDate: Date,
    secondInterviewStatus: String,
    selectionDate: Date,
    salaryOffered: String,
    offerDate: Date,
    offerStatus: String,
    epRequest: String,
    joiningDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);
