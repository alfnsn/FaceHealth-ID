import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import guideImage from "../../assets/guideImage.jpg";
import {
    FiCheck,
    FiDroplet,
    FiSun,
    FiLayers,
    FiSmile,
    FiUser,
    FiEye,
    FiShield,
    FiAlertTriangle,
    FiBookOpen,
    FiCamera,
    FiAlertCircle,
} from 'react-icons/fi';
import { LuCat } from "react-icons/lu";
import { motion, AnimatePresence } from "motion/react";

const EnhancedAnalysisForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        skinType: "",
        skinSubtype: "",
        ageRaw: "",
        age: "",
        sensitivity: "",
        detectedAcneType: "",
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [inputMethod, setInputMethod] = useState("ai");
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentStep]);

    const skinSubtypeOptions = [
        { value: "Normal to Dry", title: "Normal to Dry", desc: "Kondisi kulit seimbang namun cenderung mengarah ke kering di beberapa area wajah." },
        { value: "Normal to Oily", title: "Normal to Oily", desc: "Kondisi kulit seimbang namun terkadang memproduksi minyak sedikit lebih banyak." },
        { value: "Dry to Normal", title: "Dry to Normal", desc: "Kulit yang dominan kering namun terkadang terasa normal di area tertentu." },
        { value: "Extreme Dry", title: "Extreme Dry", desc: "Kondisi kulit yang sangat kering parah, terasa kaku, gatal, hingga terjadi iritasi seperti mengelupas." },
        { value: "Oily to Normal", title: "Oily to Normal", desc: "Kulit yang dominan berminyak namun terkadang terasa seimbang atau normal." },
        { value: "T-Zone Oily Cheeks Dry", title: "T-Zone Oily Cheeks Dry", desc: "Kombinasi dengan dahi dan hidung berkilau minyak, sementara area pipi terasa sangat kering." },
        { value: "T-Zone Dry Cheeks Oily", title: "T-Zone Dry Cheeks Oily", desc: "Kombinasi terbalik dengan area T-Zone yang kering namun bagian pipi cenderung berminyak." },
        { value: "Extreme Oily", title: "Extreme Oily", desc: "Produksi minyak berlebih di seluruh bagian wajah seperti mengkilap akibat minyak sepanjang hari." }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleCardSelect = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value
        }));
        setError("");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedExtensions = ["image/jpeg", "image/jpg", "image/png"];

            if (!allowedExtensions.includes(file.type)) {
                setError("Format file tidak didukung. Silakan masukkan foto dengan format JPG, JPEG, atau PNG.");

                setImage(null);
                setPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
            }

            setImage(file);
            setPreview(URL.createObjectURL(file));
            setError("");
        }
    };

    const handleNextStep = () => {
        if (currentStep === 1) {
            if (inputMethod === "manual" && !formData.detectedAcneType) {
                setError("Silakan pilih kondisi masalah kulit Anda terlebih dahulu sebelum melanjutkan.");
                return;
            }
            if (inputMethod === "ai" && !image) {
                setError("Silakan unggah foto wajah Anda terlebih dahulu untuk dianalisis AI.");
                return;
            }
        } else if (currentStep === 2) {
            if (!formData.skinType || !formData.skinSubtype) {
                setError("Silakan lengkapi tipe dan subtype kulit Anda untuk melanjutkan.");
                return;
            }
        }
        setError("");
        setCurrentStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setError("");
            const prevStep = currentStep - 1;
            setCurrentStep(prevStep);
            if (prevStep === 1) {
                setFormData((prev) => ({
                    ...prev,
                    inputMethod: "ai"
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.age) {
            setError("Silakan input usia Anda saat ini.");
            return;
        }
        if (!formData.sensitivity) {
            setError("Silakan pilih tingkat sensitivitas kulit Anda (Tidak Sensitif / Sensitif).");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const submissionData = new FormData();
            submissionData.append("skin_type", formData.skinType);
            submissionData.append("skin_subtype", formData.skinSubtype);
            submissionData.append("ageRaw", formData.ageRaw)
            submissionData.append("sensitivity", formData.sensitivity);
            submissionData.append("inputMethod", inputMethod);

            if (inputMethod === "manual") {
                let targetInternalType = "Cyst";
                if (["Blackheads", "Whiteheads"].includes(formData.detectedAcneType)) {
                    targetInternalType = "Comedonal";
                } else if (["Papules", "Pustules"].includes(formData.detectedAcneType)) {
                    targetInternalType = "Inflammatory";
                }
                submissionData.append("manual_acne_type", targetInternalType);
            } else {
                submissionData.append("file", image);
            }

            const token = localStorage.getItem("token");

            const response = await axios.post("https://facehealth-backend.vercel.app/api/recommendations", submissionData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    ...(token && { "Authorization": `Bearer ${token}` })
                },
            });
            if (response.data.success) {
                navigate("/result", { state: { recommendation: response.data.data } });
            } else {
                setError(response.data.message || "Gagal memproses analisis rekomendasi.");
            }
        } catch (err) {
            console.error("Error Submit Error:", err);
            setError(err.response?.data?.message || "Gagal menghubungi server. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pt-28 pb-20 min-h-screen relative overflow-hidden flex flex-col justify-center items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50" />
            <motion.div
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-300/20 to-transparent rounded-full blur-3xl"
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-teal-300/20 to-transparent rounded-full blur-3xl"
                animate={{
                    x: [0, -30, 0],
                    y: [0, -50, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-6xl w-full px-6 flex flex-col justify-between flex-grow lg:my-8 relative z-10">
                {/* Progress bar */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="inline-flex items-center gap-2 mb-4 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full border border-emerald-200/50 shadow-lg"
                    >
                        <motion.div
                        >
                            <LuCat className="text-emerald-500" />
                        </motion.div>
                        <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Data Profil
                        </span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent tracking-tight mb-3">
                        Analisis Kondisi Kulit Anda
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 font-medium">
                        Langkah <span className="text-emerald-600 font-bold text-xl">{currentStep}</span> dari <span className="font-bold text-gray-700">3</span>
                    </p>

                    <div className="flex items-center justify-center gap-3 max-w-md mx-auto mt-8">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className="flex items-center gap-3">
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{
                                        scale: currentStep >= step ? 1.1 : 1,
                                    }}
                                    className="relative flex items-center justify-center w-12 h-12 rounded-2xl font-bold text-sm shadow-lg"
                                    style={{
                                        background: currentStep >= step
                                            ? 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)'
                                            : '#f3f4f6',
                                        color: currentStep >= step ? 'white' : '#9ca3af'
                                    }}
                                >
                                    {currentStep > step ? (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 500 }}
                                        >
                                            <FiCheck className="text-lg" />
                                        </motion.div>
                                    ) : (
                                        step
                                    )}
                                    {currentStep === step && (
                                        <>
                                            <motion.div
                                                className="absolute inset-0 rounded-2xl bg-emerald-400"
                                                initial={{ scale: 1, opacity: 0.5 }}
                                                animate={{ scale: 1.5, opacity: 0 }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            />
                                            <motion.div
                                                className="absolute inset-0 rounded-2xl bg-teal-400"
                                                initial={{ scale: 1, opacity: 0.5 }}
                                                animate={{ scale: 1.8, opacity: 0 }}
                                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                                            />
                                        </>
                                    )}
                                </motion.div>
                                {step < 3 && (
                                    <div className="h-1.5 w-20 rounded-full bg-gray-200 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
                                            initial={{ width: '0%' }}
                                            animate={{ width: currentStep > step ? '100%' : '0%' }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* main form container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/90 backdrop-blur-xl rounded-[32px] shadow-2xl shadow-emerald-200/30 p-8 md:p-12 border border-emerald-100/50 flex-grow flex flex-col justify-between min-h-[500px] relative overflow-hidden"
                >
                    <motion.div
                        className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full blur-3xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-teal-200/20 to-transparent rounded-full blur-3xl"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.4, 0.3] }}
                        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                    />

                    <form onSubmit={handleSubmit} className="space-y-10 h-full flex flex-col justify-between flex-grow relative z-10">
                        <AnimatePresence mode="wait">
                            {/* step 1*/}
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-10 flex-grow"
                                >
                                    <div className="space-y-3">
                                        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight leading-tight">
                                            Analisis masalah jerawat Anda dengan teknologi AI
                                        </h2>
                                        <p className="text-slate-600 font-normal text-base leading-relaxed">
                                            Gunakan kamera perangkat Anda untuk memetakan kategori kondisi jerawat wajah secara otomatis.
                                        </p>
                                    </div>

                                    {inputMethod === "ai" ? (
                                        <div className="space-y-8">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                                                {/* Guide Card */}
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 }}
                                                    className="bg-gradient-to-br from-slate-50 to-emerald-50/30 border border-emerald-200/50 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-lg"
                                                >
                                                    <div className="space-y-4">
                                                        <p className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                                            <div className="p-2 bg-emerald-500 text-white rounded-xl">
                                                                <FiBookOpen className="text-lg" />
                                                            </div>
                                                            Panduan Penting Analisis AI
                                                        </p>
                                                        <ul className="space-y-3 text-slate-600 text-base">
                                                            {[
                                                                "Pilihlah ruangan dengan pencahayaan yang terang atau alami.",
                                                                "Posisikan kamera tepat fokus di area yang ingin dianalisis.",
                                                                "Pastikan kulit wajah bersih, terbebas dari sisa kosmetik tebal."
                                                            ].map((text, i) => (
                                                                <motion.li
                                                                    key={i}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: 0.2 + i * 0.1 }}
                                                                    className="flex items-start gap-3 font-normal"
                                                                >
                                                                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                                                                        {i + 1}
                                                                    </span>
                                                                    {text}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                                                            Contoh Posisi Foto Yang Benar:
                                                        </p>
                                                        <div className="w-full h-48 rounded-2xl overflow-hidden border-2 border-emerald-200 shadow-lg bg-white">
                                                            <img
                                                                src={guideImage}
                                                                alt="Panduan Pengambilan Foto"
                                                                className="w-full h-full object-cover object-center"
                                                            />
                                                        </div>
                                                    </div>
                                                </motion.div>

                                                {/* iamge upload */}
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => fileInputRef.current.click()}
                                                    className="relative border-2 border-dashed border-emerald-400 rounded-3xl p-6 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/20 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:shadow-2xl transition-all group min-h-[320px] flex-grow overflow-hidden"
                                                >
                                                    <motion.div
                                                        className="absolute inset-0"
                                                        animate={{
                                                            background: [
                                                                'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
                                                                'radial-gradient(circle at 80% 50%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)',
                                                                'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)'
                                                            ]
                                                        }}
                                                        transition={{ duration: 5, repeat: Infinity }}
                                                    />

                                                    <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept=".jpg, .jpeg, .png" />

                                                    {preview ? (
                                                        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
                                                            <img
                                                                src={preview}
                                                                alt="Preview Unggahan"
                                                                className="w-full h-full object-contain"
                                                            />
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 0, y: 10 }}
                                                                whileHover={{ opacity: 1, y: 0 }}
                                                                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-3 rounded-full text-sm font-semibold shadow-xl flex items-center gap-2"
                                                            >
                                                                <FiCamera className="text-base" />
                                                                Klik untuk Mengganti Foto
                                                            </motion.div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center py-6 relative z-10">
                                                            <motion.div
                                                                animate={{ y: [0, -12, 0] }}
                                                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                                                className="relative inline-block"
                                                            >
                                                                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-emerald-300/50 group-hover:shadow-emerald-400/70 transition-shadow">
                                                                    <FiCamera className="text-4xl" />
                                                                </div>
                                                            </motion.div>
                                                            <p className="text-xl text-slate-800 font-bold mb-2">
                                                                Klik untuk Mengunggah Foto Wajah
                                                            </p>
                                                            <p className="text-sm text-slate-500 font-normal mb-4">
                                                                Format file: JPG, JPEG, atau PNG
                                                            </p>
                                                            <motion.div
                                                                animate={{ scale: [1, 1.05, 1] }}
                                                                transition={{ duration: 2, repeat: Infinity }}
                                                                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-semibold text-emerald-600 shadow-md border border-emerald-200"
                                                            >
                                                                Analisis Tipe Jerawat Otomatis dengan Teknologi AI
                                                            </motion.div>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            </div>

                                            <div className="text-center pt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setInputMethod("manual")}
                                                    className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors underline underline-offset-4 hover:underline-offset-8"
                                                >
                                                    Kamera bermasalah? Klik di sini untuk mengisi kondisi secara manual
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        /* manual option input */
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="space-y-6 pt-4 border-t border-slate-200"
                                        >
                                            <div className="flex flex-col space-y-3">
                                                <label className="text-lg font-bold text-slate-700 ml-1">
                                                    Pilih Kondisi Gejala Jerawat Terdekat
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        name="detectedAcneType"
                                                        value={formData.detectedAcneType}
                                                        onChange={handleChange}
                                                        className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-slate-50 text-base font-semibold text-slate-700 cursor-pointer shadow-sm appearance-none"
                                                    >
                                                        <option value="">Pilih Kondisi Masalah Kulit</option>
                                                        <option value="Blackheads">Blackheads</option>
                                                        <option value="Whiteheads">Whiteheads</option>
                                                        <option value="Papules">Papules </option>
                                                        <option value="Pustules">Pustules</option>
                                                        <option value="Cyst">Cyst </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="text-center pt-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setInputMethod("ai");
                                                        setFormData({ ...formData, detectedAcneType: "" });
                                                    }}
                                                    className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors underline underline-offset-4"
                                                >
                                                    Kembali menggunakan analisis otomatis foto AI (Direkomendasikan)
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}

                            {/*step 2 tipe kulit */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-10 flex-grow"
                                >
                                    <div className="space-y-5">
                                        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight leading-tight">
                                            Apa Tipe Kulit Utama Anda?
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {[
                                                { id: "Oily", title: "Berminyak", icon: FiDroplet, desc: "Produksi minyak berlebih di seluruh wajah, pori-pori besar, rentan jerawat." },
                                                { id: "Dry", title: "Kering", icon: FiSun, desc: "Kulit terasa kencang, kasar, tampak kusam, mudah mengelupas atau bersisik." },
                                                { id: "Combination", title: "Kombinasi", icon: FiLayers, desc: "Minyak berlebih di area T-Zone, namun pipi cenderung kering." },
                                                { id: "Normal", title: "Normal", icon: FiSmile, desc: "Kadar hidrasi minyak dan air seimbang, jarang memiliki masalah kulit ekstrem." }
                                            ].map((type, index) => {
                                                const isSelected = formData.skinType === type.id;
                                                const Icon = type.icon;
                                                return (
                                                    <motion.div
                                                        key={type.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        whileHover={{ scale: 1.03 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleCardSelect("skinType", type.id)}
                                                        className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between space-y-4 cursor-pointer relative overflow-hidden ${isSelected
                                                            ? "border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-xl shadow-emerald-200/50"
                                                            : "border-slate-200 bg-white hover:border-emerald-200 hover:shadow-lg"
                                                            }`}
                                                    >
                                                        {isSelected && (
                                                            <motion.div
                                                                layoutId="selectedCard"
                                                                className="absolute inset-0 bg-gradient-to-br from-emerald-100/30 to-teal-100/30"
                                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                            />
                                                        )}
                                                        <div className="flex justify-between items-center relative z-10">
                                                            <div className="flex items-center gap-3">
                                                                <motion.div
                                                                    animate={isSelected ? { rotate: [0, 10, -10, 0] } : {}}
                                                                    transition={{ duration: 0.5 }}
                                                                    className={`p-3 rounded-xl shadow-md ${isSelected
                                                                        ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white"
                                                                        : "bg-slate-100 text-slate-500"
                                                                        }`}
                                                                >
                                                                    <Icon className="text-xl" />
                                                                </motion.div>
                                                                <span className="text-lg font-bold text-slate-800">{type.title}</span>
                                                            </div>
                                                            <motion.div
                                                                animate={{ scale: isSelected ? [1, 1.2, 1] : 1 }}
                                                                transition={{ duration: 0.3 }}
                                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected
                                                                    ? "border-emerald-500 bg-emerald-500"
                                                                    : "border-slate-300 bg-white"
                                                                    }`}
                                                            >
                                                                {isSelected && <FiCheck className="text-xs text-white" />}
                                                            </motion.div>
                                                        </div>
                                                        <p className="text-sm leading-relaxed text-slate-600 font-normal relative z-10">
                                                            {type.desc}
                                                        </p>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* subtype */}
                                    <div className="space-y-5 pt-8 border-t border-slate-200">
                                        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight leading-tight">
                                            Subtype kulit Anda?
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {skinSubtypeOptions.map((option, index) => {
                                                const isSubtypeSelected = formData.skinSubtype === option.value;
                                                return (
                                                    <motion.div
                                                        key={option.value}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        whileHover={{ scale: 1.03 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleCardSelect("skinSubtype", option.value)}
                                                        className={`p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col space-y-3 cursor-pointer ${isSubtypeSelected
                                                            ? "border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg"
                                                            : "border-slate-200 bg-white hover:border-emerald-200 hover:shadow-md"
                                                            }`}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <span className="text-base font-bold text-slate-800">{option.title}</span>
                                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSubtypeSelected
                                                                ? "border-emerald-500 bg-emerald-500"
                                                                : "border-slate-300 bg-white"
                                                                }`}>
                                                                {isSubtypeSelected && <FiCheck className="text-[10px] text-white" />}
                                                            </div>
                                                        </div>
                                                        <p className="text-sm leading-relaxed text-slate-600 font-normal">
                                                            {option.desc}
                                                        </p>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/*step 3 */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-10 flex-grow"
                                >
                                    {/* age */}
                                    <div className="space-y-5">
                                        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight leading-tight">
                                            Berapa usia Anda saat ini?
                                        </h2>
                                        <div className="max-w-sm">
                                            <div className="relative group">
                                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors z-10">
                                                    <FiUser className="text-xl" />
                                                </div>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="120"
                                                    placeholder="Contoh: 21"
                                                    value={formData.ageRaw}
                                                    onChange={(e) => {
                                                        const inputAge = parseInt(e.target.value, 10);
                                                        let targetGroup = "";
                                                        if (inputAge >= 14 && inputAge <= 18) targetGroup = "14-18";
                                                        else if (inputAge >= 19 && inputAge <= 24) targetGroup = "19-24";
                                                        else if (inputAge >= 25 && inputAge <= 36) targetGroup = "25-36";
                                                        else if (inputAge >= 37 && inputAge <= 45) targetGroup = "37-45";
                                                        else if (inputAge > 45) targetGroup = "45+";

                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            ageRaw: e.target.value,
                                                            age: targetGroup
                                                        }));
                                                        setError("");
                                                    }}
                                                    className="w-full pl-14 pr-24 py-4 rounded-xl border-2 border-slate-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-lg font-semibold text-slate-700 bg-slate-50/50 shadow-sm"
                                                />
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500 bg-slate-200 px-3 py-1.5 rounded-lg">
                                                    Tahun
                                                </span>
                                            </div>
                                            {formData.age && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-sm font-medium text-emerald-600 mt-3 ml-1 flex items-center gap-2"
                                                >
                                                    <FiEye className="text-base" />
                                                    Kategori Rentang Usia:
                                                    <span className="font-bold bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-lg text-emerald-700">
                                                        {formData.age === "14-18" && "Remaja"}
                                                        {formData.age === "19-24" && "Dewasa Muda"}
                                                        {formData.age === "25-36" && "Produktif"}
                                                        {formData.age === "37-45" && "Matang"}
                                                        {formData.age === "45+" && "Senior"}
                                                    </span>
                                                </motion.p>
                                            )}
                                        </div>
                                    </div>

                                    {/* sensitivity  */}
                                    <div className="space-y-5 pt-8 border-t border-slate-200">
                                        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight leading-tight">
                                            Apakah kulit Anda mudah mengalami iritasi atau sensitif?
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {[
                                                { id: "Not Sensitive", title: "Tidak Sensitif", icon: FiShield, desc: "Kulit cenderung kuat, tidak gampang memerah atau perih saat menggunakan kombinasi skincare baru.", color: "emerald" },
                                                { id: "Sensitive", title: "Sensitif", icon: FiAlertTriangle, desc: "Kulit mudah memerah, perih, gatal, atau terasa terbakar saat terkena bahan aktif atau sinar matahari.", color: "rose" }
                                            ].map((item, index) => {
                                                const isSelected = formData.sensitivity === item.id;
                                                const SensIcon = item.icon;
                                                return (
                                                    <motion.div
                                                        key={item.id}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        whileHover={{ scale: 1.03 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleCardSelect("sensitivity", item.id)}
                                                        className={`p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col space-y-4 cursor-pointer relative overflow-hidden ${isSelected
                                                            ? item.color === "rose"
                                                                ? "border-rose-400 bg-gradient-to-br from-rose-50 to-pink-50 shadow-xl shadow-rose-200/50"
                                                                : "border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-xl shadow-emerald-200/50"
                                                            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg"
                                                            }`}
                                                    >
                                                        <div className="flex justify-between items-center relative z-10">
                                                            <div className="flex items-center gap-3">
                                                                <motion.div
                                                                    animate={isSelected ? { rotate: [0, 10, -10, 0] } : {}}
                                                                    transition={{ duration: 0.5 }}
                                                                    className={`p-3 rounded-xl shadow-md ${isSelected
                                                                        ? item.color === "rose"
                                                                            ? "bg-gradient-to-br from-rose-500 to-pink-500 text-white"
                                                                            : "bg-gradient-to-br from-emerald-500 to-teal-500 text-white"
                                                                        : "bg-slate-100 text-slate-500"
                                                                        }`}
                                                                >
                                                                    <SensIcon className="text-xl" />
                                                                </motion.div>
                                                                <span className="text-lg font-bold text-slate-800">{item.title}</span>
                                                            </div>
                                                            <motion.div
                                                                animate={{ scale: isSelected ? [1, 1.2, 1] : 1 }}
                                                                transition={{ duration: 0.3 }}
                                                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected
                                                                    ? item.color === "rose"
                                                                        ? "border-rose-500 bg-rose-500"
                                                                        : "border-emerald-500 bg-emerald-500"
                                                                    : "border-slate-300 bg-white"
                                                                    }`}
                                                            >
                                                                {isSelected && <FiCheck className="text-xs text-white" />}
                                                            </motion.div>
                                                        </div>
                                                        <p className="text-sm leading-relaxed text-slate-600 font-normal relative z-10">
                                                            {item.desc}
                                                        </p>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* error animasi */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: -10, height: 0 }}
                                    className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 border-l-4 border-rose-500 text-rose-800 text-sm rounded-r-xl font-medium shadow-lg flex items-center gap-3"
                                >
                                    <FiAlertCircle className="text-lg text-rose-500 flex-shrink-0" />
                                    <span>{error}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* tombol navigasi */}
                        <div className="flex gap-4 pt-6 border-t border-slate-200 w-full mt-auto">
                            {currentStep > 1 && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={handleBack}
                                    className="px-8 py-4 border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all text-sm shadow-md"
                                >
                                    Kembali
                                </motion.button>
                            )}
                            {currentStep < 3 ? (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="button"
                                    onClick={handleNextStep}
                                    className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all text-sm shadow-xl shadow-emerald-200 text-center"
                                >
                                    Lanjutkan Langkah →
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: loading ? 1 : 1.02 }}
                                    whileTap={{ scale: loading ? 1 : 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className={`flex-1 py-4 rounded-xl font-bold text-sm transition-all shadow-xl ${loading
                                        ? "bg-slate-300 cursor-not-allowed text-slate-500 shadow-none"
                                        : "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-emerald-200"
                                        }`}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-3 border-white border-t-transparent rounded-full"
                                            />
                                            Memproses Analisis Wajah...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Selesai dan Mulai Analisis
                                        </span>
                                    )}
                                </motion.button>
                            )}
                        </div>
                    </form>
                </motion.div>

                {/* footnote */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center text-xs text-slate-500 max-w-3xl mx-auto leading-relaxed font-normal"
                >
                    <strong>Disclaimer:</strong> Hasil analisis yang disediakan oleh sistem kecerdasan buatan FaceHealth ID ini bersifat sebagai edukasi dan skrining awal mandiri. Platform ini tidak menggantikan diagnosis medis resmi, konsultasi langsung, ataupun perawatan dari dokter spesialis kulit dan dermatolog profesional.
                </motion.p>
            </div>
        </div>
    );
};

export default EnhancedAnalysisForm;