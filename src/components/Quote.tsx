"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Quote = () => {
  return (
    <section className="px-6 py-24 md:px-16 md:py-48 bg-white relative flex items-center justify-center overflow-hidden min-h-[50vh] md:min-h-[70vh]">
      
      {/* Background Animated Pill Shapes */}
      <motion.div
        animate={{ 
          rotate: [30, 35, 30],
          y: [-10, 10, -10]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[80px] h-[250px] md:w-[120px] md:h-[350px] bg-[#fadbf3] rounded-full z-[1] left-[10%] md:left-[35%] top-[5%]"
      />

      <motion.div
        animate={{ 
          rotate: [-45, -50, -45],
          x: [-10, 10, -10]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[100px] h-[220px] md:w-[140px] md:h-[325px] bg-[#ffcff2] rounded-full z-[1] right-[5%] md:right-[35%] top-[10%] md:top-[20%]"
      />
      
      <motion.div
        animate={{ 
          rotate: [-60, -55, -60],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[70px] h-[180px] md:w-[100px] md:h-[250px] bg-[#fcd3ef] rounded-full z-[1] left-[40%] bottom-[5%] md:bottom-[10%]"
      />

      {/* Main Text */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        className="heading-font relative z-10 text-[11vw] md:text-[6.5vw] text-center leading-[0.85] tracking-[-0.03em] max-w-[1400px] text-black"
      >
        WE CRAFT<br/>
        STRATEGIES THAT<br/>
        TURN INTO<br/>
        <span className="tracking-[-0.05em]">CAMPAIGNS</span><br/>
        LASTING BRAND<br/>
        STORIES.
      </motion.div>

    </section>
  );
};

export default Quote;
