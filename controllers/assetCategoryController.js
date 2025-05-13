const AssetCategory = require("../models/AssetCategory");

// Get all asset categories
const getAssetCategories = async (req, res) => {
  try {
    const categories = await AssetCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching asset categories" });
  }
};

// Add a new asset category
const addAssetCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new AssetCategory({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: "Error adding category" });
  }
};

// Update an existing asset category
const updateAssetCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedCategory = await AssetCategory.findByIdAndUpdate(req.params.id, { name }, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: "Error updating category" });
  }
};

const deleteAssetCategory = async (req, res) => {
  try {
    const deletedCategory = await AssetCategory.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting category" });
  }
};


module.exports = { getAssetCategories, addAssetCategory, updateAssetCategory, deleteAssetCategory };
