const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

router.post("/register", registerUser); 

/**
 * @openapi
 * /api/users/login:
 * post:
 * summary: Autentikasi Masuk Pengguna (Login)
 * description: Mengautentikasi pengguna menggunakan email dan password, lalu mengembalikan token akses JWT.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * example: user@example.com
 * password:
 * type: string
 * example: rahasia123
 * responses:
 * 200:
 * description: Berhasil masuk ke sistem.
 * 401:
 * description: Email atau password yang dimasukkan salah.
 */
router.post("/login", loginUser);

module.exports = router;