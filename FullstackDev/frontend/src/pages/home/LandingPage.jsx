import { Link } from 'react-router-dom';
import {
    FiMaximize,
    FiClipboard,
    FiBookOpen,
    FiAlertCircle,
    FiShield,
    FiCpu,
    FiLayers,
    FiHeart
} from "react-icons/fi";
import bgImage from '../../assets/bg.jpg';

const LandingPage = () => {
    return (
        <div className="w-full bg-white pt-16 min-h-screen animate-page font-sans">

            {/* HERO SECTION */}
            <div
                className="relative bg-cover bg-center bg-no-repeat py-24 md:py-32 text-white"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="absolute inset-0 bg-slate-950/60 md:bg-gradient-to-r from-slate-950/85 to-slate-950/40 z-0"></div>

                <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            Solusi Cerdas untuk <br />
                            <span className="text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-xl inline-block mt-2  ">
                                Kulit Sehatmu.
                            </span>
                        </h1>
                        <p className="mt-6 text-base md:text-lg text-slate-200 leading-relaxed font-medium">
                            Dapatkan paket rekomendasi skincare yang dipersonalisasi khusus untuk kondisi jerawat Anda. Menggunakan teknologi analisis cerdas untuk hasil yang akurat, efektif, dan aman bagi skin barrier.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/analysis"
                                className="flex justify-center items-center px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg hover:bg-emerald-500 transform hover:-translate-y-1 transition-all shadow-xl shadow-emerald-900/40 active:scale-[0.98]"
                            >
                                Mulai Analisis Sekarang
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            {/* section 2 */}
            <section className="py-24 bg-gradient-to-b from-white to-slate-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center max-w-4xl mx-auto mb-20">
                        <h2 className="text-emerald-600 font-extrabold tracking-widest uppercase text-xs sm:text-sm">
                            Tentang Platform Kami
                        </h2>
                        <p className="mt-3 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                            Apa itu FaceHealth ID?
                        </p>

                        <div className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed font-medium space-y-4 max-w-3xl mx-auto">
                            <p>
                                <span className="font-bold text-gray-900">FaceHealth ID</span> merupakan sistem berbasis kecerdasan buatan (AI) yang dirancang secara khusus untuk membantu deteksi dini dan klasifikasi tingkat keparahan jerawat secara cepat, akurat, dan mudah diakses dari perangkat Anda.
                            </p>
                            <p className="text-sm sm:text-base text-gray-500 font-normal">
                                Pengembangan platform ini didasarkan pada tingginya prevalensi jerawat di kalangan remaja maupun dewasa muda, yang sering kali terkendala oleh keterbatasan akses konsultasi klinis yang cepat. Platform ini hadir sebagai solusi pintar dalam mengenali karakteristik kulit Anda guna menentukan rekomendasi langkah awal yang tepat.
                            </p>
                        </div>
                    </div>

                    {/* card */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                        {/* Card 1 */}
                        <div className="p-8 rounded-[24px] bg-emerald-50/40 border border-emerald-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-emerald-200">
                                    <FiMaximize className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Analisis Presisi AI</h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                    Memanfaatkan kecerdasan buatan terintegrasi untuk mendeteksi kluster kondisi jerawat wajah Anda secara instan melalui unggahan foto ataupun input data manual.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="p-8 rounded-[24px] bg-white border border-slate-200/60 shadow-sm hover:border-teal-200 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 bg-teal-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-teal-100">
                                    <FiClipboard className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Rekomendasi Personal</h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                    Hasil evaluasi disesuaikan secara khusus berdasarkan karakteristik tipe kulit, subtype kulit, rentang usia, hingga tingkat sensitivitas profil kulit.
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="p-8 rounded-[24px] bg-emerald-50/40 border border-emerald-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 bg-emerald-800 text-white rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-emerald-900/10">
                                    <FiBookOpen className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight">Identifikasi Mandiri</h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                    Membantu mengedukasi Anda dalam mengenali perbedaan karakteristik gejala kulit secara mandiri, sehingga potensi salah penanganan masalah wajah dapat diminimalisir.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3 */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute -right-20 -bottom-20 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        <div className="space-y-4">
                            <h2 className="text-emerald-400 font-bold tracking-widest uppercase text-xs sm:text-sm">
                                Apa pentingnya mengenal masalah kulit?
                            </h2>
                            <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-white">
                                Menangani Masalah Kulit <br className="hidden sm:inline" />Sebelum Terlambat
                            </h3>
                            <p className="text-slate-400 text-base leading-relaxed font-normal pt-2">
                                Kesulitan mengenali tipe jerawat sejak gejala awal muncul sering kali berujung pada pemilihan produk perawatan yang salah. Bukannya sembuh, kondisi <span className="text-emerald-300 font-medium underline underline-offset-4 decoration-emerald-500/30">skin barrier</span> justru berisiko mengalami inflamasi yang jauh lebih parah.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                            <div className="p-6 bg-slate-800/40 border border-slate-700/40 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-300 hover:border-slate-700 hover:bg-slate-800/60 group">
                                <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center text-xl transition-all group-hover:bg-amber-500 group-hover:text-slate-900 shadow-sm">
                                    <FiAlertCircle />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-base font-bold text-slate-100">Akses Terbatas</h4>
                                    <p className="text-sm text-slate-400 font-normal leading-relaxed">
                                        Layanan konsultasi dermatologi langsung sering kali membutuhkan waktu tunggu lama dan biaya yang tidak murah.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-800/40 border border-slate-700/40 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-300 hover:border-slate-700 hover:bg-slate-800/60 group">
                                <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-xl flex items-center justify-center text-xl transition-all group-hover:bg-rose-500 group-hover:text-white shadow-sm">
                                    <FiShield />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-base font-bold text-slate-100">Risiko Salah Rawat</h4>
                                    <p className="text-sm text-slate-400 font-normal leading-relaxed">
                                        Membeli skincare tanpa mengetahui kondisi klinis objektif wajah berpotensi memperburuk jerawat meradang Anda.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* Section 4 */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">

                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-emerald-600 font-bold tracking-widest uppercase text-xs sm:text-sm">
                            Menggabungkan AI dan Data Profil
                        </h2>
                        <h3 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                            Penggabungan Dua Pendekatan Utama
                        </h3>
                    </div>

                    {/* grid kartu */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                        <div className="p-8 rounded-[24px] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start group">
                            <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl text-xl flex-shrink-0 transition-all group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                                <FiCpu />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-lg font-bold text-gray-900">Teknologi AI</h4>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                                    Model kecerdasan buatan mengevaluasi foto area wajah untuk mengklasifikasikan kluster jerawat (seperti komedo, papul, pustul, atau cyst) dengan tingkat akurasi tinggi.
                                </p>
                            </div>
                        </div>

                        <div className="p-8 rounded-[24px] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start group">
                            <div className="p-3.5 bg-purple-50 text-purple-600 rounded-xl text-xl flex-shrink-0 transition-all group-hover:bg-purple-600 group-hover:text-white shadow-sm">
                                <FiLayers />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-lg font-bold text-gray-900">Analisis Gejala Klinis</h4>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                                    Mengintegrasikan data profil kondisi kulit seperti rentang usia, tipe/subtype kulit, serta tingkat sensitivitas untuk meningkatkan prediksi rekomendasi.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* section 5 */}
            <section className="py-20 bg-white border-t border-slate-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
                    <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto text-xl shadow-inner">
                        <FiHeart />
                    </div>
                    <p className="text-sm sm:text-base text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium">
                        FaceHealth ID dikembangkan sebagai <span>painkiller</span> nyata yang berfokus pada langkah preventif, edukasi mandiri, serta perluasan aksesibilitas kesehatan kulit berbasis digital yang inklusif untuk siapa saja.
                    </p>
                </div>
            </section>

        </div>
    );
};

export default LandingPage;