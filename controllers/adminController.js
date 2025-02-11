const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// Register a new admin
const registerAdmin = async (req, res) => {
  const { img, name, email, job, status, date, access, password } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if the admin already exists
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create the new admin (password will be hashed automatically in the schema)
    const admin = new Admin({
      img,
      name,
      email,
      job,
      status,
      date: date || new Date(),
      access,
      password, // No need to hash here, the schema will handle it
    });

    // Save the admin to the database
    await admin.save();

    // Exclude the password from the response
    const { password: _, ...adminData } = admin.toObject();
    res.status(201).json({ message: "Admin registered successfully", admin: adminData });
  } catch (error) {
    console.error("Error in registerAdmin:", error);
    res.status(500).json({ message: "Error creating admin" });
  }
};


// Login an admin
const loginAdmin = async (req, res) => {
  console.log("Login request received:", req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    console.log("Missing email or password");
    return res.status(400).json({ message: "Please provide email and password" });
  }

  try {
    const admin = await Admin.findOne({ email });
    console.log("Admin found in DB:", admin);

    if (!admin) {
      console.log("Admin not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the admin's status is "active"
    if (admin.status !== "active") {
      console.log("Admin account is inactive");
      return res.status(403).json({ message: "Your account is inactive. Contact support." });
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.access },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    console.log("Login successful:", { email: admin.email, role: admin.access });

    res.json({ message: "Login successful", token, role: admin.access });
  } catch (error) {
    console.error("Server error in loginAdmin:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Get all admins
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password'); // Exclude passwords for security
    res.json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ message: 'Error fetching admins' });
  }
};

// Update an admin by email (status and access can also be updated here)
const updateAdmin = async (req, res) => {
  const { email } = req.params;
  const updateData = req.body;

  try {
    const admin = await Admin.findOneAndUpdate({ email }, updateData, { new: true }).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(400).json({ message: 'Error updating admin' });
  }
};

module.exports = { registerAdmin, loginAdmin, getAdmins, updateAdmin };
