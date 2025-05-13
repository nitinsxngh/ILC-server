const LibraryAsset = require("../models/Library");  // Import the LibraryAsset model

// Function to get all assets from the library
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await LibraryAsset.find();
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching assets", error });
  }
};

// Function to add a new asset
exports.addAsset = async (req, res) => {
    try {
      const { category, name, description, price, date, fileUrl } = req.body;
  
      // Log the asset data
      console.log('Received asset:', req.body);
  
      // Create new asset in MongoDB
      const newAsset = new LibraryAsset({
        category,
        name,
        description,
        price,
        date,
        fileUrl, // Store Cloudinary file URL
      });
  
      // Save the asset to the database
      await newAsset.save();
  
      res.status(201).json({ message: "Asset added successfully", asset: newAsset });
    } catch (error) {
      console.error("Error adding asset:", error);
      res.status(500).json({ message: "Error adding asset", error });
    }
  };
  

// Function to update an existing asset
exports.updateAsset = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const updatedAsset = await LibraryAsset.findOneAndUpdate(
        { assetId: id },  // Use assetId instead of _id for lookup
        updatedData,
        { new: true }
      );
  
      if (!updatedAsset) {
        return res.status(404).json({ message: "Asset not found" });
      }
  
      res.status(200).json({ message: "Asset updated successfully", asset: updatedAsset });
    } catch (error) {
      console.error("Error updating asset:", error);
      res.status(500).json({ message: "Error updating asset", error });
    }
  };
  
// Function to delete an asset
exports.deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find asset by assetId and delete
    const deletedAsset = await LibraryAsset.findOneAndDelete({ assetId: id });

    if (!deletedAsset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    res.status(200).json({ message: "Asset deleted successfully" });
  } catch (error) {
    console.error("Error deleting asset:", error);
    res.status(500).json({ message: "Error deleting asset", error });
  }
};
