const express = require('express');
const blogController = require('../controllers/blogController');
const router = express.Router();

// Route to get all blogs
router.get('/blogs', blogController.getBlogs);

// Route to get a specific blog by ID
router.get('/blogs/:id', blogController.getBlogById);

// Route to create a new blog
router.post('/blogs', blogController.createBlog);

// Route to update a blog by ID
router.put('/blogs/:id', blogController.updateBlog);

// Route to delete a blog by ID
router.delete('/blogs/:id', blogController.deleteBlog);

module.exports = router;
