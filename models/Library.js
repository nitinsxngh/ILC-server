const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const LibraryAssetSchema = new mongoose.Schema({
  assetId: {
    type: String,
    default: uuidv4, // Generate random assetId using uuid
    unique: true, // Ensure assetId is unique
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set current timestamp
  },
  fileUrl: {
    type: String, // Store Cloudinary file URL of the uploaded PDF
    required: true,
  },
});

const LibraryAsset = mongoose.model("LibraryAsset", LibraryAssetSchema);

module.exports = LibraryAsset;
