const express = require("express");
const {
  getBlogCategories,
  addBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
} = require("../controllers/blogCategoryController");

const router = express.Router();

router.get("/", getBlogCategories);
router.post("/", addBlogCategory);
router.put("/:id", updateBlogCategory);
router.delete("/:id", deleteBlogCategory);

module.exports = router;
