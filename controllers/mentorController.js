const Mentor = require("../models/Mentor");

exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({ message: "Error fetching mentors", error });
  }
};

exports.addMentor = async (req, res) => {
  const { name, email, jobTitle, jobCompany, img } = req.body;

  try {
    const newMentor = new Mentor({
      name,
      email,
      jobTitle,
      jobCompany,
      img,
    });

    await newMentor.save();
    res.status(201).json(newMentor);
  } catch (error) {
    console.error("Error adding mentor:", error);
    res.status(500).json({ message: "Error adding mentor", error });
  }
};

exports.updateMentor = async (req, res) => {
  const { id } = req.params;  // UUID instead of ObjectId
  const { name, email, jobTitle, jobCompany, img } = req.body;

  try {
    const updatedMentor = await Mentor.findOneAndUpdate(
      { mentorId: id },  // Use mentorId instead of _id
      { name, email, jobTitle, jobCompany, img },
      { new: true }
    );

    if (!updatedMentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    res.status(200).json(updatedMentor);
  } catch (error) {
    res.status(500).json({ message: "Error updating mentor", error });
  }
};


exports.deleteMentor = async (req, res) => {
  const { id } = req.params;  // UUID instead of ObjectId

  try {
    const deletedMentor = await Mentor.findOneAndDelete({ mentorId: id });
    if (!deletedMentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res.status(200).json({ message: "Mentor deleted successfully" });
  } catch (error) {
    console.error("Error deleting mentor:", error);
    res.status(500).json({ message: "Error deleting mentor", error });
  }
};

