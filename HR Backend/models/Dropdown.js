const mongoose = require("mongoose");

const dropdownSchema = new mongoose.Schema({
  field: { type: String, required: true, unique: true },
  options: { type: [String], required: true, default: [] },
});

module.exports = mongoose.model("Dropdown", dropdownSchema);
