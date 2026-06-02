import { useEffect } from 'react';
import { useLocation, Link } from 'react-router';
import {
    FiAward,
    FiSliders,
    FiCheckCircle,
    FiHeart,
    FiRotateCcw,
    FiActivity,
    FiAlertCircle,
    FiTrendingUp,
    FiZap,
    FiStar
} from 'react-icons/fi';
import { motion } from 'motion/react';
import { LuCat } from 'react-icons/lu';

const ResultPage = () => {
    const location = useLocation();
    const { recommendation } = location.state || {};

    useEffect(() => {
        if (recommendation) {
            console.log("Hasil analisis berhasil diterima dan diamankan ke riwayat.");
        }
    }, [recommendation]);

    if (!recommendation) {
        return (
            <div className="pt-32 text-center min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/30 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-md w-full bg-transparent p-10 rounded-[32px] shadow-2xl shadow-slate-300/50 border border-slate-100 flex flex-col items-center"
                >
                    <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 text-amber-600 rounded-2xl mb-5">
                        <FiAlertCircle className="text-3xl" />
                    </div>
                    <p className="text-gray-700 mb-6 font-bold text-lg">Data analisis tidak ditemukan.</p>
                    <Link
                        to="/analysis"
                        className="w-full text-center py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold hover:shadow-xl hover:scale-[1.02] transition-all shadow-lg shadow-emerald-200"
                    >
                        Kembali ke Form Analisis
                    </Link>
                </motion.div>
            </div>
        );
    }

    const infoAI = recommendation;
    const rekomendasiSkincare = infoAI.rekomendasi_skincare || "-";
    const renderSkincareContent = (data) => {
        if (!data) return "-";
        if (typeof data === "object") {
            console.error("raw:", data);
            return data.msg || JSON.stringify(data);
        }
        return data;
    };

    const isMetodeGambar = infoAI.sumber_deteksi === "AI Gambar";
    const detailKelasGambar = isMetodeGambar ? (infoAI.deteksi_asli?.predicted_class || "-") : "-";
    const detailAkurasiGambar = isMetodeGambar && infoAI.deteksi_asli?.confidence
        ? `${(infoAI.deteksi_asli.confidence * 100).toFixed(1)}%`
        : "-";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="pt-28 pb-20 min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/20 to-teal-50/30 flex flex-col justify-center items-center relative overflow-hidden">
            {/* backgroudn */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.03, 0.05, 0.03]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                        opacity: [0.03, 0.06, 0.03]
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-blue-400 to-emerald-400 rounded-full blur-3xl"
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-6xl w-full px-6 flex-grow relative z-10"
            >
                {/* Header */}
                <motion.div variants={itemVariants} className="text-center mb-12 relative">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                        <h2 className="text-emerald-600 font-bold uppercase tracking-widest text-xs bg-gradient-to-r from-emerald-50 to-teal-50 px-5 py-2 rounded-full inline-block shadow-sm border border-emerald-100">
                            <span className="flex items-center gap-2">
                                <LuCat className="text-sm" />
                                Hasil Analisis FaceHealth ID
                            </span>
                        </h2>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="mt-5 text-3xl md:text-5xl font-bold text-gray-900 tracking-tight flex items-center justify-center gap-3"
                    >
                        Rekomendasi Skincare Anda
                        <motion.div
                            animate={{
                                rotate: [0, 15, -15, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3
                            }}
                        >
                            <FiAward className="text-emerald-500 text-3xl md:text-4xl hidden sm:inline-block" />
                        </motion.div>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-slate-600 text-sm md:text-base mt-5 font-medium flex items-center justify-center gap-2 flex-wrap"
                    >
                        Metode Penentuan:
                        <span className="font-bold text-emerald-700 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 px-4 py-1.5 rounded-xl text-sm shadow-sm">
                            {infoAI.sumber_deteksi || "-"}
                        </span>
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* panel kiri */}
                    <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
                        <motion.div
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-[28px] p-8 shadow-xl shadow-slate-200/60 border border-slate-100/80 backdrop-blur-sm bg-white/90 relative overflow-hidden"
                        >
                            {/* dekoratif gradient */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/40 to-teal-100/40 rounded-full blur-2xl -mr-16 -mt-16" />

                            <h3 className="text-base font-bold text-gray-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-2 relative z-10">
                                <div className="p-1.5 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg">
                                    <FiSliders className="text-emerald-600 text-base" />
                                </div>
                                Profil Analisismu
                            </h3>

                            <div className="space-y-5 relative z-10">
                                <motion.div
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    className="flex flex-col space-y-2"
                                >
                                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider ml-1 flex items-center gap-1.5">
                                        <FiActivity className="text-xs" />
                                        Kategori Jerawat
                                    </span>
                                    <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50/60 to-emerald-100/40 border-2 border-emerald-200/60 px-4 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <div className="p-1.5 bg-white rounded-lg shadow-sm">
                                            <FiActivity className="text-emerald-600 text-base flex-shrink-0" />
                                        </div>
                                        <span className="font-bold text-emerald-900 text-sm md:text-base">
                                            {infoAI.kategori_tabular || "-"}
                                        </span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    className="flex flex-col space-y-2"
                                >
                                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider ml-1 flex items-center gap-1.5">
                                        <FiCheckCircle className="text-xs" />
                                        Prediksi Jenis Jerawat
                                    </span>
                                    <div className="flex items-center gap-3 bg-gradient-to-r from-teal-50/60 to-teal-100/40 border-2 border-teal-200/60 px-4 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <div className="p-1.5 bg-white rounded-lg shadow-sm">
                                            <FiCheckCircle className="text-teal-600 text-base flex-shrink-0" />
                                        </div>
                                        <span className="font-bold text-teal-900 text-sm md:text-base">
                                            {detailKelasGambar}
                                        </span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    className="flex flex-col space-y-2"
                                >
                                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider ml-1 flex items-center gap-1.5">
                                        <FiTrendingUp className="text-xs" />
                                        Tingkat Akurasi
                                    </span>
                                    <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50/60 to-blue-100/40 border-2 border-blue-200/60 px-4 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                                        <div className="p-1.5 bg-white rounded-lg shadow-sm">
                                            <FiHeart className="text-blue-600 text-base flex-shrink-0" />
                                        </div>
                                        <span className="font-bold text-blue-900 text-sm md:text-base flex items-center gap-1.5">
                                            {detailAkurasiGambar}
                                            {isMetodeGambar && infoAI.deteksi_asli?.confidence && (
                                                <FiStar className="text-amber-500 text-xs" />
                                            )}
                                        </span>
                                        {/* Progress bar */}
                                        {isMetodeGambar && infoAI.deteksi_asli?.confidence && (
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${infoAI.deteksi_asli.confidence * 100}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600"
                                            />
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                to="/analysis"
                                className="w-full flex items-center justify-center gap-2 py-4 bg-white border-2 border-emerald-600 text-emerald-600 rounded-xl font-bold text-sm hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all shadow-lg shadow-emerald-100/40 hover:shadow-xl hover:shadow-emerald-200/60"
                            >
                                <FiRotateCcw className="text-base" />
                                Analisis Ulang
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* panel kanan */}
                    <motion.div variants={itemVariants} className="lg:col-span-2">
                        <motion.div
                            whileHover={{ y: -4 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-[28px] p-8 md:p-10 shadow-xl shadow-slate-200/60 border border-slate-100/80 min-h-[350px] flex flex-col justify-between relative overflow-hidden backdrop-blur-sm bg-white/95"
                        >
                            <div className="space-y-6 relative z-10">
                                <h3 className="text-base font-bold text-gray-900 border-b border-slate-100 pb-4 flex items-center gap-2">
                                    <div className="p-1.5 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg">
                                        <FiAward className="text-emerald-600 text-base" />
                                    </div>
                                    Rekomendasi Skincare Terpilih
                                </h3>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                    className="p-8 md:p-10 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 rounded-2xl text-white shadow-2xl shadow-emerald-300/40 relative overflow-hidden group"
                                >
                                    <motion.div
                                        animate={{
                                            x: ['-100%', '100%']
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            repeatDelay: 5,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                    />

                                    {/* rekomendasi skincare */}
                                    <div className="relative z-10 flex items-start gap-4">
                                        <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl flex-shrink-0 mt-1">
                                            <FiZap className="text-2xl text-white" />
                                        </div>
                                        <h4 className="text-base md:text-lg font-medium leading-relaxed whitespace-pre-line tracking-wide flex-1">
                                            {renderSkincareContent(rekomendasiSkincare)}
                                        </h4>
                                    </div>
                                </motion.div>
                            </div>

                            {/* disclaimer */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                whileHover={{ scale: 1.01 }}
                                className="bg-gradient-to-r from-slate-50 to-emerald-50/30 border-l-4 border-emerald-500 p-6 rounded-r-2xl mt-8 flex items-start gap-4 relative z-10 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="p-2 bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600 rounded-xl flex-shrink-0 mt-0.5 shadow-sm">
                                    <FiAlertCircle className="text-base" />
                                </div>

                                <div className="space-y-3 flex-grow">
                                    <p className="text-xs font-bold text-slate-800 tracking-wide uppercase flex items-center gap-2">
                                        Catatan Penting Pemakaian:
                                    </p>

                                    {/* poin edukasi */}
                                    <ul className="space-y-3 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed list-none">
                                        <motion.li
                                            whileHover={{ x: 4 }}
                                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/60 transition-all"
                                        >
                                            <span className="text-emerald-500 font-bold mt-0.5 text-base">•</span>
                                            <span>Selalu lakukan <span className="font-bold text-slate-800 bg-emerald-50 px-1.5 py-0.5 rounded">patch test</span> terlebih dahulu pada area kecil kulit sebelum beralih ke penggunaan secara menyeluruh.</span>
                                        </motion.li>
                                        <motion.li
                                            whileHover={{ x: 4 }}
                                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/60 transition-all"
                                        >
                                            <span className="text-emerald-500 font-bold mt-0.5 text-base">•</span>
                                            <span>Wajib gunakan <span className="font-bold text-slate-800 bg-amber-50 px-1.5 py-0.5 rounded">sunscreen</span> di siang hari, meskipun Anda hanya beraktivitas di dalam rumah.</span>
                                        </motion.li>
                                        <motion.li
                                            whileHover={{ x: 4 }}
                                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/60 transition-all"
                                        >
                                            <span className="text-emerald-500 font-bold mt-0.5 text-base">•</span>
                                            <span>Fokus perbaiki <span className="font-bold text-slate-800 bg-blue-50 px-1.5 py-0.5 rounded">skin barrier</span> dengan rutin mengaplikasikan <span className="italic font-medium">basic skincare</span> utama (Cleanser/Face Wash, Moisturizer, dan Sunscreen) agar bahan aktif bisa bekerja secara maksimal.</span>
                                        </motion.li>
                                    </ul>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ResultPage;