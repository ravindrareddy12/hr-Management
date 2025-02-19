const Candidate = require("../models/Candidate");
const User = require("../models/User");
// Get all candidates
exports.getAllCandidates = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: "Unauthorized: Missing userId" });
    }

    // Fetch the logged-in user
    const loggedInUser = await User.findById(req.user.userId);
    if (!loggedInUser) {
        return res.status(404).json({ error: "User not found" });
    }

    let candidates;

    if (loggedInUser.role === "team-leader") {
        // Find all team members where teamLeader is the logged-in user
        const teamMembers = await User.find({ teamLeader: loggedInUser._id }).select("_id");
        const memberIds = teamMembers.map(member => member._id); // Extract user IDs

        // Fetch candidates where userId is either the team leader or any of their team members
        candidates = await Candidate.find({ userId: { $in: [loggedInUser._id, ...memberIds] } });

    } else if (loggedInUser.role === "admin") {
        // Fetch all candidates irrespective of users
        candidates = await Candidate.find({});
    } else {
        // If not a team leader or admin, fetch only their own candidates
        candidates = await Candidate.find({ userId: loggedInUser._id });
    }

    res.status(200).json({ success: true, data: candidates });

} catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Failed to fetch candidates", details: error.message });
}

};
// Get a candidate by ID
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate)
      return res.status(404).json({ error: "Candidate not found" });
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch candidate" });
  }
};

// Create a new candidate
exports.createCandidate = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized: Missing userId" });
    }

    req.body.userId = req.user.userId;

    const newCandidate = new Candidate(req.body);
    const savedCandidate = await newCandidate.save();

    res.status(201).json(savedCandidate);
  } catch (error) {
    console.error("Error creating candidate:", error); // Logs error for debugging
    res
      .status(500)
      .json({ error: "Failed to create candidate", details: error.message });
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
    if (!updatedCandidate)
      return res.status(404).json({ error: "Candidate not found" });
    res.json(updatedCandidate);
  } catch (error) {
    res.status(400).json({ error: "Failed to update candidate" });
  }
};

// Delete a candidate
exports.deleteCandidate = async (req, res) => {
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!deletedCandidate)
      return res.status(404).json({ error: "Candidate not found" });
    res.json({ message: "Candidate deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete candidate" });
  }
};
// Get recent candidates
exports.getRecentCandidates = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: "Unauthorized: Missing userId" });
    }

    // Fetch the logged-in user
    const loggedInUser = await User.findById(req.user.userId);
    if (!loggedInUser) {
        return res.status(404).json({ error: "User not found" });
    }

    let candidates;

    if (loggedInUser.role === "admin") {
        // Admin fetches the 5 most recent candidates for all users
        candidates = await Candidate.find({})
            .sort({ createdAt: -1 })
            .limit(5);
    } else if (loggedInUser.role === "team-leader") {
        // Find all team members where teamLeader is the logged-in user
        const teamMembers = await User.find({ teamLeader: loggedInUser._id }).select("_id");
        const memberIds = teamMembers.map(member => member._id);

        // Fetch the 5 most recent candidates for the team leader and their team members
        candidates = await Candidate.find({ userId: { $in: [loggedInUser._id, ...memberIds] } })
            .sort({ createdAt: -1 })
            .limit(5);
    } else {
        // Normal user fetches only their 5 most recent candidates
        candidates = await Candidate.find({ userId: loggedInUser._id })
            .sort({ createdAt: -1 })
            .limit(5);
    }

    res.status(200).json({ success: true, data: candidates });

} catch (error) {
    console.error("Error fetching recent candidates:", error);
    res.status(500).json({
        error: "Failed to fetch recent candidates",
        details: error.message,
    });
}

};
