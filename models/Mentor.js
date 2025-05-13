const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const mentorSchema = new mongoose.Schema({
  mentorId: {
    type: String,
    default: uuidv4,  // Automatically generate a unique ID using uuidv4
    required: true,
    unique: true,  // Ensure it's unique
  },
  img: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobCompany: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Mentor = mongoose.model("Mentor", mentorSchema);

module.exports = Mentor;
