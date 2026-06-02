import { motion } from "motion/react";
import { FiMail } from "react-icons/fi";

const Footer = () => {

  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-8 pb-4 justify-items-center">

          <div className="w-full flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent mb-3">
                FaceHealth ID
              </h3>

              <p className="text-emerald-100/80 text-sm leading-relaxed mb-6 max-w-sm text-center">
                Memberikan kepercayaan diri melalui kulit yang sehat. Solusi AI terpercaya untuk analisis kesehatan kulit Anda.
              </p>

              <div className="space-y-3 text-sm flex flex-col items-center">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-emerald-100/70 hover:text-emerald-300 transition-colors cursor-pointer justify-center"
                >
                  <FiMail className="flex-shrink-0" />
                  <span>CC26-PSU048@student.devacademy.id</span>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-emerald-100/70 hover:text-emerald-300 transition-colors cursor-pointer justify-center"
                >
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        {/* garis */}
        <div className="border-t border-emerald-700/30 my-4" />

        <div className="flex flex-col justify-center text-center gap-4">

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-emerald-100/60 flex flex-col items-center w-full"
          >
            <p className="flex items-center justify-center gap-1">
              &copy; 2026 FaceHealth ID
            </p>

            <p className="text-xs mt-1 text-emerald-100/40 tracking-wider text-center">
              CC26-PSU048
            </p>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 px-4 py-2 rounded-full text-xs text-emerald-200 shadow-inner">
            Capstone Project 2026. Coding Camp Powered by DBS Foundation.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;