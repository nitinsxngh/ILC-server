const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const blogSchema = new mongoose.Schema({
  img: { type: String, required: true },
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required: true },
  keywords: { type: [String], required: true },
  timestamp: { type: Date, default: () => Date.now() }  // Ensuring default value is correctly set
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
