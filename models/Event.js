const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  video: { type: String }, // optional
  date: { type: Date, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', eventSchema);
