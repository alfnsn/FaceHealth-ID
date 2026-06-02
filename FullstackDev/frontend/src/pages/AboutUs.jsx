import { FiCode, FiCpu, FiBarChart2, FiUsers, FiTarget } from "react-icons/fi";
import { LuCat } from "react-icons/lu"; 
import { motion } from "motion/react";

const AboutUs = () => {
    const teamMembers = [
        {
            name: "Alfian Febiana Santika",
            path: "AI Engineer",
            icon: <FiCpu className="w-16 h-16 text-purple-600" />,
            bgBadge: "bg-purple-50 text-purple-700 border-purple-100",
            bgIcon: "bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200",
            color: "purple"
        },
        {
            name: "Muhammad Raihan",
            path: "AI Engineer",
            icon: <FiCpu className="w-16 h-16 text-purple-600" />,
            bgBadge: "bg-purple-50 text-purple-700 border-purple-100",
            bgIcon: "bg-gradient-to-br from-purple-100 to-purple-50 border-purple-200",
            color: "purple"
        },
        {
            name: "Muhammad Rifqy Azhar Widiyatmoko",
            path: "Data Science",
            icon: <FiBarChart2 className="w-16 h-16 text-blue-600" />,
            bgBadge: "bg-blue-50 text-blue-700 border-blue-100",
            bgIcon: "bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200",
            color: "blue"
        },
        {
            name: "Diva Aulia Nisa",
            path: "Data Science",
            icon: <FiBarChart2 className="w-16 h-16 text-blue-600" />,
            bgBadge: "bg-blue-50 text-blue-700 border-blue-100",
            bgIcon: "bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200",
            color: "blue"
        },
        {
            name: "Shinta Feronica Florence",
            path: "Full-stack Web Developer",
            icon: <FiCode className="w-16 h-16 text-emerald-600" />,
            bgBadge: "bg-emerald-50 text-emerald-700 border-emerald-100",
            bgIcon: "bg-gradient-to-br from-emerald-100 to-emerald-50 border-emerald-200",
            color: "emerald"
        },
    ];

    const stats = [
        { icon: <FiUsers />, value: "5", label: "Anggota Tim", color: "emerald" },
        { icon: <FiTarget />, value: "3", label: "Learning Path", color: "blue" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-transparent font-sans relative overflow-hidden">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                <motion.div
                    className="text-center max-w-4xl mx-auto mb-16"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6 border border-emerald-100/50"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <LuCat className="text-emerald-600 text-lg" />
                        <span className="text-sm font-bold text-emerald-600 tracking-wide">Tim Capstone</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
                        Kelompok{" "}
                        <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                            CC26-PSU048
                        </span>
                    </h1>
                </motion.div>

                <motion.div
                    className="grid grid-cols-2 gap-6 max-w-3xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/60 shadow-lg hover:shadow-xl transition-all"
                            whileHover={{ y: -5, scale: 1.02 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <motion.div
                                className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${
                                    stat.color === 'emerald' ? 'from-emerald-500 to-teal-600' :
                                    stat.color === 'blue' ? 'from-blue-500 to-cyan-600' :
                                    'from-purple-500 to-pink-600'
                                } text-white text-2xl mb-3 shadow-lg`}
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                {stat.icon}
                            </motion.div>
                            <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                            <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10, scale: 1.03 }}
                            className="group relative"
                        >
                            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${
                                member.color === 'purple' ? 'from-purple-400/20 to-pink-400/20' :
                                member.color === 'blue' ? 'from-blue-400/20 to-cyan-400/20' :
                                'from-emerald-400/20 to-teal-400/20'
                            } opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}></div>

                            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center overflow-hidden">
                                
                                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${
                                    member.color === 'purple' ? 'from-purple-400/10 to-transparent' :
                                    member.color === 'blue' ? 'from-blue-400/10 to-transparent' :
                                    'from-emerald-400/10 to-transparent'
                                } rounded-bl-full`}></div>

                                <motion.div
                                    className="relative inline-flex items-center justify-center mb-6 z-10"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <motion.div
                                        className={`absolute inset-0 rounded-3xl ${
                                            member.color === 'purple' ? 'bg-gradient-to-br from-purple-200/40 to-pink-200/40' :
                                            member.color === 'blue' ? 'bg-gradient-to-br from-blue-200/40 to-cyan-200/40' :
                                            'from-emerald-200/40 to-teal-200/40'
                                        } blur-xl`}
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            rotate: [0, 180, 360]
                                        }}
                                        transition={{
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />

                                    <div className={`relative w-32 h-32 rounded-3xl border-2 flex items-center justify-center bg-white shadow-xl transition-all duration-300 ${member.bgIcon} group-hover:shadow-2xl group-hover:border-opacity-50`}>
                                        <motion.div
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            {member.icon}
                                        </motion.div>
                                    </div>
                                </motion.div>

                                <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight px-2 group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                                    {member.name}
                                </h3>

                                <div className={`inline-flex px-5 py-2 border-2 text-xs font-black rounded-full uppercase tracking-widest ${member.bgBadge} shadow-md hover:shadow-lg transition-all`}>
                                    {member.path}
                                </div>

                                <motion.div
                                    className={`mt-6 h-1 w-0 group-hover:w-20 rounded-full bg-gradient-to-r ${
                                        member.color === 'purple' ? 'from-purple-400 to-pink-400' :
                                        member.color === 'blue' ? 'from-blue-400 to-cyan-400' :
                                        'from-emerald-400 to-teal-400'
                                    } transition-all duration-500`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="max-w-4xl mx-auto mt-24 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    
                </motion.div>
                
            </div>
        </div>
    );
};

export default AboutUs;
