import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    FiMail,
    FiLock,
    FiLogIn,
    FiAlertCircle,
    FiLoader,
    FiEye,
    FiEyeOff
} from 'react-icons/fi';
import { LuCat } from 'react-icons/lu';
import { motion } from 'motion/react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post("https://facehealth-backend.vercel.app/api/users/login", {
                email,
                password
            });

            if (response.data.token || response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userName', response.data.user.name);

                navigate('/analysis');

                window.location.reload();
            } else {
                setError('Email atau password salah.');
            }

        } catch (err) {
            console.error("Login Error:", err);
            setError(err.response?.data?.message || "Gagal masuk. Periksa jaringan atau akun Anda.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-transparent">

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>
            {/* layout grid */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8 items-center">

                {/* panel kiri */}
                <motion.div
                    className="hidden lg:flex flex-col justify-center space-y-6 px-8"
                    initial={{ opacity: 0, x: -50 }}
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
                                FaceHealth ID
                            </span>
                        </motion.div>

                        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                            Selamat Datang!
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Pantau kesehatan kulitmu dengan teknologi AI dan dapatkan rekomendasi perawatan yang dipersonalisasi untukmu.
                        </p>
                    </div>
                </motion.div>

                {/* panel kanan */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/60">
                        <div className="text-center mb-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", duration: 0.6, delay: 0.3 }}
                                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg shadow-emerald-500/30"
                            >
                                <FiLogIn className="text-3xl text-white" />
                            </motion.div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Masuk Akun</h2>
                            <p className="text-gray-600 text-sm">
                                Masukkan Akun untuk melanjutkan langkah penanganan kulit Anda
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-700 text-sm rounded-2xl font-medium flex items-start gap-3 shadow-sm"
                                >
                                    <FiAlertCircle className="text-lg text-red-500 flex-shrink-0 mt-0.5" />
                                    <span>{error}</span>
                                </motion.div>
                            )}

                            {/* input email */}
                            <div className="space-y-2">
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
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-white text-gray-900 placeholder:text-gray-400 font-medium"
                                        placeholder="nama@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            {/* input password */}
                            <div className="space-y-2">
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
                                        className="w-full pl-12 pr-12 py-3.5 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all bg-white text-gray-900 placeholder:text-gray-400 font-medium"
                                        placeholder="••••••••"
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

                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: loading ? 1 : 1.02 }}
                                whileTap={{ scale: loading ? 1 : 0.98 }}
                                className={`w-full flex items-center justify-center gap-2 py-4 text-white rounded-xl font-semibold transition-all shadow-lg mt-6 ${loading
                                    ? 'bg-gray-300 cursor-not-allowed text-gray-500 shadow-none'
                                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-500/30'
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <FiLoader className="animate-spin text-lg" />
                                        <span>Memvalidasi Akun...</span>
                                    </>
                                ) : (
                                    <>
                                        <FiLogIn className="text-lg" />
                                        <span>Masuk Sekarang</span>
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {/* link egister*/}
                        <div className="mt-8 text-center">
                            <p className="text-gray-600 text-sm">
                                Belum punya akun?{' '}
                                <Link
                                    to="/register"
                                    className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors underline-offset-2 hover:underline"
                                >
                                    Daftar Sekarang
                                </Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;