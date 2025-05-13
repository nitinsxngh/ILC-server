const express = require("express");
const router = express.Router();
const mentorController = require("../controllers/courseMentorController");

// Mentor CRUD operations
router.route("/")
  .get(mentorController.getAllMentors)
  .post(mentorController.addMentor);

router.route("/:id")
  .put(mentorController.updateMentor)
  .delete(mentorController.deleteMentor);

module.exports = router;
