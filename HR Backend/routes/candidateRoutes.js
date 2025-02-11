const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");
const Candidate = require("../models/Candidate");

router.get("/", candidateController.getAllCandidates);
router.get("/:id", candidateController.getCandidateById);
router.post("/", candidateController.createCandidate);
router.put("/:id", candidateController.updateCandidate);
router.delete("/:id", candidateController.deleteCandidate);
router.get("/recent/limit", candidateController.getRecentCandidates);
router.get("/statistics/st", async (req, res) => {
  console.log("inside statistics");
  try {
    const totalCandidates = await Candidate.countDocuments();
    const offersMade = await Candidate.countDocuments({
      offerStatus: { $in: ["Released", "Accepted"] },
    });
    const candidatesJoined = await Candidate.countDocuments({
      offerStatus: "Accepted",
    });

    // Generate monthly data dynamically
    const monthlyData = [];
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const startOfMonth = new Date(now.getFullYear(), i, 1);
      const endOfMonth = new Date(now.getFullYear(), i + 1, 0);
      
      const applications = await Candidate.countDocuments({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      });
      
      monthlyData.push({
        month: startOfMonth.toLocaleString('default', { month: 'short' }),
        applications,
      });
    }

    res.json({
      totalCandidates,
      offersMade,
      candidatesJoined,
      monthlyData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
  
module.exports = router;
