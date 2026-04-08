"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getSiteContent } from '@/lib/db';

const SERVICES = [
  'VIDEO KURGU',
  'MOTION DESIGN',
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
  const [videoSrc, setVideoSrc] = useState<string>('');

  useEffect(() => {
    getSiteContent().then((data) => {
      if (data?.heroVideo) setVideoSrc(data.heroVideo);
    });
  }, []);

  return (
    <section className="bg-white w-full">

      {/* ── Üst giriş: başlık ── */}
      <div className="site-px pt-10 pb-0">
        <div className="flex items-start gap-10">
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
        </div>
      </div>

      {/* ── Servis marquee ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="site-px mt-6"
      >
        <Marquee />
      </motion.div>

      {/* ── Video alanı ── */}
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
          {videoSrc ? (
            <video
              key={videoSrc}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              src={videoSrc}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[#f0ede8]">
              <div className="flex flex-col items-center gap-3 opacity-30">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-black">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                <span className="text-xs tracking-widest font-medium text-black uppercase">Video</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;
