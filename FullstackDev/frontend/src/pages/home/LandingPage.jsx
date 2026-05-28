import { Link } from 'react-router-dom';
import bgImage from '../../assets/bg.jpg'

const LandingPage = () => {
    return (
        <div className="w-full bg-white pt-16 min-h-screen animate-page">
            {/* HERO SECTION */}
            <div 
                className="relative bg-cover bg-center bg-no-repeat py-24 md:py-32 text-white"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                {/* Overlay  */}
                <div className="absolute inset-0 bg-slate-950/60 md:bg-gradient-to-r from-slate-950/85 to-slate-950/40 z-0"></div>

                <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            Solusi Cerdas untuk <br />
                            <span className="text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded-xl inline-block mt-2">
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

           {/* Section penjelasan facehealth id */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-emerald-600 font-bold tracking-wide uppercase text-sm">Lorem</h2>
                        <p className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">
                            Apa itu FaceHealth ID?
                        </p>
                        <p className="mt-4 text-gray-600 text-lg">
                           FAceJealtj ID adalah Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem at aliquam iste amet a ratione ea facilis vel blanditiis! Dolores magnam exercitationem eum perferendis dolor illum odio quibusdam impedit doloremque.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"  /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Analisis Presisi</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Memanfaatkan teknologi terkini untuk menganalisis kondisi wajah Anda melalui foto atau data spesifik jenis kulit.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-200">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"  /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Rekomendasi Personal</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Rekomendasi bahan aktif (ingredients) yang disesuaikan dengan sensitivitas dan tipe kulit Anda.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-100 hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-emerald-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-900/20">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Lorem</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, quisquam vero doloribus sunt exercitationem corporis, cumque quod magnam aut officia culpa molestiae officiis cupiditate esse reiciendis, ipsam veniam eum id?
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;