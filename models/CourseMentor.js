const mongoose = require("mongoose");

const courseMentorSchema = new mongoose.Schema({
  mentorName: { type: String, required: true },
  mentorEmail: { type: String, required: true },
  professionType: { type: String, required: true },
  specialization: { type: String, required: true },
  associatedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  mentorId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Mentor = mongoose.model("CourseMentor", courseMentorSchema);

module.exports = Mentor;
