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

dotenv.config();
connectDB();

// Create an Express application instance
const app = express();

// Configure CORS properly to allow requests from the frontend
const allowedOrigins = [
  'http://localhost:5173',  // React frontend
  'http://localhost:3000',  // Another possible origin
  'https://ilc.limited',  // Production frontend domain
  // Add more allowed origins here as needed
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

app.get('/', (req, res) => {
  res.send('Admin Management API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
