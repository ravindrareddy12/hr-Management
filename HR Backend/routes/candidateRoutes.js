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
router.get("/statistics", async (req, res) => {
    try {
      const totalCandidates = await Candidate.countDocuments();
      const offersMade = await Candidate.countDocuments({
        offerStatus: { $in: ["Released", "Accepted"] },
      });
      const candidatesJoined = await Candidate.countDocuments({
        joiningDate: { $ne: null },
        offerStatus: "Accepted",
      });
  
      res.json({
        totalCandidates,
        offersMade,
        candidatesJoined,
      });

    } catch (err) {
        console.log(err)
      res.status(500).json({ error: err.message });
      
    }
  });
  
module.exports = router;
