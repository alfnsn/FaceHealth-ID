import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
            const response = await axios.post("http://localhost:5001/api/users/register", {
                name,
                email,
                password
            });

            if (response.data.success || response.status === 201) {
                setSuccess('Akun berhasil dibuat! Mengalihkan ke halaman login...');
                localStorage.setItem('userName', response.data.user.name);

                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');

                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            }
        } catch (err) {
            console.error("Register Error:", err);
            setError(err.response?.data?.message || "Gagal mendaftarkan akun. Silakan coba kembali.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-24 pb-16 min-h-screen bg-slate-50 flex items-center justify-center px-4 animate-page">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-8 md:p-10 border border-slate-100">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900">Daftar Akun</h2>
                    <p className="mt-2 text-gray-600 font-medium">Buat akun FaceHealth ID untuk memantau perkembangan kulitmu</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    {/* Alert Box Error */}
                    {error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded-r-xl font-medium">
                             {error}
                        </div>
                    )}

                    {/* Alert Box Sukses */}
                    {success && (
                        <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 text-xs rounded-r-xl font-medium">
                             {success}
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Nama Lengkap</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-gray-50 text-gray-700"
                            placeholder="Nama Anda"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="space-y-1">
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

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            minLength={6} 
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-gray-50 text-gray-700"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Konfirmasi Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-gray-50 text-gray-700"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 text-white rounded-2xl font-bold text-lg transition-all shadow-lg active:scale-[0.98] ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
                            }`}
                    >
                        {loading ? 'Mendaftarkan Akun...' : 'Daftar Sekarang'}
                    </button>
                </form>

                <p className="mt-8 text-center text-gray-600">
                    Sudah punya akun?{' '}
                    <Link to="/login" className="text-emerald-600 font-bold hover:underline">
                        Masuk di sini
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;