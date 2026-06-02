import { useState, useEffect } from "react";
import axios from "axios";
import { FiActivity, FiAward, FiAlertCircle, FiCalendar, FiUser } from "react-icons/fi";

const HistoryPage = () => {
    const [historyData, setHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://facehealth-backend.vercel.app/api/history", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.success) {
                    setHistoryData(response.data.data);
                }
            } catch {
                setError("Gagal memuat riwayat analisis kulit Anda.");
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const groupHistoryByMonth = (data) => {
        return data.reduce((groups, item) => {
            const date = new Date(item.createdAt);
            const monthYear = date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });

            if (!groups[monthYear]) {
                groups[monthYear] = [];
            }
            groups[monthYear].push(item);
            return groups;
        }, {});
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    const groupedHistory = groupHistoryByMonth(historyData);

    return (
        <div className="pt-28 pb-20 min-h-screen bg-slate-50 px-4 md:px-8">
            <div className="max-w-5xl mx-auto space-y-10">

                {/* Header */}
                <div className="border-b border-slate-200 pb-5">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
                        Riwayat Analisis Kulit
                    </h1>
                    <p className="text-sm text-slate-500 mt-2 font-medium">
                        Pantau perkembangan kesehatan wajah dan rekomendasi produk Anda berdasarkan lini masa pemeriksaan.
                    </p>
                </div>

                {/* error */}
                {error && (
                    <div className="p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-800 text-sm rounded-r-xl flex items-center gap-2 shadow-sm animate-fadeIn">
                        <FiAlertCircle className="text-base flex-shrink-0" /> <span>{error}</span>
                    </div>
                )}

                {/* page kosong */}
                {historyData.length === 0 ? (
                    <div className="bg-white rounded-[24px] border border-slate-100 p-16 text-center text-slate-400 font-medium shadow-sm">
                        <FiCalendar className="text-5xl mx-auto mb-4 text-slate-300" />
                        Belum ada riwayat analisis wajah ditemukan. Silakan lakukan pemeriksaan terlebih dahulu.
                    </div>
                ) : (
                    <div className="space-y-12 relative before:absolute before:top-4 before:bottom-4 before:left-3.5 md:before:left-6 before:w-0.5 before:bg-slate-200/70">
                        {Object.keys(groupedHistory).map((monthYear) => (
                            <div key={monthYear} className="space-y-5 relative">

                                {/* timeline */}
                                <div className="flex items-center gap-3 relative z-10">
                                    <div className="w-7 h-7 md:w-12 md:h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center border-4 border-slate-50 shadow-md">
                                        <FiCalendar className="text-xs md:text-base" />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-bold text-slate-800 bg-slate-50 pr-4">
                                        {monthYear}
                                    </h2>
                                </div>
                                {/* grid */}
                                <div className="pl-8 md:pl-16 space-y-6">
                                    {groupedHistory[monthYear].map((item) => (
                                        <div
                                            key={item._id}
                                            className="bg-white border border-slate-100 rounded-[24px] p-6 md:p-8 shadow-xl shadow-slate-200/30 hover:shadow-xl hover:shadow-slate-300/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start group relative"
                                        >
                                            {/* kolom 1 */}
                                            <div className="space-y-3 lg:border-r lg:border-slate-100 lg:pr-4 h-full flex flex-col justify-between">
                                                <div className="space-y-1">
                                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                                                        Waktu Analisis
                                                    </span>
                                                    <p className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                                                        {new Date(item.createdAt).toLocaleDateString("id-ID", {
                                                            day: "numeric",
                                                            weekday: "long"
                                                        })}
                                                        <span className="text-slate-300 font-normal">|</span>
                                                        <span className="text-slate-500 font-normal text-xs">
                                                            {new Date(item.createdAt).toLocaleTimeString("id-ID", {
                                                                hour: "2-digit",
                                                                minute: "2-digit"
                                                            })} WIB
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="pt-2">
                                                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-semibold text-xs px-3 py-1 rounded-lg border border-emerald-100/70">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                        {item.sumber_deteksi}
                                                    </span>
                                                </div>
                                            </div>
                                            {/* kolom 2 */}
                                            <div className="space-y-4 flex flex-col justify-between h-full lg:border-r lg:border-slate-100 lg:pr-4 w-full">
                                                {/* kolom atas */}
                                                <div className="space-y-2 pt-1">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                                                        <FiUser className="text-slate-400" /> Profil Kondisi Kulit
                                                    </span>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        <span className="bg-amber-50 text-amber-800 font-semibold text-[11px] px-2.5 py-0.5 rounded-md border border-amber-200/60">
                                                            {item.age_group ? `Usia: ${item.age_group}` : "-"}
                                                        </span>

                                                        <span className="bg-slate-100 text-slate-700 font-medium text-[11px] px-2.5 py-0.5 rounded-md border border-slate-200/60">
                                                            {item.skin_type || "-"}
                                                        </span>

                                                        <span className="bg-blue-50/70 text-blue-700 font-medium text-[11px] px-2.5 py-0.5 rounded-md border border-blue-100/60">
                                                            {item.skin_subtype || "-"}
                                                        </span>
                                                        <span className={`font-medium text-[11px] px-2.5 py-0.5 rounded-md border ${item.sensitivity === "Sensitive"
                                                            ? "bg-rose-50 text-rose-700 border-rose-100"
                                                            : "bg-slate-100 text-slate-600 border-slate-200/60"
                                                            }`}>
                                                            {item.sensitivity === "Sensitive" ? "Sensitif" : "Normal"}
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* kolom bawah */}
                                                <div className="space-y-3 bg-slate-50/70 p-4 rounded-xl border border-slate-100/50 w-full mt-auto">
                                                    <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-200/60 flex items-center gap-1.5">
                                                        <FiActivity className="text-emerald-600" /> Profil Analisis
                                                    </h4>
                                                    <div className="space-y-1.5 text-xs md:text-sm">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-slate-500 font-medium">Kategori Jerawat:</span>
                                                            <span className="font-bold text-emerald-800">{item.kategori_tabular}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-slate-500 font-medium">Prediksi Jenis:</span>
                                                            <span className="font-bold text-teal-800">{item.predicted_class}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-slate-500 font-medium">Tingkat Akurasi:</span>
                                                            <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md text-xs">{item.confidence}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* kolom 3 */}
                                            <div className="space-y-2.5 h-full flex flex-col justify-between">
                                                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                                    <FiAward className="text-teal-600" /> Rekomendasi Skincare Terpilih
                                                </h4>
                                                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium bg-gradient-to-br from-slate-50 to-emerald-50/20 p-4 rounded-xl border border-slate-200/60 whitespace-pre-line flex-grow">
                                                    {item.rekomendasi_skincare}
                                                </p>
                                            </div>

                                        </div>
                                    ))}
                                </div>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;