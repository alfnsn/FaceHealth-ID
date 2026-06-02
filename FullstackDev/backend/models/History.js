const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sumber_deteksi: {
      type: String,
      required: true,
    },
    skin_type: {
      type: String,
      default: "-",
    },
    skin_subtype: {
      type: String,
      default: "-",
    },
    age: {
      type: String,
      default: "-",
    },
    sensitivity: {
      type: String,
      default: "-",
    },
    kategori_tabular: {
      type: String,
      default: "-",
    },
    predicted_class: {
      type: String,
      default: "-",
    },
    confidence: {
      type: String,
      default: "-",
    },
    rekomendasi_skincare: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("History", HistorySchema);
