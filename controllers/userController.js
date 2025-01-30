const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, category } = req.body;

  try {
    if (!name || !email || !password || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      category
    });

    await newUser.save();
    
    // Return success response
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Authenticate user (login)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Respond with the user info (without password)
    res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user info (without password)
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user details
const updateUser = async (req, res) => {
    const { id, name, age, username, role, college, course, specialisation, expertType, phone, expertise, yearsOfExperience } = req.body;
  
    console.log("Received data:", req.body);  // Log the incoming data
    
    try {
      const user = await User.findById(id);
      if (!user) {
        console.log("User not found with ID:", id);
        return res.status(404).json({ message: 'User not found' });
      }

      // Update fields (only updating the fields passed in the body)
      user.name = name || user.name;
      user.age = age || user.age;
      user.username = username || user.username;
      user.role = role || user.role;
      user.college = college || user.college;
      user.course = course || user.course;
      user.specialisation = specialisation || user.specialisation;
      user.expertType = expertType || user.expertType;
      user.phone = phone || user.phone;
      user.expertise = expertise || user.expertise;
      user.yearsOfExperience = yearsOfExperience || user.yearsOfExperience;

      console.log("Updated user data:", user);

      // Save the updated user
      await user.save();
      console.log("User saved successfully!");

      // Respond with the updated user object
      res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: 'Server error' });
    }
};



module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
};
