const express = require('express');
const router = express.Router();
const libraryController = require('../controllers/libraryController');

// Route to get all library assets
router.get('/assets', libraryController.getAllAssets);

// Route to add a new library asset
router.post('/assets', libraryController.addAsset);

// Route to update an existing library asset
router.put('/assets/:id', libraryController.updateAsset);

// Route to delete an existing library asset
router.delete('/assets/:id', libraryController.deleteAsset);

module.exports = router;
