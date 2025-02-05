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
    totalYearsOfExperience :String,
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
    remarks:String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateSchema);
