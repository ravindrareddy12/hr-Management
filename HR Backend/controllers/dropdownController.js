const Dropdown = require("../models/Dropdown");

// Fetch all dropdowns
exports.getDropdowns = async (req, res) => {
  try {
    const dropdowns = await Dropdown.find();
    const formattedData = dropdowns.reduce((acc, dropdown) => {
      acc[dropdown.field] = dropdown.options;
      return acc;
    }, {});
    
    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dropdowns", error });
  }
};

// Add or update a dropdown
exports.updateDropdown = async (req, res) => {
  try {
    const { field, options } = req.body;

    if (!field || !Array.isArray(options)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    let dropdown = await Dropdown.findOne({ field });

    if (dropdown) {
      dropdown.options = options;
      await dropdown.save();
    } else {
      dropdown = new Dropdown({ field, options });
      await dropdown.save();
    }

    res.json({ message: `Dropdown '${field}' updated successfully`, dropdown });
  } catch (error) {
    res.status(500).json({ message: "Error updating dropdown", error });
  }
};
