const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getRecommendation,
} = require("../controllers/recommendationController");

const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 
  }
});
router.post("/", upload.single("file" ), getRecommendation);

module.exports = router;
