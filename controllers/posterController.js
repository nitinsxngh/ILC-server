const Poster = require("../models/Poster");

// @desc Get all posters
const getPosters = async (req, res) => {
  try {
    // Ensure that posters are sorted by the `createdAt` field in descending order
    const posters = await Poster.find().sort({ createdAt: -1 });
    res.status(200).json(posters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posters" });
  }
};

// @desc Add a new poster
const addPoster = async (req, res) => {
  try {
    const { name, videoUrl } = req.body;

    if (!name || !videoUrl) {
      return res.status(400).json({ message: "Name and video URL are required" });
    }

    // Add createdAt field automatically if not set
    const newPoster = new Poster({
      name,
      videoUrl,
      createdAt: new Date(),  // Ensures the current date is used
    });

    await newPoster.save();

    res.status(201).json(newPoster);
  } catch (error) {
    res.status(400).json({ message: "Error adding poster" });
  }
};

// @desc Update a poster
const updatePoster = async (req, res) => {
  try {
    const { name, videoUrl } = req.body;

    const updatedPoster = await Poster.findByIdAndUpdate(
      req.params.id,
      { name, videoUrl },
      { new: true }
    );

    if (!updatedPoster) {
      return res.status(404).json({ message: "Poster not found" });
    }

    res.status(200).json(updatedPoster);
  } catch (error) {
    res.status(400).json({ message: "Error updating poster" });
  }
};

// @desc Delete a poster
const deletePoster = async (req, res) => {
  try {
    const deleted = await Poster.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Poster not found" });
    }

    res.status(200).json({ message: "Poster deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting poster" });
  }
};

module.exports = {
  getPosters,
  addPoster,
  updatePoster,
  deletePoster,
};
