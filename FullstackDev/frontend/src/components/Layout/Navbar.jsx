import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    FiMenu,
    FiX,
    FiUser,
    FiLogOut,
    FiHome,
    FiUsers,
    FiActivity,
    FiChevronDown,
} from 'react-icons/fi';
import { LuCat } from 'react-icons/lu';
import { motion, AnimatePresence } from 'motion/react';
import { RiFileHistoryLine } from 'react-icons/ri';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = localStorage.getItem('token');
        return !!token;
    });
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setIsLoggedIn(false);
        setIsUserMenuOpen(false);
        navigate('/');
    };

    const navItems = [
        { name: 'Home', path: '/', icon: FiHome },
        { name: 'Tim Kami', path: '/about', icon: FiUsers },
        { name: 'Analisis Kulit', path: '/analysis', icon: FiActivity },
        { name: 'Riwayat Analisis', path: '/history', icon: RiFileHistoryLine }
    ];

    const NavLinkItem = ({ item, mobile = false }) => {
        const Icon = item.icon;

        return (
            <NavLink
                to={item.path}
                className={mobile ? "block" : "relative"}
            >
                {({ isActive }) => (
                    <motion.div
                        whileHover={{ scale: mobile ? 1 : 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${mobile
                            ? isActive
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                                : 'text-gray-700 hover:bg-emerald-50'
                            : isActive
                                ? 'text-emerald-600'
                                : 'text-gray-600 hover:text-emerald-600'
                            }`}
                    >
                        {mobile && <Icon className="text-lg" />}
                        <span>{item.name}</span>
                        {!mobile && isActive && (
                            <motion.div
                                layoutId="activeIndicator"
                                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                    </motion.div>
                )}
            </NavLink>
        );
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed w-full z-50 top-0 transition-all duration-300 ${scrolled
                    ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-emerald-100/50'
                    : 'bg-white/80 backdrop-blur-md'
                    } border-b ${scrolled ? 'border-emerald-100' : 'border-gray-100'}`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex-shrink-0 flex items-center"
                        >
                            <Link to="/" className="flex items-center gap-2">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-200"
                                >
                                    <LuCat className="text-white text-lg" />
                                </motion.div>
                                <span className="text-2xl font-bold text-emerald-600 tracking-tight">
                                    FaceHealth ID
                                </span>
                            </Link>
                        </motion.div>

                        <div className="hidden md:flex items-center space-x-1">
                            {navItems.map((item) => (
                                <NavLinkItem key={item.path} item={item} />
                            ))}

                            {/* autentikasi akun user */}
                            <div className="ml-4 pl-4 border-l border-gray-200">
                                {isLoggedIn ? (
                                    <div className="relative">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium shadow-lg transition-all"
                                        >
                                            <div className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                                <FiUser className="text-sm" />
                                            </div>
                                            <span className="text-sm capitalize tracking-wide text-left block truncate">
                                                {localStorage.getItem('userName') || 'User'}
                                            </span>
                                            <motion.div
                                                animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex-shrink-0"
                                            >
                                                <FiChevronDown className="text-sm" />
                                            </motion.div>
                                        </motion.button>

                                        {/* dropdown login */}
                                        <AnimatePresence>
                                            {isUserMenuOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-gray-100 overflow-hidden"
                                                >
                                                    <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50/50 border-b border-emerald-100/60">
                                                        <p className="text-xs text-gray-400 font-medium tracking-wide">Masuk sebagai</p>
                                                        <p className="text-sm md:text-base font-bold text-gray-800 capitalize break-words mt-0.5 leading-snug">
                                                            {localStorage.getItem('userName')}
                                                        </p>
                                                    </div>
                                                    <div className="p-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.02, x: 4 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={handleLogout}
                                                            className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium"
                                                        >
                                                            <FiLogOut className="text-base" />
                                                            <span>Logout</span>
                                                        </motion.button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Link
                                            to="/login"
                                            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300 transition-all text-sm"
                                        >
                                            <FiUser className="text-base" />
                                            <span>Login</span>
                                        </Link>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        {/* mobile */}
                        <div className="flex md:hidden items-center">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-xl text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                            >
                                <AnimatePresence mode="wait">
                                    {isMobileMenuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <FiX className="text-2xl" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <FiMenu className="text-2xl" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl overflow-hidden"
                        >
                            <div className="px-4 py-4 space-y-2">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.path}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <NavLinkItem item={item} mobile />
                                    </motion.div>
                                ))}

                                {/* autentikasi */}
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: navItems.length * 0.1 }}
                                    className="pt-4 border-t border-gray-100"
                                >
                                    {isLoggedIn ? (
                                        <div className="space-y-2">
                                            <div className="px-4 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                                                <p className="text-xs text-gray-500 font-medium mb-1">Logged in as</p>
                                                <p className="text-sm font-bold text-gray-800 capitalize">
                                                    {localStorage.getItem('userName')}
                                                </p>
                                            </div>
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-medium transition-colors"
                                            >
                                                <FiLogOut className="text-lg" />
                                                <span>Logout</span>
                                            </motion.button>
                                        </div>
                                    ) : (
                                        <Link
                                            to="/login"
                                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-3 rounded-xl font-semibold shadow-lg shadow-emerald-200"
                                        >
                                            <FiUser className="text-lg" />
                                            <span>Login</span>
                                        </Link>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            <AnimatePresence>
                {isUserMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsUserMenuOpen(false)}
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;