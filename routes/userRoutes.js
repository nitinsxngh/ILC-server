const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserById, updateUser } = require('../controllers/userController');

// Register a new user
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Get a user by ID
router.get('/:id', getUserById);

// Update user details
router.put('/:id', updateUser);

module.exports = router;
