import { Link } from 'react-router-dom';
import {
    FiMaximize,
    FiClipboard,
    FiBookOpen,
    FiAlertCircle,
    FiShield,
    FiCpu,
    FiLayers,
    FiHeart,
} from "react-icons/fi";
import bgImage from '../../assets/bg.jpg';
import { motion } from 'motion/react';

const LandingPage = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    };

    const staggerContainer = {
        initial: {},
        whileInView: { transition: { staggerChildren: 0.1 } },
        viewport: { once: true, margin: "-50px" }
    };

    const scaleIn = {
        initial: { opacity: 0, scale: 0.9 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    };

    return (
        <div className="w-full bg-transparent pt-16 min-h-screen font-sans overflow-hidden">

            {/* heor section */}
            <div
                className="relative bg-cover bg-center bg-no-repeat py-24 md:py-32 text-white overflow-hidden"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                {/*bg gelap */}
                <div className="absolute inset-0 bg-slate-950/60 md:bg-gradient-to-r from-slate-950/85 to-slate-950/40 z-0"></div>

                <motion.div
                    className="absolute top-20 right-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-10 right-1/4 w-64 h-64 bg-teal-400/15 rounded-full blur-[80px]"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                {/* section 1 */}
                <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                    <motion.div
                        className="max-w-2xl"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.h1
                            className="text-4xl md:text-6xl font-black text-white leading-tight"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            Solusi Cerdas untuk <br />
                            <motion.span
                                className="text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-xl inline-block mt-2 relative"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                Kulit Sehatmu
                                <motion.div
                                    className="absolute -top-1 -right-1"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 10, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                </motion.div>
                            </motion.span>
                        </motion.h1>

                        <motion.p
                            className="mt-6 text-base md:text-lg text-slate-200 leading-relaxed font-medium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            Dapatkan paket rekomendasi skincare yang dipersonalisasi khusus untuk kondisi jerawat Anda. Menggunakan teknologi analisis cerdas untuk hasil yang akurat, efektif, dan aman bagi skin barrier.
                        </motion.p>

                        <motion.div
                            className="mt-10 flex flex-col sm:flex-row gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Link
                                to="/analysis"
                                className="group relative flex justify-center items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl font-bold text-lg hover:from-emerald-500 hover:to-emerald-400 transform hover:-translate-y-1 transition-all shadow-xl shadow-emerald-900/40 active:scale-[0.98] overflow-hidden"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-white/20"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.5 }}
                                />
                                <span className="relative flex items-center gap-2">
                                    Mulai Analisis Sekarang
                                </span>
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>
            </div>

            {/* section 2 */}
            <section className="py-24 bg-transparent relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-100/30 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        className="text-center max-w-4xl mx-auto mb-20"
                        {...fadeInUp}
                    >
                        <motion.h2
                            className="text-emerald-600 font-extrabold tracking-widest uppercase text-xs sm:text-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Tentang Platform Kami
                        </motion.h2>
                        <motion.p
                            className="mt-3 text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            Apa itu FaceHealth ID?
                        </motion.p>

                        <motion.div
                            className="mt-6 text-gray-600 text-base sm:text-lg leading-relaxed font-medium space-y-4 max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <p>
                                <span className="font-bold text-gray-900 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">FaceHealth ID</span> merupakan sistem berbasis kecerdasan buatan (AI) yang dirancang secara khusus untuk membantu deteksi dini dan klasifikasi tingkat keparahan jerawat secara cepat, akurat, dan mudah diakses dari perangkat Anda.
                            </p>
                            <p className="text-sm sm:text-base text-gray-500 font-normal">
                                Pengembangan platform ini didasarkan pada tingginya prevalensi jerawat di kalangan remaja maupun dewasa muda, yang sering kali terkendala oleh keterbatasan akses konsultasi klinis yang cepat. Platform ini hadir sebagai solusi pintar dalam mengenali karakteristik kulit Anda guna menentukan rekomendasi langkah awal yang tepat.
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
                        {...staggerContainer}
                    >
                        {/* Card 1 */}
                        <motion.div
                            className="group p-8 rounded-[24px] bg-gradient-to-br from-emerald-50/80 to-emerald-100/40 border border-emerald-100 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-200/30 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
                            {...scaleIn}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl group-hover:bg-emerald-300/30 transition-all duration-500" />
                            <div className="relative z-10">
                                <motion.div
                                    className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-300/50"
                                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FiMaximize className="w-6 h-6" />
                                </motion.div>
                                <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight group-hover:text-emerald-700 transition-colors">Analisis Presisi AI</h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                    Memanfaatkan kecerdasan buatan terintegrasi untuk mendeteksi kluster kondisi jerawat wajah Anda secara instan melalui unggahan foto ataupun input data manual.
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 2 */}
                        <motion.div
                            className="group p-8 rounded-[24px] bg-gradient-to-br from-white to-teal-50/30 border border-slate-200/60 shadow-md hover:border-teal-300 hover:shadow-2xl hover:shadow-teal-200/30 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
                            {...scaleIn}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200/20 rounded-full blur-2xl group-hover:bg-teal-300/30 transition-all duration-500" />
                            <div className="relative z-10">
                                <motion.div
                                    className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-400 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-300/50"
                                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FiClipboard className="w-6 h-6" />
                                </motion.div>
                                <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight group-hover:text-teal-700 transition-colors">Rekomendasi Personal</h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                    Hasil evaluasi disesuaikan secara khusus berdasarkan karakteristik tipe kulit, subtype kulit, rentang usia, hingga tingkat sensitivitas profil kulit.
                                </p>
                            </div>
                        </motion.div>

                        {/* Card 3*/}
                        <motion.div
                            className="group p-8 rounded-[24px] bg-gradient-to-br from-emerald-50/80 to-emerald-100/40 border border-emerald-100 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-200/30 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
                            {...scaleIn}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-2xl group-hover:bg-emerald-300/30 transition-all duration-500" />
                            <div className="relative z-10">
                                <motion.div
                                    className="w-12 h-12 bg-gradient-to-br from-emerald-800 to-emerald-700 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-900/30"
                                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FiBookOpen className="w-6 h-6" />
                                </motion.div>
                                <h3 className="text-xl font-black text-gray-900 mb-3 tracking-tight group-hover:text-emerald-800 transition-colors">Identifikasi Mandiri</h3>
                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                    Membantu mengedukasi Anda dalam mengenali perbedaan karakteristik gejala kulit secara mandiri, sehingga potensi salah penanganan masalah wajah dapat diminimalisir.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* section 3*/}
            <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute -right-20 -bottom-20 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[80px] pointer-events-none"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                <div className="absolute top-10 left-10 w-[200px] h-[200px] bg-amber-500/10 rounded-full blur-[60px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            className="space-y-4"
                            {...fadeInUp}
                        >
                            <motion.h2
                                className="text-emerald-400 font-bold tracking-widest uppercase text-xs sm:text-sm"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                Apa pentingnya mengenal masalah kulit?
                            </motion.h2>
                            <motion.h3
                                className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-white"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                Menangani Masalah Kulit <br className="hidden sm:inline" />Sebelum Terlambat
                            </motion.h3>
                            <motion.p
                                className="text-slate-400 text-base leading-relaxed font-normal pt-2"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                Kesulitan mengenali tipe jerawat sejak gejala awal muncul sering kali berujung pada pemilihan produk perawatan yang salah. Bukannya sembuh, kondisi <span className="text-emerald-300 font-medium underline underline-offset-4 decoration-emerald-500/30">skin barrier</span> justru berisiko mengalami inflamasi yang jauh lebih parah.
                            </motion.p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                            {...staggerContainer}
                        >
                            {/* card akses terbatas */}
                            <motion.div
                                className="group p-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700/40 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-500 hover:border-amber-500/50 hover:bg-slate-800/70 hover:shadow-xl hover:shadow-amber-500/10 relative overflow-hidden"
                                {...scaleIn}
                                whileHover={{ y: -5, scale: 1.02 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <motion.div
                                    className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center text-xl transition-all group-hover:bg-amber-500 group-hover:text-slate-900 shadow-lg relative z-10"
                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FiAlertCircle />
                                </motion.div>
                                <div className="space-y-2 relative z-10">
                                    <h4 className="text-base font-bold text-slate-100 group-hover:text-amber-200 transition-colors">Akses Terbatas</h4>
                                    <p className="text-sm text-slate-400 font-normal leading-relaxed">
                                        Layanan konsultasi dermatologi langsung sering kali membutuhkan waktu tunggu lama dan biaya yang tidak murah.
                                    </p>
                                </div>
                            </motion.div>

                            {/*card risiko */}
                            <motion.div
                                className="group p-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700/40 rounded-2xl flex flex-col justify-between space-y-6 transition-all duration-500 hover:border-rose-500/50 hover:bg-slate-800/70 hover:shadow-xl hover:shadow-rose-500/10 relative overflow-hidden"
                                {...scaleIn}
                                whileHover={{ y: -5, scale: 1.02 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <motion.div
                                    className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-xl flex items-center justify-center text-xl transition-all group-hover:bg-rose-500 group-hover:text-white shadow-lg relative z-10"
                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FiShield />
                                </motion.div>
                                <div className="space-y-2 relative z-10">
                                    <h4 className="text-base font-bold text-slate-100 group-hover:text-rose-200 transition-colors">Risiko Salah Rawat</h4>
                                    <p className="text-sm text-slate-400 font-normal leading-relaxed">
                                        Membeli skincare tanpa mengetahui kondisi klinis objektif wajah berpotensi memperburuk jerawat meradang Anda.
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/*section 4*/}
            <section className="py-24 bg-transparent relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100/30 rounded-full blur-[100px]" />

                <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
                    <motion.div
                        className="text-center max-w-3xl mx-auto mb-20"
                        {...fadeInUp}
                    >
                        <motion.h2
                            className="text-emerald-600 font-bold tracking-widest uppercase text-xs sm:text-sm"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Menggabungkan AI dan Data Profil
                        </motion.h2>
                        <motion.h3
                            className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            Penggabungan Dua Pendekatan Utama
                        </motion.h3>
                    </motion.div>

                    {/* pendekatan */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
                        {...staggerContainer}
                    >
                        {/* card pendekatan AI */}
                        <motion.div
                            className="group p-8 rounded-[24px] bg-gradient-to-br from-white to-blue-50/30 border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-blue-200/40 hover:border-blue-200 transition-all duration-500 flex flex-col sm:flex-row gap-6 items-start relative overflow-hidden"
                            {...scaleIn}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl group-hover:bg-blue-300/30 transition-all duration-500" />
                            <motion.div
                                className="p-3.5 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl text-xl flex-shrink-0 shadow-lg shadow-blue-300/50 relative z-10"
                                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <FiCpu />
                            </motion.div>
                            <div className="space-y-2 relative z-10">
                                <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Teknologi AI</h4>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                                    Model kecerdasan buatan mengevaluasi foto area wajah untuk mengklasifikasikan kluster jerawat (seperti komedo, papul, pustul, atau cyst) dengan tingkat akurasi tinggi.
                                </p>
                            </div>
                        </motion.div>

                        {/* card pendekatan data */}
                        <motion.div
                            className="group p-8 rounded-[24px] bg-gradient-to-br from-white to-purple-50/30 border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-purple-200/40 hover:border-purple-200 transition-all duration-500 flex flex-col sm:flex-row gap-6 items-start relative overflow-hidden"
                            {...scaleIn}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl group-hover:bg-purple-300/30 transition-all duration-500" />
                            <motion.div
                                className="p-3.5 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl text-xl flex-shrink-0 shadow-lg shadow-purple-300/50 relative z-10"
                                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <FiLayers />
                            </motion.div>
                            <div className="space-y-2 relative z-10">
                                <h4 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">Analisis Gejala Klinis</h4>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                                    Mengintegrasikan data profil kondisi kulit seperti rentang usia, tipe/subtype kulit, serta tingkat sensitivitas untuk meningkatkan prediksi rekomendasi.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* section 5 */}
            <section className="py-24 bg-transparent relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100/20 via-transparent to-emerald-100/20" />

                <motion.div
                    className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10"
                    {...fadeInUp}
                >
                    <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 text-white rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-xl shadow-rose-300/40 relative"
                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    >
                        <FiHeart />
                        <motion.div
                            className="absolute inset-0 rounded-2xl"
                            animate={{
                                boxShadow: [
                                    "0 0 20px rgba(244, 114, 182, 0.3)",
                                    "0 0 40px rgba(244, 114, 182, 0.5)",
                                    "0 0 20px rgba(244, 114, 182, 0.3)"
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>
                    <motion.p
                        className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        FaceHealth ID dikembangkan sebagai <span className="font-bold text-rose-600 bg-rose-100/50 px-2 py-0.5 rounded">painkiller</span> nyata yang berfokus pada langkah preventif, edukasi mandiri, serta perluasan aksesibilitas kesehatan kulit berbasis digital yang inklusif untuk siapa saja.
                    </motion.p>
                </motion.div>
            </section>

        </div>
    );
};

export default LandingPage;