const Dropdown = require("../models/dropdownModel");

// Create Dropdown
exports.createDropdown = async (req, res) => {
  try {
    const { name, placeholder, options } = req.body;
    const newDropdown = new Dropdown({ name, placeholder, options });
    await newDropdown.save();
    res.status(201).json(newDropdown);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Dropdowns
exports.getDropdowns = async (req, res) => {
  try {
    const dropdowns = await Dropdown.find();
    res.status(200).json(dropdowns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Dropdown
exports.getDropdown = async (req, res) => {
  try {
    const dropdown = await Dropdown.findById(req.params.id);
    if (!dropdown) return res.status(404).json({ message: "Dropdown not found" });
    res.status(200).json(dropdown);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Dropdown
exports.updateDropdown = async (req, res) => {
  try {
    const { name, placeholder, options } = req.body;
    const updatedDropdown = await Dropdown.findByIdAndUpdate(
      req.params.id,
      { name, placeholder, options },
      { new: true }
    );
    if (!updatedDropdown) return res.status(404).json({ message: "Dropdown not found" });
    res.status(200).json(updatedDropdown);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Dropdown
exports.deleteDropdown = async (req, res) => {
  try {
    const deletedDropdown = await Dropdown.findByIdAndDelete(req.params.id);
    if (!deletedDropdown) return res.status(404).json({ message: "Dropdown not found" });
    res.status(200).json({ message: "Dropdown deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
