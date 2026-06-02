const express = require("express");
const router = express.Router();
const History = require("../models/History");
const { protect } = require("../middleware/authMiddleware");

// @desc    Ambil semua riwayat analisis user yang sedang login
// @route   GET /api/history
router.get("/", protect, async (req, res) => {
  try {
    const riwayat = await History.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json({
      success: true,
      data: riwayat
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Gagal mengambil data riwayat analisis."
    });
  }
});

module.exports = router;