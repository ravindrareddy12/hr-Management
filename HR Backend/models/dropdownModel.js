const mongoose = require("mongoose");

const DropdownSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Dropdown identifier
  placeholder: { type: String, required: true }, // Placeholder text
  options: [{ type: String, required: true }], // List of dropdown options
});

module.exports  = mongoose.model("Dropdown", DropdownSchema);
