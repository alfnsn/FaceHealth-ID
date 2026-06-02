const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const rahasiaJWT = process.env.JWT_SECRET || "kunci_rahasia_facehealth_id_2026";
      const decoded = jwt.verify(token, rahasiaJWT);
      
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Token tidak valid, otorisasi gagal." });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: "Akses ditolak, token tidak ditemukan." });
  }
};

module.exports = { protect };