"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  return (
    <section id="services" className="px-6 py-16 md:px-16 md:py-24 bg-white text-black relative">
      {/* Top row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16 md:mb-24">
        {/* Left: Title + Floating Badge */}
        <div className="relative flex-1">
           {/* Floating Badge */}
           <motion.div 
             initial={{ rotate: -10 }}
             animate={{ rotate: 10 }}
             transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
             className="absolute -top-12 md:-top-16 left-0 md:left-auto md:right-[100px] bg-[#ff5e3b] text-white font-archivo-black px-5 py-2.5 rounded-full rotate-[15deg] z-[2] shadow-[0_5px_15px_rgba(255,94,59,0.4)] text-sm md:text-base tracking-wider"
           >
             SERVICES
           </motion.div>
           
           <h2 className="heading-font text-[3.5rem] md:text-[5.5rem] leading-[0.85] tracking-[-0.03em] m-0 lowercase">
             SERVICES WE<br/>PROVIDE
           </h2>
        </div>

        {/* Right: Description + Button */}
        <div className="flex-1 max-w-[450px] flex flex-col gap-8">
          <p className="text-lg md:text-xl leading-relaxed font-medium text-gray-700">
            Discover the full range of marketing services designed to grow your brand and maximize performance.
          </p>
          <button className="bg-black text-white px-10 py-5 rounded-full text-lg md:text-xl font-bold flex items-center gap-3 self-start hover:scale-105 transition-transform">
            All Services <span>→</span>
          </button>
        </div>
      </div>

      {/* Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: SEO Digital Strategy */}
        <div className="bg-[#f9dfba] rounded-[50px] p-8 md:p-12 relative overflow-hidden min-h-[400px] md:min-h-[500px] flex flex-col transition-transform hover:-translate-y-2">
          <h3 className="heading-font text-[2.5rem] md:text-[3.5rem] leading-[0.9] mb-6 z-[2]">
            SEO DIGITAL<br/>STRATEGY
          </h3>
          <p className="text-lg md:text-xl leading-relaxed font-medium z-[2] max-w-[85%] text-gray-800">
            We craft customized marketing roadmaps that align with your goals — blending research, creativity.
          </p>
          <img 
            src="/seo_robot.png" 
            alt="SEO Robot" 
            className="absolute -bottom-8 -right-4 w-[200px] md:w-[320px] z-[1] mix-blend-multiply opacity-80"
          />
        </div>

        {/* Card 2: Branding & Creative Design */}
        <div className="bg-[#e6ff67] rounded-[50px] p-8 md:p-12 relative overflow-hidden min-h-[400px] md:min-h-[500px] flex flex-col transition-transform hover:-translate-y-2">
          <h3 className="heading-font text-[2.5rem] md:text-[3.5rem] leading-[0.9] mb-6 z-[2]">
            BRANDING &<br/>CREATIVE DESIGN
          </h3>
          <p className="text-lg md:text-xl leading-relaxed font-medium z-[2] max-w-[85%] text-gray-800">
            Brand identity that stands out. From logo to visual storytelling, we bring your brand's personality to life.
          </p>
          <img 
            src="/branding_robot.png" 
            alt="Branding Robot" 
            className="absolute -bottom-8 -right-4 w-[200px] md:w-[320px] z-[1] mix-blend-multiply opacity-80"
          />
        </div>

      </div>

    </section>
  );
};

export default Services;
