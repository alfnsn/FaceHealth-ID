import { FiCode, FiCpu, FiBarChart2 } from "react-icons/fi";

const AboutUs = () => {
    const teamMembers = [
        {
            name: "Alfian Febiana Santika",
            path: "AI Engineer",
            icon: <FiCpu className="w-16 h-16 text-purple-650" />,
            bgBadge: "bg-purple-50 text-purple-700 border-purple-100",
            bgIcon: "bg-purple-50 border-purple-200"
        },
        {
            name: "Anggota 2",
            path: "Muhammad Raihan",
            icon: <FiCpu className="w-16 h-16 text-purple-650" />,
            bgBadge: "bg-purple-50 text-purple-700 border-purple-100",
            bgIcon: "bg-purple-50 border-purple-200"
        },
        {
            name: "Anggota 3",
            path: "Muhammad Rifqy Azhar Widiyatmoko",
            icon: <FiBarChart2 className="w-16 h-16 text-blue-650" />,
            bgBadge: "bg-blue-50 text-blue-700 border-blue-100",
            bgIcon: "bg-blue-50 border-blue-200"
        },
        {
            name: "Diva Aulia Nisa",
            path: "Data Science",
            icon: <FiBarChart2 className="w-16 h-16 text-blue-650" />,
            bgBadge: "bg-blue-50 text-blue-700 border-blue-100",
            bgIcon: "bg-blue-50 border-blue-200"
        },
        {
            name: "Shinta Feronica Florence",
            path: "Full-stack Developer",
            icon: <FiCode className="w-16 h-16 text-emerald-650" />,
            bgBadge: "bg-emerald-50 text-emerald-700 border-emerald-100",
            bgIcon: "bg-emerald-50 border-emerald-200"
        },
    ];

    return (
        <div className="pt-28 pb-20 min-h-screen bg-slate-50 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-emerald-600 font-extrabold tracking-widest uppercase text-xs sm:text-sm">
                        Tim Capstone
                    </h2>
                    <h1 className="mt-3 text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                        Kelompok <span className="text-emerald-600">CC26-PSU048</span>
                    </h1>
                </div>

                {/* Grid Team Members */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-3xl p-8 border border-slate-200/60 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between items-center text-center relative overflow-hidden"
                        >
                            <div className="relative inline-flex items-center justify-center mb-6 z-10">
                                <div className="absolute inset-0 bg-slate-100 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-300 border border-slate-200/40"></div>

                                <div className={`relative w-32 h-32 rounded-3xl border-2 flex items-center justify-center bg-white shadow-md transition-colors ${member.bgIcon}`}>
                                    {member.icon}
                                </div>
                            </div>

                            <div className="w-full">
                                <h3 className="text-xl font-black text-gray-900 group-hover:text-emerald-600 transition-colors tracking-tight">
                                    {member.name}
                                </h3>
                            </div>

                            <div className={`mt-6 inline-flex px-4 py-1.5 border text-xs font-black rounded-full uppercase tracking-widest ${member.bgBadge}`}>
                                {member.path}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;