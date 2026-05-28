import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AnalysisForm = () => {
    // const userName = localStorage.getItem('userName') || 'User';
    // const [currentStep, setCurrentStep] = useState(1);
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

    const [inputMethod, setInputMethod] = useState("manual");

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const toggleSensitivity = () => {
        setFormData((prev) => ({
            ...prev,
            sensitivity: prev.sensitivity === "Sensitive" ? "Not Sensitive" : "Sensitive",
        }));
    };
// masih dlaam tahap pengembangan nanti diperbaiki

    // const handleNextStep = () => {
    //     if (currentStep === 1) {
    //         if (inputMethod === "manual" && !formData.detectedAcneType) {
    //             setError("Silakan pilih kondisi masalah kulit Anda terlebih dahulu sebelum melanjutkan.");
    //             return;
    //         }
    //         if (inputMethod === "ai" && !image) {
    //             setError("Silakan unggah foto wajah Anda terlebih dahulu untuk dianalisis AI.");
    //             return;
    //         }
    //     } else if (currentStep === 2) {
    //         if (!formData.skinType || !formData.skinSubtype) {
    //             setError("Silakan lengkapi tipe dan subtype kulit Anda untuk melanjutkan.");
    //             return;
    //         }
    //     }
    //     setError("");
    //     setCurrentStep((prev) => prev + 1);
    // };

    // const handlePrevStep = () => {
    //     setError("");
    //     setCurrentStep((prev) => prev - 1);
    // };

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
            const response = await axios.post("http://localhost:5001/api/recommendations", submissionData, {
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
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Analisis Kondisi Kulit Anda
                    </h1>
                    {/* <p className="mt-3 text-lg text-gray-500 font-medium">
                        Langkah <span className="text-emerald-600 font-bold">{currentStep}</span> dari <span className="font-bold">3</span>: Analisis Kesehatan Kulit Wajah
                    </p>

                    <div className="w-full max-w-md bg-gray-200 h-3 rounded-full mx-auto mt-6 overflow-hidden shadow-inner">
                        <div 
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full transition-all duration-500 ease-out"
                            style={{ width: `${(currentStep / 3) * 100}%` }}
                        />
                    </div> */}
                </div>

              <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-200/80 p-8 md:p-16 border border-slate-100/80 flex-grow flex flex-col justify-between min-h-[500px]">
                    <form onSubmit={handleSubmit} className="space-y-10 h-full flex flex-col justify-between flex-grow">


                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Tipe Kulit Utama</label>
                                <select
                                    name="skinType"
                                    value={formData.skinType}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-gray-50 text-gray-700 appearance-none cursor-pointer"
                                >
                                    <option value="">Pilih Tipe Kulit</option>
                                    <option value="Oily">Berminyak</option>
                                    <option value="Dry">Kering</option>
                                    <option value="Combination">Kombinasi</option>
                                    <option value="Normal">Normal</option>
                                </select>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Skin Subtype</label>
                                <select
                                    name="skinSubtype"
                                    value={formData.skinSubtype}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-gray-50 text-gray-700 appearance-none cursor-pointer"
                                >
                                    <option value="">Pilih Subtype</option>
                                    <option value="Normal to Dry">Normal to Dry</option>
                                    <option value="Normal to Oily">Normal to Oily</option>
                                    <option value="Dry to Normal">Dry to Normal</option>
                                    <option value="Extreme Dry">Extreme Dry</option>
                                    <option value="Oily to Normal">Oily to Normal</option>
                                    <option value="T-Zone Oily Cheeks Dry">T-Zone Oily Cheeks Dry</option>
                                    <option value="T-Zone Dry Cheeks Oily">T-Zone Dry Cheeks Oily</option>
                                    <option value="Extreme Oily">Extreme Oily</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Rentang Usia</label>
                                <select
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-gray-50 text-gray-700 appearance-none cursor-pointer"
                                >
                                    <option value="">Pilih Usia</option>
                                    <option value="14-18">14-18</option>
                                    <option value="19-24">19-24</option>
                                    <option value="25-36">25-36</option>
                                    <option value="37-45">37-45</option>
                                    <option value="45+">45+</option>
                                </select>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Kulit Sensitif?</label>
                                <div
                                    onClick={toggleSensitivity}
                                    className="relative w-full h-[50px] bg-gray-100 rounded-xl p-1 flex items-center cursor-pointer select-none"
                                >
                                    <div
                                        className={`absolute w-[48%] h-[42px] bg-white rounded-lg shadow-md transition-all duration-300 transform ${formData.sensitivity === "Sensitive" ? "translate-x-full" : "translate-x-0"}`}
                                    />
                                    <div className={`relative z-10 w-1/2 text-center text-sm font-bold transition-colors ${formData.sensitivity === "Not Sensitive" ? "text-emerald-600" : "text-gray-400"}`}>
                                        Tidak
                                    </div>
                                    <div className={`relative z-10 w-1/2 text-center text-sm font-bold transition-colors ${formData.sensitivity === "Sensitive" ? "text-emerald-600" : "text-gray-400"}`}>
                                        Ya
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-4 pt-4 border-t border-gray-100">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Metode Penentuan Masalah Kulit</label>
                            <div className="flex bg-gray-100 p-1 rounded-2xl w-full">
                                <button
                                    type="button"
                                    onClick={() => { setInputMethod("manual"); setPreview(null); }}
                                    className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${inputMethod === "manual" ? "bg-white shadow-sm text-emerald-600" : "text-gray-500"}`}
                                >
                                    Input Manual
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setInputMethod("ai")}
                                    className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${inputMethod === "ai" ? "bg-white shadow-sm text-emerald-600" : "text-gray-500"}`}
                                >
                                    Analisis Foto AI
                                </button>
                            </div>

                            {inputMethod === "manual" ? (
                                <div className="animate-fadeIn">
                                    <select
                                        name="detectedAcneType"
                                        value={formData.detectedAcneType}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none transition-all bg-gray-50 text-gray-700 cursor-pointer"
                                    >
                                        <option value="">Pilih Kondisi Masalah Kulit</option>
                                        <option value="Blackheads">Blackheads</option>
                                        <option value="Whiteheads">Whiteheads</option>
                                        <option value="Papules">Papules</option>
                                        <option value="Pustules">Pustules</option>
                                        <option value="Cyst">Cyst</option>
                                    </select>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-fadeIn">
                                    <div
                                        onClick={() => fileInputRef.current.click()}
                                        className="relative border-2 border-dashed border-emerald-200 rounded-2xl p-6 bg-emerald-50/30 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 transition-all group"
                                    >
                                        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />

                                        {preview ? (
                                            <div className="relative w-full h-48 overflow-hidden rounded-xl">
                                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />

                                            </div>
                                        ) : (
                                            <div className="text-center py-4">
                                                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                                                </div>
                                                <p className="text-sm text-emerald-700 font-medium">Klik untuk upload foto dan deteksi otomatis</p>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-lg">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-emerald-200 active:scale-[0.98]"
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                                    Menganalisis...
                                </span>
                            ) : (
                                "Mulai Analisis Sekarang"
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non repudiandae expedita assumenda commodi facere nihil adipisci, at aperiam voluptatem a dolorum neque ut, harum natus temporibus. Minus vitae dignissimos beatae.
                </p>
            </div>
        </div>
    );
};

export default AnalysisForm;