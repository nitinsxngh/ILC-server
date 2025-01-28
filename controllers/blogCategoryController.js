const BlogCategory = require("../models/BlogCategory");

// Get all blog categories
const getBlogCategories = async (req, res) => {
  try {
    const categories = await BlogCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog categories" });
  }
};

// Add a new blog category
const addBlogCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new BlogCategory({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: "Error adding category" });
  }
};

// Update an existing blog category
const updateBlogCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const updatedCategory = await BlogCategory.findByIdAndUpdate(req.params.id, { name }, { new: true });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: "Error updating category" });
  }
};

// Delete a blog category
const deleteBlogCategory = async (req, res) => {
  try {
    await BlogCategory.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting category" });
  }
};

module.exports = { getBlogCategories, addBlogCategory, updateBlogCategory, deleteBlogCategory };
