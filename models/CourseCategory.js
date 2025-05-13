// models/CourseCategory.js
const mongoose = require("mongoose");

const courseCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("CourseCategory", courseCategorySchema);
