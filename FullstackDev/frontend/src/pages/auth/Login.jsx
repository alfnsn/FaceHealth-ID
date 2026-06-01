import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    FiMail, 
    FiLock, 
    FiLogIn, 
    FiAlertCircle, 
    FiLoader 
} from 'react-icons/fi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        <div className="pt-24 pb-16 min-h-screen bg-slate-50 flex items-center justify-center px-4 animate-page">
            <div className="max-w-md w-full bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 p-8 md:p-10 border border-slate-100/80">
                
                {/* Header */}
                <div className="text-center mb-9">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Selamat Datang</h2>
                    <p className="mt-3 text-sm text-gray-500 font-medium leading-relaxed px-4">
                        Masuk untuk menyimpan dan melihat kembali riwayat analisis kondisi kulitmu
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Alert Box Error */}
                    {error && (
                        <div className="p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-800 text-sm rounded-r-xl font-medium shadow-sm transition-all animate-fadeIn flex items-start gap-2.5">
                            <FiAlertCircle className="text-base text-rose-500 flex-shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Input Email */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Email</label>
                        <div className="relative flex items-center group">
                            <div className="absolute left-4 text-slate-400 transition-colors group-focus-within:text-emerald-500">
                                <FiMail className="text-base" />
                            </div>
                            <input 
                                type="email" 
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
                        <div className="flex justify-between items-center px-1">
                            <label className="text-sm font-semibold text-slate-700">Password</label>
                        </div>
                        <div className="relative flex items-center group">
                            <div className="absolute left-4 text-slate-400 transition-colors group-focus-within:text-emerald-500">
                                <FiLock className="text-base" />
                            </div>
                            <input 
                                type="password" 
                                required
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all bg-slate-50/50 text-sm font-medium text-slate-700" 
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                <span>Memvalidasi Akun...</span>
                            </>
                        ) : (
                            <>
                                <FiLogIn className="text-base" />
                                <span>Masuk</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Footer Link */}
                <p className="mt-8 text-center text-sm text-gray-500 font-normal">
                    Belum punya akun?{' '}
                    <Link to="/register" className="text-emerald-600 font-semibold hover:underline underline-offset-2 ml-0.5">
                        Daftar Sekarang
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;