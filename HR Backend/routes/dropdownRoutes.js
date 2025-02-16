const express = require("express");
const { getDropdowns, updateDropdown } = require("../controllers/dropdownController");

const router = express.Router();

router.get("/dropdowns", getDropdowns);
router.post("/dropdowns", updateDropdown);

module.exports = router;
