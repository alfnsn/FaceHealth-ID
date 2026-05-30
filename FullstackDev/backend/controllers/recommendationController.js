const axios = require("axios");
const FormData = require("form-data");

const getRecommendation = async (req, res) => {
  try {
    const {
      skin_type,
      skin_subtype,
      age_group,
      sensitivity,
      inputMethod,
      manual_acne_type,
    } = req.body;
    const imageFile = req.file;

    const formDataToAI = new FormData();
    formDataToAI.append("skin_type", skin_type || "");
    formDataToAI.append("skin_subtype", skin_subtype || "");
    formDataToAI.append("age_group", age_group || "");
    formDataToAI.append("sensitivity", sensitivity || "Not Sensitive");

    if (inputMethod === "manual") {
      formDataToAI.append("manual_acne_type", manual_acne_type);
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

    // endpoint FastAPI
    const airesponse = await axios.post(
      "http://127.0.0.1:8000/predict",
      formDataToAI,
      {
        headers: {
          ...formDataToAI.getHeaders(),
        },
      },
    );

    // respon AI ke fe
    return res.json({
      success: true,
      data: airesponse.data.data,
    });     
    
  
  } catch (error) {
    // menampilkan pesan error dari FastAPI
    if (error.response) {
      console.error("Detail Error dari FastAPI:", error.response.data);
    } else {
      console.error("Error Recommendation Controller:", error.message);
    }

    if (error.code === "ECONNREFUSED") {
      return res.status(503).json({
        success: false,
        message: "Server AI (FastAPI) belum aktif!"
      })
    }
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan internal pada server AI.",
    });
  }
};

module.exports = { getRecommendation };
