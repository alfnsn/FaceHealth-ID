const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getRecommendation,
} = require("../controllers/recommendationController");

const upload = multer({ storage: multer.memoryStorage() });
router.post("/", upload.single("file" ), getRecommendation);

module.exports = router;
