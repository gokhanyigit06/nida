"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
    <div className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col" style={{ fontFamily: 'var(--font-bebas-neue)' }}>
      
      {/* Arka Plan Halftone Dokusu */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 md:opacity-100" 
        style={{ 
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 2px, transparent 0)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      {/* Üst Bölüm / Tipografi */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-8 md:px-16 z-10 pt-48 md:pt-40">
        <div className="flex flex-col items-start">

          {/* Satır 1 */}
          <div className="relative overflow-hidden">
            <motion.div
              variants={titleVariants as any}
              custom={0}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03, transition: hoverSpring as any }}
              className="cursor-default origin-left block py-1"
            >
              <h1 className="text-[13vw] md:text-[11vw] font-normal text-white leading-[0.85] tracking-tight uppercase drop-shadow-xl select-none whitespace-nowrap">
                {line1}
              </h1>
            </motion.div>
          </div>

          {/* Satır 2 */}
          <div className="relative overflow-hidden">
            <motion.div
              variants={titleVariants as any}
              custom={0.1}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03, transition: hoverSpring as any }}
              className="cursor-default origin-left block py-1"
            >
              <h1 className="text-[13vw] md:text-[11vw] font-normal text-white leading-[0.85] tracking-tight uppercase drop-shadow-xl select-none whitespace-nowrap">
                {line2}
              </h1>
            </motion.div>
          </div>

          {/* Satır 3 */}
          <div className="relative overflow-hidden">
            <motion.div
              variants={titleVariants as any}
              custom={0.2}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.02, transition: hoverSpring as any }}
              className="cursor-default origin-left block py-1"
            >
              <h1 className="text-[13vw] md:text-[11vw] font-normal text-white leading-[0.85] tracking-tight uppercase drop-shadow-2xl select-none whitespace-nowrap">
                {line3}
              </h1>
            </motion.div>
          </div>

        </div>
      </main>

      {/* Alt Bölüm / Footer CTA */}
      <div className="mt-auto relative z-20 px-8 md:px-16 pb-24 md:pb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 font-sans">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 w-full md:w-auto">
          <div className="text-white font-black text-2xl md:text-3xl leading-none whitespace-pre-wrap tracking-tighter" style={{ fontFamily: 'var(--font-archivo-black)' }}>
            {bottomTitle}
          </div>
          <Link href="/contact" className="w-full md:w-auto">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black w-full md:w-auto px-10 py-5 rounded-full font-black text-xl flex justify-center items-center gap-2 transition-all shadow-2xl"
              style={{ fontFamily: 'var(--font-archivo-black)' }}
            >
              LET'S TALK <span className="text-2xl">→</span>
            </motion.button>
          </Link>
        </div>

        <div className="max-w-[320px] text-left md:text-right opacity-80">
          <p className="text-white text-base md:text-lg font-medium leading-relaxed italic">
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
