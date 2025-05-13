// controllers/courseCategoryController.js
const CourseCategory = require("../models/CourseCategory");

// Get all course categories
const getCourseCategories = async (req, res) => {
  try {
    const categories = await CourseCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course categories" });
  }
};

// Add a new course category
const addCourseCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if category already exists
    const existingCategory = await CourseCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new CourseCategory({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: "Error adding course category" });
  }
};

// Update an existing course category
const updateCourseCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedCategory = await CourseCategory.findByIdAndUpdate(req.params.id, { name }, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: "Error updating course category" });
  }
};

// Delete a course category
const deleteCourseCategory = async (req, res) => {
  try {
    const deletedCategory = await CourseCategory.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting course category" });
  }
};

module.exports = { getCourseCategories, addCourseCategory, updateCourseCategory, deleteCourseCategory };
