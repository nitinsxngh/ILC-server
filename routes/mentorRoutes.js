const express = require("express");
const mentorController = require("../controllers/mentorController");
const router = express.Router();

// Define your mentor routes here

// Route to get all mentors
router.get("/", mentorController.getAllMentors);

// Route to add a new mentor
router.post("/", mentorController.addMentor);

// Route to update a mentor
router.put("/:id", mentorController.updateMentor);

// Route to delete a mentor
router.delete("/:id", mentorController.deleteMentor);

module.exports = router;
