"use client";
import React from 'react';
import { motion } from 'framer-motion';

const SERVICES = [
  'MARKA KİMLİĞİ',
  'UI / UX',
  'DİJİTAL PAZARLAMA',
  'E-TİCARET',
  'SEO',
  'SOSYAL MEDYA',
  'İÇERİK ÜRETİMİ',
  'MARKA STRATEJİSİ',
  'WEB TASARIMI',
  'REKLAM YÖNETİMİ',
];

const Marquee = () => {
  const items = [...SERVICES, ...SERVICES, ...SERVICES];
  return (
    <div className="overflow-hidden border-t border-b border-black/10 py-3 relative">
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: [0, '-33.333%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-black/50 pr-8"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            <span className="text-black/25 text-[8px]">◆</span>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="bg-white w-full">

      {/* ── Üst giriş: başlık + sağ panel ── */}
      <div className="site-px pt-10 pb-0">
        <div className="flex items-start gap-10">

          {/* Büyük başlık — esnek, taşmaz */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="text-[10vw] font-light leading-[0.9] tracking-tight text-black select-none"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Nida Studio<sup className="text-[4vw] align-super font-light">®</sup>
            </h1>
          </motion.div>

          {/* Sağ panel: rating + açıklama */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden md:flex flex-col items-end gap-4 shrink-0 w-[220px] pt-4"
          >
            {/* Rating */}
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-black fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs font-semibold text-black ml-1">4.9/5</span>
              </div>
              <p className="text-[11px] text-black/45 font-medium tracking-wide text-right">
                100+ müşterinin güveni
              </p>
            </div>

            {/* Açıklama */}
            <p
              className="text-sm text-black/55 leading-relaxed text-right font-normal"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Nida, modern marka kimlikleri ve özgün dijital deneyimler üreten bir tasarım stüdyosudur.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Servis marquee — 135 px içinde ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="site-px mt-6"
      >
        <Marquee />
      </motion.div>

      {/* ── Video alanı — 1400×900 oranı ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="site-px mt-6"
      >
        <div
          className="w-full relative overflow-hidden bg-black/5 rounded-sm"
          style={{ aspectRatio: '1400 / 900' }}
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            // src="/hero-video.mp4"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-[#f0ede8]">
            <div className="flex flex-col items-center gap-3 opacity-30">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-black">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
              <span className="text-xs tracking-widest font-medium text-black uppercase">Video</span>
            </div>
          </div>
        </div>
      </motion.div>



    </section>
  );
};

export default Hero;
