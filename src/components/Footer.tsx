"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-black text-white site-px py-20 md:py-32 relative">
      {/* Top Scalloped Border - This depends on your global CSS */}
      <div className="scalloped-top brightness-[10] absolute top-0 left-0 w-full h-8 z-10" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Huge Text Section */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center pt-8 md:pt-12">
          
          {/* Rotating Star */}
          <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="w-8 h-8 md:w-12 md:h-12 opacity-80 mb-14"
          >
             <svg viewBox="0 0 24 24" fill="#ffffff" className="w-full h-full">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
             </svg>
          </motion.div>
          
          <h1 className="heading-font text-[14vw] md:text-[13.5vw] leading-[0.8] tracking-[-0.05em] uppercase m-0 drop-shadow-2xl">
            NİDA STUDIO
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-white/20 text-sm md:text-base font-medium">
          <div className="flex gap-6 md:gap-10">
            <a href="#" className="hover:opacity-70 transition-opacity">Terms & Conditions</a>
            <a href="#" className="hover:opacity-70 transition-opacity">Privacy Policy</a>
          </div>
          <div className="opacity-60 text-center md:text-right">
            © {new Date().getFullYear()} Nida Studio. All Rights Reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
