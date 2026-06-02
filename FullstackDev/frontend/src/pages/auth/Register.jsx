import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    FiUser,
    FiMail,
    FiLock,
    FiUserPlus,
    FiAlertCircle,
    FiCheckCircle,
    FiLoader,
    FiEye,
    FiEyeOff
} from 'react-icons/fi';
import { LuCat } from 'react-icons/lu';
import { motion } from 'motion/react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Konfirmasi password tidak cocok dengan password utama.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("https://facehealth-backend.vercel.app/api/users/register", {
                name,
                email,
                password
            });

            if (response && response.data && response.data.success) {
                setSuccess('Akun berhasil dibuat! Mengalihkan ke halaman login...');

                const savedName = response.data.user?.name || response.data.data?.name || name;
                localStorage.setItem('userName', savedName);

                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');

                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError('Gagal mendaftarkan akun. Data yang dikirim tidak valid.');
            }
        } catch (err) {
            console.error("Register Error:", err);
            setError(err.response?.data?.message || "Gagal mendaftarkan akun. Terjadi gangguan jaringan atau server sedang diperbarui.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 -right-20 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-teal-400/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, 30, 0],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-cyan-400/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.3, 1, 1.3],
                        x: [0, -30, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8 items-center">

                {/* panel kiri */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="order-2 lg:order-1"
                >
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/60">
                        <div className="text-center mb-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg shadow-emerald-500/30"
                            >
                                <FiUserPlus className="text-3xl text-white" />
                            </motion.div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Daftar Akun</h2>
                            <p className="text-gray-600 text-sm">
                                Mulai langkah awal pemulihan kondisi kulit wajah Anda
                            </p>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-4">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 text-sm rounded-2xl font-medium flex items-start gap-3"
                                >
                                    <FiAlertCircle className="text-lg text-red-500 flex-shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </motion.div>
                            )}

                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 text-sm rounded-2xl font-medium flex items-start gap-3 shadow-md"
                                >
                                    <FiCheckCircle className="text-lg text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <span>{success}</span>
                                </motion.div>
                            )}
                            {/* input username */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 ml-1 block">
                                    Username
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-emerald-500">
                                        <FiUser className="text-lg" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-white text-gray-900 font-medium placeholder:text-gray-400"
                                        placeholder="Username"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* input email */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 ml-1 block">
                                    Email
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-emerald-500">
                                        <FiMail className="text-lg" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-white text-gray-900 font-medium placeholder:text-gray-400"
                                        placeholder="nama@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* input password */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 ml-1 block">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-emerald-500">
                                        <FiLock className="text-lg" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        minLength={6}
                                        className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-white text-gray-900 font-medium placeholder:text-gray-400"
                                        placeholder="Min. 6 Karakter"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                                    </button>
                                </div>
                            </div>

                            {/* input konfirmasi passweord */}
                            <div className="space-y-1">
                                <label className="text-sm font-semibold text-gray-700 ml-1 block">
                                    Konfirmasi Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-emerald-500">
                                        <FiLock className="text-lg" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-white text-gray-900 font-medium placeholder:text-gray-400"
                                        placeholder="Ulangi Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showConfirmPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                                    </button>
                                </div>
                            </div>

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                className={`w-full flex items-center justify-center gap-2 py-3.5 text-white rounded-xl font-semibold transition-all shadow-lg mt-6 ${loading
                                    ? 'bg-gray-300 cursor-not-allowed text-gray-500 shadow-none'
                                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-500/30'
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <FiLoader className="animate-spin text-lg" />
                                        <span>Mendaftarkan Akun...</span>
                                    </>
                                ) : (
                                    <>
                                        <FiUserPlus className="text-lg" />
                                        <span>Daftar Sekarang</span>
                                    </>
                                )}
                            </motion.button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600 text-sm">
                                Sudah punya akun?{' '}
                                <Link
                                    to="/login"
                                    className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors underline-offset-2 hover:underline"
                                >
                                    Masuk di sini
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* panel kanan */}
                <motion.div
                    className="hidden lg:flex flex-col justify-center space-y-6 px-8 order-1 lg:order-2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="space-y-4">
                        {/* kucing */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-emerald-100"
                            animate={{ scale: [1, 1.06, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <LuCat className="text-emerald-600 text-lg" />
                            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Aman & Terpercaya
                            </span>
                        </motion.div>

                        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                            Bergabung dengan<br />FaceHealth-ID
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Daftarkan akunmu sekarang dan nikmati fitur rekomendasi skincare untuk merawat kesehatan kulitmu dengan lebih baik.
                        </p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Register;