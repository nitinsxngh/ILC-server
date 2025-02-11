const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserById, updateUser, getUserByEmail } = require('../controllers/userController'); // ✅ Import getUserByEmail
const User = require('../models/User'); 

// Register a new user
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

router.get('/id/:id', getUserById); // Fetch by ID
router.get('/email/:email', getUserByEmail); // Fetch by Email


// Update user details
router.put("/:email", updateUser);

// API to fetch users with pagination
router.get("/", async (req, res) => {
    try {
      let { page = 1, limit = 10 } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);

      const users = await User.find()
        .sort({ createdAt: -1 }) // Latest users first
        .skip((page - 1) * limit)
        .limit(limit);

      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
