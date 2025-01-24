const Candidate = require("../models/Candidate");

// Get all candidates
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
};

// Get a candidate by ID
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ error: "Candidate not found" });
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch candidate" });
  }
};

// Create a new candidate
exports.createCandidate = async (req, res) => {
  try {
    const newCandidate = new Candidate(req.body);
    const savedCandidate = await newCandidate.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    res.status(400).json({ error: "Failed to create candidate" });
  }
};

// Update a candidate
exports.updateCandidate = async (req, res) => {
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCandidate) return res.status(404).json({ error: "Candidate not found" });
    res.json(updatedCandidate);
  } catch (error) {
    res.status(400).json({ error: "Failed to update candidate" });
  }
};

// Delete a candidate
exports.deleteCandidate = async (req, res) => {
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!deletedCandidate) return res.status(404).json({ error: "Candidate not found" });
    res.json({ message: "Candidate deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete candidate" });
  }
};
// Get recent candidates
exports.getRecentCandidates = async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 5; // Get the limit from query parameters, default to 5
      const recentCandidates = await Candidate.find()
        .sort({ createdAt: -1 }) // Sort by creation date in descending order
        .limit(limit); // Limit the number of results
      res.json(recentCandidates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent candidates" });
    }
  };
  