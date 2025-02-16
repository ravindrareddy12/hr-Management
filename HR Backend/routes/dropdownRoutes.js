const express = require("express");
const {
  createDropdown,
  getDropdowns,
  getDropdown,
  updateDropdown,
  deleteDropdown
} = require("../controllers/dropdownController");

const router = express.Router();

router.post("/", createDropdown); // Create
router.get("/", getDropdowns); // Get all
router.get("/:id", getDropdown); // Get one
router.put("/:id", updateDropdown); // Update
router.delete("/:id", deleteDropdown); // Delete

module.exports = router;
