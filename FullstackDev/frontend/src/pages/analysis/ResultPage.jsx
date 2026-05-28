import { useLocation, Link } from 'react-router-dom';

const ResultPage = () => {
    const location = useLocation();
    const { recommendation } = location.state || {};

    if (!recommendation) {
        return (
            <div className="pt-32 text-center min-h-screen bg-slate-50">
                <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                    <p className="text-gray-600 mb-4 font-medium">Data analisis tidak ditemukan.</p>
                    <Link to="/analysis" className="text-emerald-600 font-bold underline hover:text-emerald-700">
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
                
                {/* Header  */}
                <div className="text-center mb-12">
                    <h2 className="text-emerald-600 font-bold uppercase tracking-widest text-sm">Hasil Analisis</h2>
                    <h1 className="mt-2 text-4xl font-black text-gray-900 tracking-tight">Rekomendasi Skincare Anda</h1>
                    <p className="text-gray-500 text-base mt-3 font-medium">
                        Metode Penentuan: <span className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl text-sm">{infoAI.sumber_deteksi || "-"}</span>
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                 
                    {/* Panel Kiri*/}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-[24px] p-8 shadow-xl shadow-slate-200/60 border border-slate-100/80">
                            <h3 className="text-xl font-extrabold text-gray-900 mb-6 border-b border-slate-100 pb-3">Profil Analisis</h3>
                            
                            <div className="space-y-5">
                                <div className="flex flex-col space-y-1.5">
                                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Kategori Jerawat </span>
                                    <span className="font-bold text-emerald-800 bg-emerald-50 px-4 py-2.5 rounded-xl text-base inline-block">
                                        {infoAI.kategori_tabular || "-"}
                                    </span>
                                </div>
                                
                                <div className="flex flex-col space-y-1.5">
                                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Prediksi jenis jerawat</span>
                                    <span className="font-bold text-teal-800 bg-teal-50 px-4 py-2.5 rounded-xl text-base inline-block">
                                        {detailKelasGambar}
                                    </span>
                                </div>
                                
                                <div className="flex flex-col space-y-1.5">
                                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Tingkat akurasi</span>
                                    <span className="font-bold text-blue-800 bg-blue-50 px-4 py-2.5 rounded-xl text-base inline-block">
                                        {detailAkurasiGambar}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Link 
                            to="/analysis" 
                            className="block text-center py-4 bg-white border-2 border-emerald-600 text-emerald-600 rounded-2xl font-black text-lg hover:bg-emerald-50 transition-all shadow-md shadow-emerald-100 active:scale-[0.99]"
                        >
                            Analisis Ulang
                        </Link>
                    </div>

                    {/* Panel Kanan */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-xl shadow-slate-200/60 border border-slate-100/80 min-h-[300px] flex flex-col justify-between">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-black text-gray-900 border-b border-slate-100 pb-4">Rekomendasi Skincare Terpilih</h3>
                                
                                <div className="p-8 bg-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-200/60">
                                    <h4 className="text-2xl md:text-3xl font-black leading-relaxed whitespace-pre-line">
                                        {rekomendasiSkincare}
                                    </h4>
                                </div>
                            </div>

                            {/* note   */}
                            <div className="bg-slate-50 border-l-4 border-slate-400 p-5 rounded-r-xl mt-8">
                                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                    Disclaimer: Selalu lakukan patch test sebelum beralih ke penggunaan menyeluruh.
                                </p>
                            </div>
                        </div>
                    </div>
                     
                </div>
            </div>
        </div>
    );
};

export default ResultPage;