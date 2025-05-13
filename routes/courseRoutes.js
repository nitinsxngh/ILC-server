const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Get all courses
router.get('/', courseController.getCourses);

// Get a single course by ID
router.get('/:id', courseController.getCourseById);

// Create a new course
router.post('/', courseController.createCourse);

// Update an existing course
router.put('/:id', courseController.updateCourse);

// Delete a course
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
