const express = require("express");
const router = express.Router();
const User = require("../models/User");
const candidateController = require("../controllers/candidateController");
const Candidate = require("../models/Candidate");
const { authenticate } = require("../middlewares/authMiddleware");

router.get("/", authenticate,candidateController.getAllCandidates);
router.get("/:id", candidateController.getCandidateById);
router.post("/",authenticate, candidateController.createCandidate);
router.put("/:id", candidateController.updateCandidate);
router.delete("/:id", candidateController.deleteCandidate);
router.get("/recent/limit",authenticate, candidateController.getRecentCandidates);
router.get("/statistics/st",authenticate, async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: "Unauthorized: Missing userId" });
    }

    // Fetch the logged-in user
    const loggedInUser = await User.findById(req.user.userId);
    if (!loggedInUser) {
        return res.status(404).json({ error: "User not found" });
    }

    let candidateFilter = {};

    if (loggedInUser.role === "admin") {
        // Admin can fetch all users' candidates
        candidateFilter = {};
    } else if (loggedInUser.role === "team-leader") {
        // Get team members assigned to the team leader
        const teamMembers = await User.find({ teamLeader: loggedInUser._id }).select("_id");
        const memberIds = teamMembers.map(member => member._id);

        // Include both team leader and team members' candidates
        candidateFilter = { userId: { $in: [loggedInUser._id, ...memberIds] } };
    } else {
        // Normal user fetches only their own candidates
        candidateFilter = { userId: loggedInUser._id };
    }

    // Calculate statistics based on filtered candidates
    const totalCandidates = await Candidate.countDocuments(candidateFilter);
    const offersMade = await Candidate.countDocuments({
        ...candidateFilter,
        offerStatus: { $in: ["Released", "Accepted"] },
    });
    const candidatesJoined = await Candidate.countDocuments({
        ...candidateFilter,
        offerStatus: "Accepted",
    });

    // Generate monthly data dynamically
    const monthlyData = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
        const startOfMonth = new Date(now.getFullYear(), i, 1);
        const endOfMonth = new Date(now.getFullYear(), i + 1, 0);

        const applications = await Candidate.countDocuments({
            ...candidateFilter,
            createdAt: { $gte: startOfMonth, $lte: endOfMonth },
        });

        monthlyData.push({
            month: startOfMonth.toLocaleString("default", { month: "short" }),
            applications,
        });
    }

    res.status(200).json({
        totalCandidates,
        offersMade,
        candidatesJoined,
        monthlyData,
    });

} catch (err) {
    console.error("Error fetching statistics:", err);
    res.status(500).json({ error: "Failed to fetch statistics", details: err.message });
}

});

router.get("/colingPeriodCheck/cool", async (req, res) => {
    console.log("Submission history route hit");
    const { phoneNumber, email, client } = req.query;
    console.log("Query Parameters:", { phoneNumber, email, client });
  
    try {
      const submissions = await Candidate.find({
        $or: [
          { phoneNumber: { $regex: new RegExp(`^${phoneNumber}$`, "i") } },
          { email: { $regex: new RegExp(`^${email}$`, "i") } }
        ],
        client: { $regex: new RegExp(`^${client}$`, "i") }
      }).select("dateOfSubmission");
  
      console.log("Submissions:", submissions);
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching submission history:", error);
      res.status(500).json({ message: "Failed to fetch submission history" });
    }
  });

module.exports = router;
