const express = require("express");
const {
  getPosters,
  addPoster,
  updatePoster,
  deletePoster,
} = require("../controllers/posterController");

const router = express.Router();

router.get("/", getPosters);
router.post("/", addPoster);
router.put("/:id", updatePoster);
router.delete("/:id", deletePoster);

module.exports = router;
