import { useLocation, Link } from 'react-router-dom';
import {
    FiAward,
    FiSliders,
    FiCheckCircle,
    FiHeart,
    FiRotateCcw,
    FiActivity,
    FiAlertCircle
} from 'react-icons/fi';

const ResultPage = () => {
    const location = useLocation();
    const { recommendation } = location.state || {};

    if (!recommendation) {
        return (
            <div className="pt-32 text-center min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white p-10 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center">
                    <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl mb-5">
                        <FiAlertCircle className="text-3xl" />
                    </div>
                    <p className="text-gray-700 mb-6 font-bold text-lg">Data analisis tidak ditemukan.</p>
                    <Link
                        to="/analysis"
                        className="w-full text-center py-3.5 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                    >
                        Kembali ke Form Analisis
                    </Link>
                </div>
            </div>
        );
    }

    const infoAI = recommendation;
    const rekomendasiSkincare = infoAI.rekomendasi_skincare || "-";

    const isMetodeGambar = infoAI.sumber_deteksi === "AI Gambar";
    const detailKelasGambar = isMetodeGambar ? (infoAI.deteksi_asli?.predicted_class || "-") : "-";
    const detailAkurasiGambar = isMetodeGambar && infoAI.deteksi_asli?.confidence
        ? `${(infoAI.deteksi_asli.confidence * 100).toFixed(1)}%`
        : "-";

    return (
        <div className="pt-28 pb-20 min-h-screen bg-slate-50 flex flex-col justify-center items-center animate-page">
            <div className="max-w-6xl w-full px-6 flex-grow">

                {/* Header */}
                <div className="text-center mb-12 relative">
                    <h2 className="text-emerald-600 font-bold uppercase tracking-widest text-xs bg-emerald-50 px-4 py-1.5 rounded-full inline-block">
                        Hasil Analisis FaceHealth ID
                    </h2>
                    <h1 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight flex items-center justify-center gap-3">
                        Rekomendasi Skincare Anda
                        <FiAward className="text-emerald-500 text-2xl md:text-3xl animate-bounce hidden sm:inline-block" />
                    </h1>
                    <p className="text-slate-500 text-sm md:text-base mt-4 font-medium flex items-center justify-center gap-1.5">
                        Metode Penentuan: 
                        <span className="font-semibold text-emerald-700 bg-emerald-50/60 border border-emerald-100/80 px-3 py-0.5 rounded-lg text-sm ml-1">
                            {infoAI.sumber_deteksi || "-"}
                        </span>
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* Panel Kiri */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-[28px] p-8 shadow-xl shadow-slate-200/40 border border-slate-100/80">
                            <h3 className="text-base font-bold text-gray-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
                                <FiSliders className="text-emerald-600 text-base" />
                                Profil Analisismu
                            </h3>

                            <div className="space-y-5">
                                <div className="flex flex-col space-y-2">
                                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider ml-1">Kategori Jerawat</span>
                                    <div className="flex items-center gap-3 bg-emerald-50/40 border border-emerald-100/50 px-4 py-3 rounded-xl">
                                        <FiActivity className="text-emerald-600 text-base flex-shrink-0" />
                                        <span className="font-semibold text-emerald-900 text-sm md:text-base">
                                            {infoAI.kategori_tabular || "-"}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider ml-1">Prediksi Jenis Jerawat</span>
                                    <div className="flex items-center gap-3 bg-teal-50/40 border border-teal-100/50 px-4 py-3 rounded-xl">
                                        <FiCheckCircle className="text-teal-600 text-base flex-shrink-0" />
                                        <span className="font-semibold text-teal-900 text-sm md:text-base">
                                            {detailKelasGambar}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider ml-1">Tingkat Akurasi</span>
                                    <div className="flex items-center gap-3 bg-blue-50/40 border border-blue-100/50 px-4 py-3 rounded-xl">
                                        <FiHeart className="text-blue-600 text-base flex-shrink-0" />
                                        <span className="font-semibold text-blue-900 text-sm md:text-base">
                                            {detailAkurasiGambar}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link
                            to="/analysis"
                            className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border border-emerald-600 text-emerald-600 rounded-xl font-semibold text-sm hover:bg-emerald-50/50 transition-all shadow-md shadow-emerald-100/30 active:scale-[0.99]"
                        >
                            <FiRotateCcw className="text-base" />
                            Analisis Ulang
                        </Link>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[28px] p-8 md:p-10 shadow-xl shadow-slate-200/40 border border-slate-100/80 min-h-[350px] flex flex-col justify-between relative overflow-hidden">

                            <div className="absolute -right-8 -top-4 text-slate-100/20 pointer-events-none transform scale-150 rotate-12">
                                <FiActivity className="text-9xl text-slate-100/30" />
                            </div>

                            <div className="space-y-6 relative z-10">
                                <h3 className="text-base font-bold text-gray-900 border-b border-slate-100 pb-4 flex items-center gap-2">
                                    <FiAward className="text-emerald-600 text-base" />
                                    Rekomendasi Skincare Terpilih
                                </h3>

                                <div className="p-8 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl text-white shadow-lg shadow-emerald-200/30 relative overflow-hidden">
                                    <h4 className="text-base md:text-lg font-medium leading-relaxed whitespace-pre-line tracking-wide">
                                        {rekomendasiSkincare}
                                    </h4>
                                </div>
                            </div>

                            {/* Note / Disclaimer */}
                            <div className="bg-slate-50 border-l-4 border-emerald-500 p-5 rounded-r-2xl mt-8 flex items-start gap-4 relative z-10 transition-all duration-300 hover:bg-slate-100/50">
                                <div className="p-1.5 bg-emerald-100/60 text-emerald-600 rounded-lg flex-shrink-0 mt-0.5 shadow-sm">
                                    <FiAlertCircle className="text-base" />
                                </div>

                                <div className="space-y-2 flex-grow">
                                    <p className="text-xs font-bold text-slate-800 tracking-wide uppercase">
                                        Catatan Penting Pemakaian:
                                    </p>

                                    {/* Poin Edukasi */}
                                    <ul className="space-y-2 text-xs sm:text-sm text-slate-500 font-normal leading-relaxed list-none">
                                        <li className="flex items-start gap-2">
                                            <span className="text-emerald-500 font-bold mt-0.5">•</span>
                                            <span>Selalu lakukan <span className="font-semibold text-slate-700">patch test</span> terlebih dahulu pada area kecil kulit sebelum beralih ke penggunaan secara menyeluruh.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-emerald-500 font-bold mt-0.5">•</span>
                                            <span>Wajib gunakan <span className="font-semibold text-slate-700">sunscreen</span> di siang hari, meskipun Anda hanya beraktivitas di dalam rumah.</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-emerald-500 font-bold mt-0.5">•</span>
                                            <span>Fokus perbaiki <span className="font-semibold text-slate-700">skin barrier</span> dengan rutin mengaplikasikan <span className="italic">basic skincare</span> utama (Cleanser/Face Wash, Moisturizer, dan Sunscreen) agar bahan aktif bisa bekerja secara maksimal.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ResultPage;