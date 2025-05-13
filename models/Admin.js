const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // or 'bcrypt' if you prefer

const adminSchema = mongoose.Schema(
  {
    img: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    job: { type: [String], required: true },
    status: { type: String, default: "active", enum: ["active", "inactive"] },
    access: { type: String, enum: ["admin", "editor", "viewer"], default: "viewer" },
    password: { type: String, required: true },
  },
  { timestamps: true } // Automatically creates `createdAt` and `updatedAt` fields
);

// Hash the password before saving the admin
adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash the password if it was modified or new
  try {
    const salt = await bcrypt.genSalt(10);  // Generate salt
    const hashedPassword = await bcrypt.hash(this.password, salt); // Hash the password
    this.password = hashedPassword; // Replace plain password with hashed one
    next();  // Continue with saving the document
  } catch (error) {
    next(error);  // Pass errors to the next middleware (e.g., error handler)
  }
});

module.exports = mongoose.model('Admin', adminSchema);
