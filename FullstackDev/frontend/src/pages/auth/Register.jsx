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
    FiLoader
} from 'react-icons/fi';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
            setError(err.response?.data?.message || "Gagal mendaftarkan akun. Terjadi gangguan jaringan (CORS) atau server sedang diperbarui.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-slate-50 flex items-center justify-center px-4 animate-page">
            <div className="max-w-md w-full bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 p-8 md:p-10 border border-slate-100/80">
                
                {/* Header */}
                <div className="text-center mb-9">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Daftar Akun</h2>
                    <p className="mt-3 text-sm text-gray-500 font-medium leading-relaxed px-2">
                        Buat akun FaceHealth ID untuk memantau perkembangan dan kesehatan kulitmu
                    </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    {/* Alert Box Error */}
                    {error && (
                        <div className="p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-800 text-sm rounded-r-xl font-medium shadow-sm transition-all animate-fadeIn flex items-start gap-2.5">
                            <FiAlertCircle className="text-base text-rose-500 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Alert Box Sukses */}
                    {success && (
                        <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 text-sm rounded-r-xl font-medium shadow-sm transition-all animate-fadeIn flex items-start gap-2.5">
                            <FiCheckCircle className="text-base text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{success}</span>
                        </div>
                    )}

                    {/* Input Nama */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Nama Lengkap</label>
                        <div className="relative flex items-center group">
                            <div className="absolute left-4 text-slate-400 transition-colors group-focus-within:text-emerald-500">
                                <FiUser className="text-base" />
                            </div>
                            <input
                                type="text"
                                required
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all bg-slate-50/50 text-sm font-medium text-slate-700"
                                placeholder="Nama Lengkap Anda"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Input Email */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
                        <div className="relative flex items-center group">
                            <div className="absolute left-4 text-slate-400 transition-colors group-focus-within:text-emerald-500">
                                <FiMail className="text-base" />
                            </div>
                            <input
                                type="type"
                                required
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all bg-slate-50/50 text-sm font-medium text-slate-700"
                                placeholder="nama@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Input Password */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Password</label>
                        <div className="relative flex items-center group">
                            <div className="absolute left-4 text-slate-400 transition-colors group-focus-within:text-emerald-500">
                                <FiLock className="text-base" />
                            </div>
                            <input
                                type="password"
                                required
                                minLength={6}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all bg-slate-50/50 text-sm font-medium text-slate-700"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Input Konfirmasi Password */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Konfirmasi Password</label>
                        <div className="relative flex items-center group">
                            <div className="absolute left-4 text-slate-400 transition-colors group-focus-within:text-emerald-500">
                                <FiLock className="text-base" />
                            </div>
                            <input
                                type="password"
                                required
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all bg-slate-50/50 text-sm font-medium text-slate-700"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    {/* Tombol Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 py-3.5 text-white rounded-xl font-semibold text-sm transition-all shadow-lg active:scale-[0.98] ${
                            loading 
                                ? 'bg-slate-300 cursor-not-allowed text-slate-500 shadow-none' 
                                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
                        }`}
                    >
                        {loading ? (
                            <>
                                <FiLoader className="animate-spin text-base" />
                                <span>Mendaftarkan Akun...</span>
                            </>
                        ) : (
                            <>
                                <FiUserPlus className="text-base" />
                                <span>Daftar Sekarang</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Footer Link */}
                <p className="mt-8 text-center text-sm text-gray-500 font-normal">
                    Sudah punya akun?{' '}
                    <Link to="/login" className="text-emerald-600 font-semibold hover:underline underline-offset-2 ml-0.5">
                        Masuk di sini
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;