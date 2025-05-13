const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  tags: { type: [String], default: [] },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', courseSchema);
