const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password, category, phone } = req.body;

  try {
    if (!name || !category) {
      return res.status(400).json({ message: "Name and category are required" });
    }

    // Validate category
    const validCategories = ["user", "student", "expert", "professor", "professional", "guest"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    let lowerCaseEmail = email ? email.toLowerCase() : null;

    // Generate email and password for guests
    if (category === "guest") {
      if (!phone) {
        return res.status(400).json({ message: "Phone number is required for guests" });
      }
      lowerCaseEmail = `${Date.now()}@guest.com`; // Unique guest email
    } else {
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const userExists = await User.findOne({ email: lowerCaseEmail });
      if (userExists) {
        return res.status(400).json({ message: "Email already registered" });
      }
    }

    const hashedPassword = password ? await bcrypt.hash(password, 10) : "12345678"; // Default guest password

    const newUser = new User({
      name,
      email: lowerCaseEmail,
      password: hashedPassword,
      category,
      phone: phone || "N/A", // Store phone for guests
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        category: newUser.category,
        phone: newUser.phone,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Authenticate user (login)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const lowerCaseEmail = email.toLowerCase(); // Ensure case-insensitive email matching
    const user = await User.findOne({ email: lowerCaseEmail }).lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        category: user.category,
      },
    });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        category: user.category,
      },
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a user by email
const getUserByEmail = async (req, res) => {
  try {
      const email = req.params.email.toLowerCase();  // Ensure lowercase for consistency
      console.log("Fetching user with email:", email);

      const user = await User.findOne({ email });

      if (!user) {
          console.log("User not found");
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ user });
  } catch (error) {
      console.error("Error fetching user by email:", error);
      res.status(500).json({ message: 'Server error' });
  }
};


// Update user details using email
const updateUser = async (req, res) => {
  let { email } = req.params;
  if (!email) {
    return res.status(400).json({ message: "Email parameter is required" });
  }

  email = email.toLowerCase();
  const updateFields = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Define allowed fields based on user category
    const allowedFields = ["name"]; // Name is always updatable

    if (user.category === "professor" || user.category === "professional") {
      allowedFields.push("expertise", "yearsOfExperience");
    } else if (user.category === "student") {
      allowedFields.push("college", "course", "specialisation");
    }

    // Filter the updateFields to only allow the allowed fields
    const filteredUpdates = {};
    for (const key of allowedFields) {
      if (updateFields[key] !== undefined) {
        filteredUpdates[key] = updateFields[key];
      }
    }

    // Update only the allowed fields
    const updatedUser = await User.findOneAndUpdate(
      { email },
      filteredUpdates,
      { new: true, lean: true }
    );

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        category: updatedUser.category || "N/A",
        ...filteredUpdates, // Include only the updated fields
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};




module.exports = {
  registerUser,
  loginUser,
  getUserById,
  getUserByEmail, // Ensure this is exported
  updateUser,
};
