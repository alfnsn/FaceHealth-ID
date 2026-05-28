import hero from '../assets/hero.png'

const AboutUs = () => {
    const teamMembers = [
        {
            name: "Anggota 1",
            path: "Learnign Path A",
            image: hero
        },
        {
            name: "Anggota 2",
            path: "Learning Path A",
            image: hero
        },
        {
            name: "Anggota 3",
            path: "Learning Path B",
            image: hero
        },
        {
            name: "Anggota 4",
            path: "Learning Path B",
            image: hero
        },
        {
            name: "Anggota 5",
            path: "Learning Path C",
            image: hero
        },
    ];

    return (
        <div className="pt-24 pb-20 min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-emerald-600 font-bold tracking-widest uppercase text-sm">Tim Kami</h2>
                    <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-gray-900">
                        Kelompok <span className="text-emerald-600">CC26-PSU048</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Beranggotakan 5 orang dengan learnign path Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores in doloremque excepturi iusto quos ab. Sunt velit itaque earum, ea iusto nesciunt vitae mollitia eum molestiae illo quo nobis suscipit!
                    </p>
                </div>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {teamMembers.map((member, index) => (
                        <div 
                            key={index} 
                            className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center"
                        >
                            <div className="relative inline-block mb-6">
                              
                                <div className="absolute inset-0 bg-emerald-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                                <img 
                                    src={member.image} 
                                    alt={member.name}
                                    className="relative w-32 h-32 rounded-2xl object-cover bg-white border-2 border-emerald-50 shadow-md"
                                />
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                                {member.name}
                            </h3>
                            
                            <div className="mt-2 inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">
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