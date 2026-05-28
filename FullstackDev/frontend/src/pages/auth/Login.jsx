import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
            const response = await axios.post("http://localhost:5001/api/users/login", {
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
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 md:p-10 border border-slate-100">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">Selamat Datang</h2>
                    <p className="mt-2 text-gray-600 font-medium">Masuk untuk menyimpan riwayat analisis kulitmu</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded-r-xl font-medium">
                             {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
                        <input 
                            type="email" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-gray-50 text-gray-700" 
                            placeholder="nama@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-sm font-semibold text-gray-700">Password</label>
                        </div>
                        <input 
                            type="password" 
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-gray-50 text-gray-700" 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 text-white rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-[0.98] ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
                        }`}
                    >
                        {loading ? 'Memvalidasi Akun...' : 'Masuk'}
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-600">
                    Belum punya akun?{' '}
                    <Link to="/register" className="text-emerald-600 font-bold hover:underline">
                        Daftar Sekarang
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;