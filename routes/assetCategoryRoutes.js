const express = require("express");
const {
  getAssetCategories,
  addAssetCategory,
  updateAssetCategory,
  deleteAssetCategory,
} = require("../controllers/assetCategoryController");

const router = express.Router();

router.get("/", getAssetCategories);
router.post("/", addAssetCategory);
router.put("/:id", updateAssetCategory);
router.delete("/:id", deleteAssetCategory);

module.exports = router;
