const User = require("../models/User"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * @desc    Mendaftarkan User Baru (Register)
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Silakan isi semua kolom formulir pendaftaran.",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email tersebut sudah terdaftar. Silakan gunakan email lain.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // simpan data user baru
    const userBaru = await User.create({
      name,
      email,
      password: hashedPassword, 
    });

    if (userBaru) {
      return res.status(201).json({
        success: true,
        message: "Akun Anda berhasil didaftarkan!",
        data: {
          _id: userBaru._id,
          name: userBaru.name,
          email: userBaru.email,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Data akun yang dikirimkan tidak valid.",
      });
    }
  } catch (error) {
    console.error("Register Controller Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Terjadi gangguan pada server saat mendaftarkan akun. Silakan coba lagi.",
    });
  }
};

/**
 * @desc    Masuk ke Sistem (Login)
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password wajib diisi.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email atau password yang Anda masukkan salah.",
      });
    }

    const passwordCocok = await bcrypt.compare(password, user.password);
    if (!passwordCocok) {
      return res.status(401).json({
        success: false,
        message: "Email atau password yang Anda masukkan salah.",
      });
    }

    const rahasiaJWT = process.env.JWT_SECRET || "kunci_rahasia_facehealth_id_2026";
    const token = jwt.sign(
      { id: user._id, email: user.email },
      rahasiaJWT,
      { expiresIn: "30d" } 
    );

    return res.json({
      success: true,
      message: "Berhasil masuk ke sistem!",
      token: token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Controller Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Terjadi gangguan pada server saat proses login. Silakan coba lagi.",
    });
  }
};

module.exports = { registerUser, loginUser };