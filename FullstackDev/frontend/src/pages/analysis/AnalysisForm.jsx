import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import guideImage from "../../assets/guideImage.jpg";
import { FiPlus, FiCheck } from "react-icons/fi";


const AnalysisForm = () => {
        const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        skinType: "",
        skinSubtype: "",
        age: "",
        sensitivity: "Not Sensitive",
        detectedAcneType: "",
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [inputMethod, setInputMethod] = useState("ai");

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

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
            setError("")
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
            setError("Silakan pilih rentang usia Anda.");
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

            // input manual 
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

            // mengirim ke backend 
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
                {/* progres bar */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Analisis Kondisi Kulit Anda
                    </h1>
                    <p className="mt-3 text-lg text-gray-500 font-medium">
                        Langkah <span className="text-emerald-600 font-bold">{currentStep}</span> dari <span className="font-bold">3</span>: Analisis Kesehatan Kulit Wajah
                    </p>

                    <div className="w-full max-w-md bg-gray-200 h-3 rounded-full mx-auto mt-6 overflow-hidden shadow-inner">
                        <div
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-500 ease-out"
                            style={{ width: `${(currentStep / 3) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-200/80 p-8 md:p-16 border border-slate-100/80 flex-grow flex flex-col justify-between min-h-[500px]">
                    <form onSubmit={handleSubmit} className="space-y-10 h-full flex flex-col justify-between flex-grow">

                        {/* Step 1 */}
                        {currentStep === 1 && (
                            <div className="space-y-12 animate-fadeIn flex-grow">

                                <div className="space-y-2">
                                    <h2 className="text-2xl md:text-3xl font-black text-gray-800 leading-tight">
                                        Analisis masalah jerawat Anda dengan lebih akurat dengan teknologi AI
                                    </h2>
                                    <p className="text-gray-500 font-medium text-base">
                                        Gunakan kamera perangkat Anda untuk memetakan kategori kondisi jerawat wajah secara otomatis.
                                    </p>
                                </div>

                                {inputMethod === "ai" ? (
                                    <div className="space-y-8">
                                        {/* panduan  */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

                                            {/* panduan*/}
                                            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-sm">
                                                <div className="space-y-4">
                                                    <p className="font-extrabold text-lg text-slate-800">
                                                        Panduan Penting Analisis Menggunakan Teknologi AI:
                                                    </p>
                                                    <ul className="space-y-3 font-medium text-gray-600 text-sm">
                                                        <li className="flex items-start gap-2">
                                                            <span className="text-emerald-600 font-bold">1.</span> Pilihlah ruangan yang tidak terlalu gelap atau dengan pencahayaan alami.
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <span className="text-emerald-600 font-bold">2.</span> Posisikan kamera tegak lurus fokus tepat di area yang ingin dianalisis (jarak sekitar 30 cm).
                                                        </li>
                                                        <li className="flex items-start gap-2">
                                                            <span className="text-emerald-600 font-bold">3.</span> Pastikan kulit bersih terbebas dari sisa kosmetik tebal maupun efek filter kamera.
                                                        </li>
                                                    </ul>
                                                </div>

                                                {/* panduan gambar*/}
                                                <div className="space-y-2">
                                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contoh Posisi Foto Yang Benar:</p>
                                                    <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-white flex items-center justify-center">   <img
                                                            src={guideImage}
                                                            alt="Panduan Pengambilan Foto"
                                                            className="w-full h-full object-cover object-center"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* unggah foto*/}
                                            <div
                                                onClick={() => fileInputRef.current.click()}
                                                className="relative border-4 border-dashed border-emerald-300 rounded-3xl p-6 bg-emerald-50/10 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50/40 transition-all group min-h-[320px] flex-grow shadow-sm overflow-hidden"
                                            >
                                                <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
                                                {preview ? (
                                                    <div className="absolute inset-0 w-full h-full bg-black">
                                                        <img
                                                            src={preview}
                                                            alt="Preview Ungguhan"
                                                            className="w-full h-full object-contain"
                                                        />
                                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                                            Klik untuk Mengganti Foto
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-6">
                                                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform">
                                                            <FiPlus />
                                                        </div>
                                                        <p className="text-lg text-emerald-950 font-black">Klik untuk  Mengunggah Foto</p>
                                                        <p className="text-xs text-gray-400 mt-1.5 font-semibold">Format file: JPG, JPEG, atau PNG</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* opsi manual mthod */}
                                        <div className="text-center pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setInputMethod("manual")}
                                                className="text-sm font-bold text-gray-400 hover:text-emerald-600 transition-colors underline underline-offset-4"
                                            >
                                                Kamera bermasalah? Klik di sini untuk menginput data kondisi secara manual
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    // manual method
                                    <div className="space-y-6 pt-4 border-t border-slate-100 animate-fadeIn">
                                        <div className="flex flex-col space-y-4">
                                            <label className="text-lg font-bold text-gray-700 ml-1">Pilih Kondisi Gejala Jerawat Terdekat</label>
                                            <select
                                                name="detectedAcneType"
                                                value={formData.detectedAcneType}
                                                onChange={handleChange}
                                                className="w-full px-6 py-5 rounded-2xl border-2 border-gray-100 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-slate-50 text-xl font-bold text-gray-700 cursor-pointer shadow-sm appearance-none"
                                            >
                                                <option value="">Pilih Kondisi Masalah Kulit</option>
                                                <option value="Blackheads">Blackheads</option>
                                                <option value="Whiteheads">Whiteheads</option>
                                                <option value="Papules">Papules</option>
                                                <option value="Pustules">Pustules</option>
                                                <option value="Cyst">Cyst</option>
                                            </select>
                                        </div>

                                        <div className="text-center pt-2">
                                            <button
                                                type="button"
                                                onClick={() => { setInputMethod("ai"); setFormData({ ...formData, detectedAcneType: "" }); }}
                                                className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors underline underline-offset-4"
                                            >
                                                Kembali menggunakan analisis otomatis foto AI (Direkomendasikan)
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/*step 2 */}
                        {currentStep === 2 && (
                            <div className="space-y-12 animate-fadeIn flex-grow">
                                {/* Tipe Kulit Utama */}
                                <div className="space-y-5">
                                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                                        Apa Tipe Kulit Utama Anda?
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                        {/* card Berminyak */}
                                        <div
                                            onClick={() => handleCardSelect("skinType", "Oily")}
                                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 select-none active:scale-[0.99] shadow-sm hover:shadow-md ${formData.skinType === "Oily"
                                                ? "border-blue-500 bg-blue-200 text-gray-900 ring-4 ring-blue-500/20"
                                                : "border-blue-200/70 bg-blue-50 text-gray-900 hover:border-blue-300 hover:bg-blue-100/50"
                                                }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-xl font-black text-gray-900">
                                                    Berminyak
                                                </span>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.skinType === "Oily" ? "border-blue-600 bg-blue-600" : "border-blue-300 bg-white"}`}>
                                                    {formData.skinType === "Oily" && <FiCheck className="text-xs text-white" />}
                                                </div>
                                            </div>
                                            <p className="text-sm leading-relaxed font-bold text-gray-700">
                                                Produksi minyak berlebih, pori-pori tampak besar, dan rentan berjerawat.
                                            </p>
                                        </div>

                                        {/* card Kering */}
                                        <div
                                            onClick={() => handleCardSelect("skinType", "Dry")}
                                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 select-none active:scale-[0.99] shadow-sm hover:shadow-md ${formData.skinType === "Dry"
                                                ? "border-blue-500 bg-blue-200 text-gray-900 ring-4 ring-blue-500/20"
                                                : "border-blue-200/70 bg-blue-50 text-gray-900 hover:border-blue-300 hover:bg-blue-100/50"
                                                }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-xl font-black text-gray-900">
                                                    Kering
                                                </span>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.skinType === "Dry" ? "border-blue-600 bg-blue-600" : "border-blue-300 bg-white"}`}>
                                                    {formData.skinType === "Dry" && <FiCheck className="text-xs text-white" />}
                                                </div>
                                            </div>
                                            <p className="text-sm leading-relaxed font-bold text-gray-700">
                                                Kulit terasa kencang, kasar, tampak kusam, dan terkadang mudah mengelupas atau bersisik.
                                            </p>
                                        </div>

                                        {/* card Kombinasi */}
                                        <div
                                            onClick={() => handleCardSelect("skinType", "Combination")}
                                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 select-none active:scale-[0.99] shadow-sm hover:shadow-md ${formData.skinType === "Combination"
                                                ? "border-blue-500 bg-blue-200 text-gray-900 ring-4 ring-blue-500/20"
                                                : "border-blue-200/70 bg-blue-50 text-gray-900 hover:border-blue-300 hover:bg-blue-100/50"
                                                }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-xl font-black text-gray-900">
                                                    Kombinasi
                                                </span>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.skinType === "Combination" ? "border-blue-600 bg-blue-600" : "border-blue-300 bg-white"}`}>
                                                    {formData.skinType === "Combination" && <FiCheck className="text-xs text-white" />}
                                                </div>
                                            </div>
                                            <p className="text-sm leading-relaxed font-bold text-gray-700">
                                                Area T-Zone (dahi, hidung, dagu) berminyak, namun area pipi cenderung kering atau normal.
                                            </p>
                                        </div>

                                        {/* card Normal */}
                                        <div
                                            onClick={() => handleCardSelect("skinType", "Normal")}
                                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 select-none active:scale-[0.99] shadow-sm hover:shadow-md ${formData.skinType === "Normal"
                                                ? "border-blue-500 bg-blue-200 text-gray-900 ring-4 ring-blue-500/20"
                                                : "border-blue-200/70 bg-blue-50 text-gray-900 hover:border-blue-300 hover:bg-blue-100/50"
                                                }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-xl font-black text-gray-900">
                                                    Normal
                                                </span>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.skinType === "Normal" ? "border-blue-600 bg-blue-600" : "border-blue-300 bg-white"}`}>
                                                    {formData.skinType === "Normal" && <FiCheck className="text-xs text-white" />}
                                                </div>
                                            </div>
                                            <p className="text-sm leading-relaxed font-bold text-gray-700">
                                                Kadar minyak dan air seimbang, jarang mengalami masalah, tidak terlalu berminyak maupun kering.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/*Subtype*/}
                                <div className="space-y-5 pt-8 border-t border-slate-100">
                                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                                        Subtype kulit Anda?
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {skinSubtypeOptions.map((option) => {
                                            const isSubtypeSelected = formData.skinSubtype === option.value;
                                            return (
                                                <div
                                                    key={option.value}
                                                    onClick={() => handleCardSelect("skinSubtype", option.value)}
                                                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 select-none active:scale-[0.99] shadow-sm ${isSubtypeSelected
                                                        ? "border-emerald-600 bg-emerald-200 text-gray-900 ring-4 ring-emerald-500/20"
                                                        : "border-teal-100 bg-teal-50 text-gray-900 hover:border-teal-300 hover:bg-teal-100/60"
                                                        }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-base font-black text-gray-900">
                                                            {option.title}
                                                        </span>
                                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSubtypeSelected ? "border-emerald-600 bg-emerald-600" : "border-teal-300 bg-white"}`}>
                                                            {isSubtypeSelected && <FiCheck className="text-[10px] text-white" />}
                                                        </div>
                                                    </div>
                                                    <p className="text-xs leading-relaxed font-bold text-gray-700">
                                                        {option.desc}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                            </div>
                        )}

                        {/* Step 3*/}
                        {currentStep === 3 && (
                            <div className="space-y-12 animate-fadeIn flex-grow">

                                <div className="space-y-5">
                                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                                        3. Berapa usia Anda saat ini?
                                    </h2>

                                    <div className="max-w-xs">
                                        <div className="relative flex items-center">
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
                                                className="w-full px-6 py-4 rounded-2xl border-2 border-blue-200 bg-blue-50/30 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-xl font-black text-gray-800 shadow-inner"
                                            />
                                            <span className="absolute right-6 text-gray-400 font-bold text-lg">Tahun</span>
                                        </div>

                                        {formData.age && (
                                            <p className="text-xs font-bold text-blue-600 mt-2.5 ml-1 animate-fadeIn">
                                                Kategori Rentang Usia: <span className="underline underline-offset-2 bg-blue-100/60 px-2 py-0.5 rounded-md">
                                                    {formData.age === "14-18" && "Remaja"}
                                                    {formData.age === "19-24" && "Dewasa Muda"}
                                                    {formData.age === "25-36" && "Produktif"}
                                                    {formData.age === "37-45" && "Matang"}
                                                    {formData.age === "45+" && "Senior)"}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Tingkat Sensitivitas*/}
                                <div className="space-y-5 pt-8 border-t border-slate-100">
                                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                                        Apakah kulit Anda mudah mengalami iritasi atau sensitif?
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                        {/* not sensitive card */}
                                        <div
                                            onClick={() => handleCardSelect("sensitivity", "Not Sensitive")}
                                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-2 select-none active:scale-[0.99] shadow-sm hover:shadow-md ${formData.sensitivity === "Not Sensitive"
                                                ? "border-emerald-500 bg-emerald-200 text-gray-900 ring-4 ring-emerald-500/20"
                                                : "border-emerald-100 bg-emerald-50 text-gray-900 hover:border-emerald-200 hover:bg-emerald-100/50"
                                                }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-black">Tidak Sensitif</span>
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.sensitivity === "Not Sensitive" ? "border-emerald-600 bg-emerald-600" : "border-emerald-300 bg-white"}`}>
                                                    {formData.sensitivity === "Not Sensitive" && <FiCheck className="text-[10px] text-white" />}
                                                </div>
                                            </div>
                                            <p className="text-xs font-bold text-gray-700 leading-relaxed">
                                                Kulit cenderung kuat, jarang memerah atau perih saat mencoba produk perawatan skincare baru di pasaran.
                                            </p>
                                        </div>

                                        {/* sensitive card*/}
                                        <div
                                            onClick={() => handleCardSelect("sensitivity", "Sensitive")}
                                            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-2 select-none active:scale-[0.99] shadow-sm hover:shadow-md ${formData.sensitivity === "Sensitive"
                                                ? "border-rose-500 bg-rose-200 text-gray-900 ring-4 ring-rose-500/20"
                                                : "border-rose-100 bg-rose-50 text-gray-900 hover:border-rose-200 hover:bg-rose-100/50"
                                                }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-black">Sensitif </span>
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.sensitivity === "Sensitive" ? "border-rose-600 bg-rose-600" : "border-rose-300 bg-white"}`}>
                                                    {formData.sensitivity === "Sensitive" && <FiCheck className="text-[10px] text-white" />}
                                                </div>
                                            </div>
                                            <p className="text-xs font-bold text-gray-700 leading-relaxed">
                                                Kulit gampang memerah, terasa perih, gatal, atau panas terbakar saat terkena sinar matahari atau tidak cocok suatu produk.
                                            </p>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        )}


                        {error && (
                            <div className="p-5 bg-red-50 border-l-8 border-red-500 text-red-800 text-sm rounded-r-2xl font-bold shadow-md transition-all animate-fadeIn flex items-center gap-3">
                                {error}
                            </div>
                        )}


                        <div className="flex gap-4 pt-6 border-t border-gray-100 w-full mt-auto">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-10 py-5 border-2 border-gray-200 text-gray-600 font-extrabold rounded-2xl hover:bg-gray-100 hover:text-gray-800 transition-all text-base active:scale-[0.97]"
                                >
                                    ← Kembali
                                </button>
                            )}

                            {currentStep < 3 ? (
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="flex-1 py-5 bg-emerald-600 text-white font-extrabold rounded-2xl hover:bg-emerald-700 transition-all text-base shadow-xl shadow-emerald-200/50 text-center active:scale-[0.98]"
                                >
                                    Lanjutkan Langkah →
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`flex-1 py-5 rounded-2xl font-extrabold text-base transition-all shadow-xl ${loading
                                        ? "bg-gray-400 cursor-not-allowed text-white shadow-none"
                                        : "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-300 active:scale-[0.98]"
                                        }`}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-3">
                                            <svg className="animate-spin h-6 w-6 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                                            Teknologi AI FaceHealth-ID Sedang Memproses Hasil Pemetaan Skincare...
                                        </span>
                                    ) : (
                                        " Selesai dan Mulai Analisis"
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <p className="mt-8 text-center text-xs sm:text-sm text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
                    Disclaimer: Hasil analisis yang disediakan oleh sistem kecerdasan buatan FaceHealth ID ini bersifat sebagai edukasi dan skrining awal mandiri. Platform ini tidak menggantikan diagnosis medis resmi, konsultasi langsung, ataupun perawatan dari dokter spesialis kulit dan dermatolog profesional.
                </p>
            </div>
        </div>
    );
};

export default AnalysisForm;