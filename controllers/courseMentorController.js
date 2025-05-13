const { v4: uuidv4 } = require("uuid"); // Import uuid package for generating mentorId
const Mentor = require("../models/CourseMentor");

exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find().populate("associatedCourses");
    res.status(200).json(mentors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mentors", error });
  }
};

exports.addMentor = async (req, res) => {
  try {
    const { mentorId, ...safeBody } = req.body; // Ignore frontend-sent mentorId

    // Generate mentorId if not provided
    const newMentor = new Mentor({
      ...safeBody,
      mentorId: mentorId || uuidv4(), // Generate mentorId if not provided
    });

    await newMentor.save();
    res.status(201).json(newMentor);
  } catch (error) {
    console.error("Error creating mentor:", error.message);
    res.status(400).json({ message: "Error creating mentor", error: error.message });
  }
};

exports.updateMentor = async (req, res) => {
  try {
    const updatedMentor = await Mentor.findOneAndUpdate(
      { mentorId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedMentor) return res.status(404).json({ message: "Mentor not found" });
    res.json(updatedMentor);
  } catch (error) {
    res.status(400).json({ message: "Error updating mentor", error });
  }
};

exports.deleteMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findOneAndDelete({ mentorId: req.params.id });
    if (!mentor) return res.status(404).json({ message: "Mentor not found" });
    res.json({ message: "Mentor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting mentor", error });
  }
};
