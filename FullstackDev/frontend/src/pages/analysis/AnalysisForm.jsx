import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import guideImage from "../../assets/guideImage.jpg";
import {
    FiCheck,
    FiPlus,
    FiDroplet,
    FiSun,
    FiLayers,
    FiSmile,
    FiUser,
    FiEye,
    FiShield,
    FiAlertTriangle,
    FiActivity,
    FiBookOpen,
    FiCamera,
    FiAlertCircle
} from 'react-icons/fi';

const AnalysisForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        skinType: "",
        skinSubtype: "",
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
            submissionData.append("age_group", formData.age);
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

            const response = await axios.post("https://facehealth-backend.vercel.app/api/recommendations", submissionData, {
                headers: {
                    "Content-Type": "multipart/form-data",
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
        <div className="pt-28 pb-20 min-h-screen bg-slate-50 flex flex-col justify-center items-center animate-page">
            <div className="max-w-6xl w-full px-6 flex flex-col justify-between flex-grow lg:my-8">
                {/* Progres Bar */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                        Analisis Kondisi Kulit Anda
                    </h1>
                    <p className="mt-3 text-base md:text-lg text-gray-500 font-medium">
                        Langkah <span className="text-emerald-600 font-bold">{currentStep}</span> dari <span className="font-bold text-gray-700">3</span>: Analisis Kesehatan Kulit Wajah
                    </p>
                    <div className="w-full max-w-md bg-gray-200 h-2.5 rounded-full mx-auto mt-5 overflow-hidden shadow-inner">
                        <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-500 ease-out"
                            style={{ width: `${(currentStep / 3) * 100}%` }}
                        />
                    </div>                 </div>
                <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-200/60 p-8 md:p-12 border border-slate-100/80 flex-grow flex flex-col justify-between min-h-[500px]">
                    <form onSubmit={handleSubmit} className="space-y-10 h-full flex flex-col justify-between flex-grow">
                        {/*step 1*/}
                        {currentStep === 1 && (
                            <div className="space-y-10 animate-fadeIn flex-grow">
                                <div className="space-y-3">
                                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight leading-tight">
                                        Analisis masalah jerawat Anda dengan lebih akurat dengan teknologi AI
                                    </h2>
                                    <p className="text-slate-500 font-normal text-base leading-relaxed">
                                        Gunakan kamera perangkat Anda untuk memetakan kategori kondisi jerawat wajah secara otomatis.
                                    </p>
                                </div>
                                {inputMethod === "ai" ? (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                                            {/* Panduan */}
                                            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-sm">
                                                <div className="space-y-4">
                                                    <p className="font-bold text-lg text-slate-800 flex items-center gap-2">
                                                        <FiBookOpen className="text-emerald-500 text-xl" />
                                                        Panduan Penting Analisis AI:
                                                    </p>
                                                    <ul className="space-y-3 font-medium text-slate-600 text-base">
                                                        <li className="flex items-start gap-2 font-normal">
                                                            <span className="text-emerald-600 font-bold">1.</span> Pilihlah ruangan dengan pencahayaan yang terang atau alami.
                                                        </li>
                                                        <li className="flex items-start gap-2 font-normal">
                                                            <span className="text-emerald-600 font-bold">2.</span> Posisikan kamera tepat fokus tepat di area yang ingin dianalisis .
                                                        </li>
                                                        <li className="flex items-start gap-2 font-normal">
                                                            <span className="text-emerald-600 font-bold">3.</span> Pastikan kulit wajah bersih, terbebas dari sisa kosmetik tebal.
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="space-y-2">
                                                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Contoh Posisi Foto Yang Benar:</p>
                                                    <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-white">
                                                        <img
                                                            src={guideImage}
                                                            alt="Panduan Pengambilan Foto"
                                                            className="w-full h-full object-cover object-center"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Unggah Foto */}
                                            <div
                                                onClick={() => fileInputRef.current.click()}
                                                className="relative border-2 border-dashed border-emerald-300 rounded-3xl p-6 bg-emerald-50/5 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50/20 transition-all group min-h-[320px] flex-grow shadow-sm overflow-hidden"
                                            >
                                                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                                                {preview ? (
                                                    <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
                                                        <img
                                                            src={preview}
                                                            alt="Preview Ungguhan"
                                                            className="w-full h-full object-contain"
                                                        />
                                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900/80 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                                                            <FiCamera className="text-base" /> Klik untuk Mengganti Foto
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-6">
                                                        <div className="w-16 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform">
                                                            <FiPlus className="text-2xl" />
                                                        </div>
                                                        <p className="text-lg text-slate-800 font-bold">Klik untuk Mengunggah Foto Wajah</p>
                                                        <p className="text-sm text-slate-400 mt-1 font-normal">Format file: JPG, JPEG, atau PNG</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* Opsi Manual Method */}
                                        <div className="text-center pt-2">
                                            <button
                                                type="button"
                                                onClick={() => setInputMethod("manual")}
                                                className="text-sm font-semibold text-slate-400 hover:text-emerald-600 transition-colors underline underline-offset-4"
                                            >
                                                Kamera bermasalah? Klik di sini untuk mengisi kondisi secara manual
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* Manual Method */
                                    <div className="space-y-6 pt-4 border-t border-slate-100 animate-fadeIn">
                                        <div className="flex flex-col space-y-3">
                                            <label className="text-lg font-bold text-slate-700 ml-1">Pilih Kondisi Gejala Jerawat Terdekat</label>
                                            <div className="relative flex items-center">
                                                <select
                                                    name="detectedAcneType"
                                                    value={formData.detectedAcneType}
                                                    onChange={handleChange}
                                                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all bg-slate-50 text-base font-semibold text-slate-700 cursor-pointer shadow-sm appearance-none"
                                                >
                                                    <option value="">Pilih Kondisi Masalah Kulit</option>
                                                    <option value="Blackheads">Blackheads</option>
                                                    <option value="Whiteheads">Whiteheads </option>
                                                    <option value="Papules">Papules</option>
                                                    <option value="Pustules">Pustules</option>
                                                    <option value="Cyst">Cyst</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="text-center pt-2">
                                            <button
                                                type="button"
                                                onClick={() => { setInputMethod("ai"); setFormData({ ...formData, detectedAcneType: "" }); }}
                                                className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors underline underline-offset-4"
                                            >
                                                Kembali menggunakan analisis otomatis foto AI (Direkomendasikan)
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {/*step 2*/}
                        {currentStep === 2 && (
                            <div className="space-y-10 animate-fadeIn flex-grow">
                                {/* Tipe Kulit Utama */}
                                <div className="space-y-5">
                                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight leading-tight">
                                        Apa Tipe Kulit Utama Anda?                                     </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {[
                                            { id: "Oily", title: "Berminyak", icon: FiDroplet, desc: "Produksi minyak berlebih di seluruh wajah, pori-pori besar, mendesak jerawat." },
                                            { id: "Dry", title: "Kering", icon: FiSun, desc: "Kulit terasa kencang, kasar, tampak kusam, mudah mengelupas atau bersisik." },
                                            { id: "Combination", title: "Kombinasi", icon: FiLayers, desc: "Minyak berlebih di area T-Zone (dahi, hidung, dagu), namun pipi cenderung kering." },
                                            { id: "Normal", title: "Normal", icon: FiSmile, desc: "Kadar hidrasi minyak dan air seimbang, jarang memiliki masalah kulit ekstrem." }
                                        ].map((type) => {
                                            const isSelected = formData.skinType === type.id;
                                            const Icon = type.icon;
                                            return (
                                                <div
                                                    key={type.id}
                                                    onClick={() => handleCardSelect("skinType", type.id)}
                                                    className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 select-none active:scale-[0.99] hover:shadow-md cursor-pointer ${isSelected
                                                        ? "border-emerald-500 bg-emerald-50/40 ring-4 ring-emerald-500/10 shadow-sm"
                                                        : "border-slate-100 bg-white hover:border-slate-200"
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-2.5 rounded-xl ${isSelected ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-400 border border-slate-100"}`}>
                                                                <Icon className="text-lg" />
                                                            </div>
                                                            <span className="text-base font-semibold text-slate-800">{type.title}</span>
                                                        </div>
                                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? "border-emerald-500 bg-emerald-500" : "border-slate-200 bg-white"}`}>
                                                            {isSelected && <FiCheck className="text-[10px] text-white" />}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm leading-relaxed text-slate-500 font-normal">
                                                        {type.desc}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                {/* Subtype Kulit */}
                                <div className="space-y-5 pt-8 border-t border-slate-100">
                                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight leading-tight">
                                        Subtype kulit Anda?                                     </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {skinSubtypeOptions.map((option) => {
                                            const isSubtypeSelected = formData.skinSubtype === option.value;
                                            const SubIcon = option.icon || FiActivity;
                                            return (
                                                <div
                                                    key={option.value}
                                                    onClick={() => handleCardSelect("skinSubtype", option.value)}
                                                    className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 select-none active:scale-[0.99] hover:shadow-md cursor-pointer ${isSubtypeSelected
                                                        ? "border-emerald-500 bg-emerald-50/40 ring-4 ring-emerald-500/10 shadow-sm"
                                                        : "border-slate-100 bg-white hover:border-slate-200"
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-2.5 rounded-xl ${isSubtypeSelected ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-400 border border-slate-100"}`}>
                                                                <SubIcon className="text-base" />
                                                            </div>
                                                            <span className="text-base font-semibold text-slate-800">{option.title}</span>
                                                        </div>
                                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSubtypeSelected ? "border-emerald-500 bg-emerald-500" : "border-slate-200 bg-white"}`}>
                                                            {isSubtypeSelected && <FiCheck className="text-[10px] text-white" />}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm leading-relaxed text-slate-500 font-normal">
                                                        {option.desc}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* step 3*/}
                        {currentStep === 3 && (
                            <div className="space-y-10 animate-fadeIn flex-grow">
                                {/* Input Usia */}
                                <div className="space-y-5">
                                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight leading-tight">
                                        Berapa usia Anda saat ini?
                                    </h2>
                                    <div className="max-w-xs relative flex items-center group">
                                        <div className="absolute left-4 text-slate-400 transition-colors group-focus-within:text-emerald-500">
                                            <FiUser className="text-lg" />
                                        </div>
                                        <input
                                            type="number"
                                            min="1"
                                            max="120"
                                            placeholder="Contoh: 21"
                                            value={formData.ageRaw || ""}
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
                                            className="w-full pl-12 pr-20 py-3.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-lg font-semibold text-slate-700 bg-slate-50/50 shadow-inner"
                                        />
                                        <span className="absolute right-4 text-sm font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-lg">Tahun</span>
                                    </div>
                                    {formData.age && (
                                        <p className="text-sm font-medium text-emerald-600 mt-2 ml-1 animate-fadeIn flex items-center gap-1.5">
                                            <FiEye className="text-base" />
                                            Kategori Rentang Usia:
                                            <span className="font-semibold bg-emerald-50 border border-emerald-100/60 px-2.5 py-0.5 rounded-lg text-emerald-800">
                                                {formData.age === "14-18" && "Remaja"}
                                                {formData.age === "19-24" && "Dewasa Muda"}
                                                {formData.age === "25-36" && "Produktif"}
                                                {formData.age === "37-45" && "Matang"}
                                                {formData.age === "45+" && "Senior"}
                                            </span>
                                        </p>
                                    )}
                                </div>

                                {/* Tingkat Sensitivitas */}
                                <div className="space-y-5 pt-8 border-t border-slate-100">
                                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight leading-tight">
                                        Apakah kulit Anda mudah mengalami iritasi atau sensitif?
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        {[
                                            { id: "Not Sensitive", title: "Tidak Sensitif", icon: FiShield, desc: "Kulit cenderung kuat, tidak gampang memerah atau perih saat menggunakan kombinasi skincare baru." },
                                            { id: "Sensitive", title: "Sensitif", icon: FiAlertTriangle, desc: "Kulit mudah memerah, perih, gatal, atau terasa terbakar saat terkena bahan aktif atau sinar matahari.", type: "rose" }
                                        ].map((item) => {
                                            const isSelected = formData.sensitivity === item.id;
                                            const SensIcon = item.icon;
                                            return (
                                                <div
                                                    key={item.id}
                                                    onClick={() => handleCardSelect("sensitivity", item.id)}
                                                    className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-4 select-none active:scale-[0.99] hover:shadow-md cursor-pointer ${isSelected
                                                        ? item.type === "rose"
                                                            ? "border-rose-400 bg-rose-50/40 ring-4 ring-rose-500/5 shadow-sm"
                                                            : "border-emerald-500 bg-emerald-50/40 ring-4 ring-emerald-500/10 shadow-sm"
                                                        : "border-slate-100 bg-white hover:border-slate-200"
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-2.5 rounded-xl ${isSelected
                                                                ? item.type === "rose" ? "bg-rose-500 text-white shadow-md shadow-rose-100" : "bg-emerald-500 text-white shadow-md shadow-emerald-100"
                                                                : "bg-slate-50 text-slate-400 border border-slate-100"
                                                                }`}>
                                                                <SensIcon className="text-lg" />
                                                            </div>
                                                            <span className="text-base font-semibold text-slate-800">{item.title}</span>
                                                        </div>
                                                        <div className="flex items-center justify-center w-5 h-5 rounded-full border transition-all duration-300 bg-white border-slate-200">
                                                            {isSelected && <FiCheck className="text-[10px] text-white" />}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm leading-relaxed text-slate-500 font-normal">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* menampilkan error */}
                        {error && (
                            <div className="p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-800 text-sm rounded-r-xl font-medium shadow-sm transition-all animate-fadeIn flex items-center gap-2">
                                <FiAlertCircle className="text-base text-rose-500 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* tombol navigase */}
                        <div className="flex gap-4 pt-6 border-t border-slate-100 w-full mt-auto">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-8 py-3.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 hover:text-slate-800 transition-all text-sm active:scale-[0.97]"
                                >
                                    Kembali
                                </button>
                            )}
                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="flex-1 py-3.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all text-sm shadow-lg shadow-emerald-100 text-center active:scale-[0.98]"
                                >
                                    Lanjutkan Langkah
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${loading
                                        ? "bg-slate-300 cursor-not-allowed text-slate-500 shadow-none"
                                        : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100 active:scale-[0.98]"
                                        }`}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-4 w-4 border-b-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                                            Memproses Analisis Wajah...
                                        </span>
                                    ) : (
                                        "Selesai dan Mulai Analisis"
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                {/* Disclaimer */}
                <p className="mt-8 text-center text-xs text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
                    Disclaimer: Hasil analisis yang disediakan oleh sistem kecerdasan buatan FaceHealth ID ini bersifat sebagai edukasi dan skrining awal mandiri. Platform ini tidak menggantikan diagnosis medis resmi, konsultasi langsung, ataupun perawatan dari dokter spesialis kulit dan dermatolog profesional.
                </p>
            </div>
        </div>
    );
};

export default AnalysisForm;