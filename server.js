const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const blogRoutes = require('./routes/blogRoutes');
const assetCategoryRoutes = require('./routes/assetCategoryRoutes');
const blogCategoryRoutes = require('./routes/blogCategoryRoutes');
const userRoutes = require('./routes/userRoutes');
const courseCategoryRoutes = require('./routes/courseCategoryRoutes'); // Import the course category routes
const courseRoutes = require('./routes/courseRoutes');  // Import the course routes
const eventRoutes = require('./routes/eventRoutes');
const coursementorRoutes = require("./routes/courseMentorRoutes");
const posterRoutes = require("./routes/posterRoutes");

dotenv.config();
connectDB();

// Create an Express application instance
const app = express();

// Configure CORS properly to allow requests from the frontend
const allowedOrigins = [
  'http://localhost:5173',  // React frontend
  'http://localhost:3000',  // Another possible origin
  'https://cms.ilc.limited',  // Production frontend domain
  'https://explore.ilc.limited',  // Production frontend domain
  'https://ilc.limited',  // Production frontend domain
  'https://www.ilc.limited',  // Production frontend domain
];

const corsOptions = {
  origin: (origin, callback) => {
    // Check if the origin is in the allowed origins list, or if it's undefined (for no origin, e.g., Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,  // Allow cookies and credentials
};

app.use(cors(corsOptions));
app.use(express.json());

// Define routes
app.use('/api/admins', adminRoutes);  // Admin-related routes
app.use('/api/library', libraryRoutes);  // Library-related routes
app.use('/api/mentors', mentorRoutes);  // Mentor-related routes
app.use('/api/blog-categories', blogCategoryRoutes);  // Blog category routes
app.use('/api/asset-categories', assetCategoryRoutes);  // Asset category routes
app.use('/api', blogRoutes);  // Blog routes
app.use("/api/users", userRoutes);  // User routes
app.use('/api/course-categories', courseCategoryRoutes); // Add the new course category route
app.use('/api/courses', courseRoutes); // Add the new course route
app.use('/api/events', eventRoutes);
app.use("/api/course-mentors", coursementorRoutes);
app.use('/api/posters', posterRoutes);  // Posters route

app.get('/', (req, res) => {
  res.send('Admin Management API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
