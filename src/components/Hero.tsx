"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Hero = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'content', 'hero'), (doc) => {
      if (doc.exists()) {
        setData(doc.data());
      }
    });
    return () => unsubscribe();
  }, []);

  // Metin giriş animasyonu ayarları
  const titleVariants = {
    hidden: { y: "110%", rotate: 2 },
    visible: (custom: number) => ({ 
      y: 0, 
      rotate: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        delay: custom
      }
    })
  };

  // Hover ayarları - Zarif ve yumuşak
  const hoverSpring = { 
    type: "spring", 
    stiffness: 150, 
    damping: 20 
  };

  const line1 = data?.line1 || "MAKE YOUR";
  const line2 = data?.line2 || "BRAND";
  const line3 = data?.line3 || "MEMORABLE";
  const bottomTitle = data?.bottomTitle || "BRAND\nNEW\nWAVES.";
  const bottomDesc = data?.bottomDesc || "We craft strategies that turn clicks into customers and campaigns into lasting brand stories.";

  return (
    <div className="relative min-h-screen w-full bg-[#1D6BFF] overflow-hidden flex flex-col" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
      
      {/* Arka Plan Halftone Dokusu (Görseldeki yuvarlaklar) */}
      <div className="absolute inset-0 pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 2px, transparent 0)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      {/* Üst Bölüm / Tipografi */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-8 z-10 pt-40">
        
        {/* Satır 1 - Merkeze Yakın */}
        <div className="relative overflow-hidden w-full flex justify-center">
          <motion.div
            variants={titleVariants as any}
            custom={0}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              skewX: -6, 
              scale: 1.03,
              transition: hoverSpring as any
            }}
            className="cursor-default origin-center inline-block py-2"
          >
            <h1 className="text-[14vw] md:text-[11vw] font-normal text-white leading-[0.85] tracking-[-0.02em] uppercase drop-shadow-lg select-none">
              {line1}
            </h1>
          </motion.div>
        </div>

        {/* Satır 2 - Merkeze Yakın */}
        <div className="relative overflow-hidden w-full flex justify-center md:pr-[15vw]">
          <motion.div
            variants={titleVariants as any}
            custom={0.1}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              skewX: 6, 
              scale: 1.03,
              transition: hoverSpring as any
            }}
            className="cursor-default origin-center inline-block py-2"
          >
            <h1 className="text-[14vw] md:text-[11vw] font-normal text-white leading-[0.85] tracking-[-0.02em] uppercase drop-shadow-lg select-none">
              {line2}
            </h1>
          </motion.div>
        </div>

        {/* Satır 3 - Merkeze Yakın / Staggered */}
        <div className="relative overflow-hidden w-full flex justify-center md:pl-[20vw]">
          <motion.div
            variants={titleVariants as any}
            custom={0.2}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              skewX: -3, 
              scale: 1.02,
              transition: hoverSpring as any
            }}
            className="cursor-default origin-center inline-block py-2"
          >
            <h1 className="text-[14vw] md:text-[11vw] font-normal text-white leading-[0.85] tracking-[-0.02em] uppercase drop-shadow-xl select-none">
              {line3}
            </h1>
          </motion.div>
        </div>
      </main>

      {/* Alt Bölüm / Footer CTA */}
      <div className="mt-auto relative z-20 px-8 md:px-16 pb-32 flex flex-col md:flex-row justify-between items-end gap-8 font-sans">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 w-full md:w-auto">
          <div className="text-white font-black text-2xl leading-none whitespace-pre-wrap" style={{ fontFamily: 'var(--font-archivo-black)' }}>
            {bottomTitle}
          </div>
          <a href="/contact" style={{ textDecoration: 'none' }}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#1D6BFF] px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-all shadow-xl"
            >
              Let's Talk <span className="text-xl">→</span>
            </motion.button>
          </a>
        </div>

        <div className="max-w-[300px] text-right">
          <p className="text-white/90 text-sm font-medium leading-tight italic">
            "{bottomDesc}"
          </p>
        </div>
      </div>

      {/* En Alt Dalgalı Bölücü */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[200%] h-[80px] text-white fill-current">
          <path d="M0,0 C150,0 150,100 300,100 C450,100 450,0 600,0 C750,0 750,100 900,100 C1050,100 1050,0 1200,0 L1200,120 L0,120 Z" />
        </svg>
      </div>

    </div>
  );
}

export default Hero;
