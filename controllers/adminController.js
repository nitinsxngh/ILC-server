const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Register a new admin
const registerAdmin = async (req, res) => {
  const { img, name, email, job, status, date, access, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  // Validate password strength
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long' });
  }

  // Check if the admin already exists
  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    return res.status(400).json({ message: 'Admin already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new admin
  const admin = new Admin({
    img,
    name,
    email,
    job,
    status,
    date: date || new Date(), // Use current date if no date is provided
    access,
    password: hashedPassword,
  });

  try {
    // Save the admin to the database
    await admin.save();
    // Exclude the password from the response
    const { password: _, ...adminData } = admin.toObject();
    res.status(201).json({ message: 'Admin registered successfully', admin: adminData });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error creating admin' });
  }
};

// Login an admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, name: admin.name, email: admin.email },
      process.env.JWT_SECRET, // Secret key from environment
      { expiresIn: '30d' } // Set token expiration (e.g., 30 days)
    );

    // Send the token in response
    res.json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all admins
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching admins' });
  }
};

// Update an admin by email (status and access can also be updated here)
const updateAdmin = async (req, res) => {
  const { email } = req.params;
  const updateData = req.body;

  try {
    const admin = await Admin.findOneAndUpdate({ email }, updateData, { new: true });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error updating admin' });
  }
};

module.exports = { registerAdmin, loginAdmin, getAdmins, updateAdmin };
