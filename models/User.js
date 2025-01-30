const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: 'NA',
  },
  age: {
    type: Number,
    min: 0,
    default: 0,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    default: 'NA',
  },
  password: {
    type: String,
    minlength: [6, 'Password must be at least 6 characters long'],
    default: 'NA',
  },
  username: {
    type: String,
    unique: true,
    sparse: true, // Allows null values to avoid duplicate errors
    trim: true,
    default: 'NA',
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'student', 'expert'],
    default: 'user',
  },
  // Student-specific fields
  college: {
    type: String,
    trim: true,
    default: 'NA',
  },
  course: {
    type: String,
    trim: true,
    default: 'NA',
  },
  specialisation: {
    type: String,
    trim: true,
    default: 'NA',
  },
  // Expert-specific fields
  expertType: {
    type: String,
    enum: ['professor', 'professional', 'NA'], // Now 'NA' is allowed
    default: 'NA',
  },
  phone: {
    type: String,
    trim: true,
    default: 'NA',
  },
  expertise: {
    type: String,
    trim: true,
    default: 'NA',
  },
  yearsOfExperience: {
    type: Number,
    min: 0,
    default: 0,
  },
}, { timestamps: true });

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
