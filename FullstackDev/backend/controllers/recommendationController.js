const axios = require("axios");
const FormData = require("form-data");
const jwt = require("jsonwebtoken");
const History = require("../models/History");

const getRecommendation = async (req, res) => {
  try {
    const {
      skin_type,
      skin_subtype,
      age_group,
      ageRaw,
      sensitivity,
      inputMethod,
      manual_acne_type,
    } = req.body;
    const imageFile = req.file;

    const formDataToAI = new FormData();
    
    formDataToAI.append("skin_type", skin_type && skin_type.trim() !== "" ? skin_type : "Normal");
    formDataToAI.append("skin_subtype", skin_subtype && skin_subtype.trim() !== "" ? skin_subtype : "Normal to Dry");
    formDataToAI.append("age_group", age_group && age_group.trim() !== "" ? age_group : "19-24");
    formDataToAI.append("sensitivity", sensitivity && sensitivity.trim() !== "" ? sensitivity : "Not Sensitive");

    if (inputMethod === "manual") {
      formDataToAI.append("manual_acne_type", manual_acne_type || "Comedonal");
    } else {
      if (!imageFile) {
        return res.status(400).json({
          success: false,
          message: "Mohon sertakan file foto wajah Anda untuk dianalisis AI.",
        });
      }

      formDataToAI.append("file", imageFile.buffer, {
        filename: imageFile.originalname,
        contentType: imageFile.mimetype,
      });
    }

    // AI
    const airesponse = await axios.post(
      "https://raihanrill-facehealth-api.hf.space/predict",
      formDataToAI,
      {
        headers: {
          "Content-Type": formDataToAI.getHeaders()["content-type"],
        },
      },
    );

    const aiData = airesponse.data?.data || airesponse.data;

    // Simpan ke database riwayat jika user terautentikasi
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const rahasiaJWT = process.env.JWT_SECRET || "kunci_rahasia_facehealth_id_2026";
        const decoded = jwt.verify(token, rahasiaJWT);

        let formattedConfidence = "-";
        if (inputMethod !== "manual" && aiData?.deteksi_asli) {
          const rawConfidence = aiData.deteksi_asli.confidence;
          if (rawConfidence && !isNaN(parseFloat(rawConfidence))) {
            formattedConfidence = `${(parseFloat(rawConfidence) * 100).toFixed(1)}%`;
          }
        }

        const predictedClass = inputMethod === "manual" 
          ? (manual_acne_type || "Comedonal") 
          : (aiData?.deteksi_asli?.predicted_class || aiData?.predicted_class || "-");

        await History.create({
          user: decoded.id,
          sumber_deteksi: inputMethod === "manual" ? "Manual Input" : "AI Gambar",
          skin_type: skin_type || "-",
          skin_subtype: skin_subtype || "-",
          sensitivity: sensitivity || "-",
          age: ageRaw ? `${ageRaw} Tahun` : "-",
          kategori_tabular: aiData?.kategori_tabular || "-",
          predicted_class: predictedClass,
          confidence: formattedConfidence,
          rekomendasi_skincare: typeof aiData?.rekomendasi_skincare === "object" 
            ? JSON.stringify(aiData.rekomendasi_skincare) 
            : (aiData?.rekomendasi_skincare || "-"),
        });
      } catch (historyErr) {
        console.error("Gagal melakukan simpan otomatis riwayat:", historyErr.message);
      }
    }

    return res.json({
      success: true,
      data: aiData,
    });

  } catch (error) {
    if (error.response) {
      console.error("Detail Error dari FastAPI:", error.response.data);
      if (error.response.data && error.response.data.detail) {
        const errorDetail = error.response.data.detail;
        return res.status(400).json({
          success: false,
          message: typeof errorDetail === "object" ? "Format skema input parameter data tidak didukung oleh model AI." : errorDetail,
        });
      }
    }
    
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan internal pada server pemrosesan AI.",
    });
  }
};

module.exports = { getRecommendation };
