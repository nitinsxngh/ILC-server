// routes/courseCategoryRoutes.js
const express = require("express");
const { getCourseCategories, addCourseCategory, updateCourseCategory, deleteCourseCategory } = require("../controllers/courseCategoryController");

const router = express.Router();

router.get("/", getCourseCategories); // Get all course categories
router.post("/", addCourseCategory); // Add a new course category
router.put("/:id", updateCourseCategory); // Update an existing course category
router.delete("/:id", deleteCourseCategory); // Delete a course category

module.exports = router;
