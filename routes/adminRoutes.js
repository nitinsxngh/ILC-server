const express = require('express');
const { registerAdmin, getAdmins, updateAdmin, loginAdmin } = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware'); // Import the protect middleware
const router = express.Router();

router.post('/register', registerAdmin);
router.get('/', protect, getAdmins);  // Protect this route
router.put('/:email', protect, updateAdmin);  // Protect this route
router.post('/login', loginAdmin);

module.exports = router;
